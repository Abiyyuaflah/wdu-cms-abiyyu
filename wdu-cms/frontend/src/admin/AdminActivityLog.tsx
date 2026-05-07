import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getActivityLogs,
  clearActivityLogs,
  getActivityIcon,
  timeAgo,
  type ActivityLog,
  type ActivityType,
} from '../utils/activityLogger';

const GREEN = '#6ab149';

const TYPE_LABELS: Record<ActivityType, string> = {
  admin:   'Admin',
  system:  'System',
  public:  'Public Page',
  message: 'Messages',
  media:   'Media',
  config:  'Configuration',
};

// Warna badge per tipe — menggunakan opacity agar works di light & dark
const TYPE_STYLES: Record<ActivityType, { icon: string; pill: string; text: string }> = {
  admin:   { icon: 'bg-[#6ab149]/15 text-[#4a8f32] dark:text-[#7ecb57]',   pill: 'bg-[#6ab149]/15 text-[#4a8f32] dark:text-[#7ecb57]',   text: '#4a8f32'  },
  system:  { icon: 'bg-slate-500/10 text-slate-500 dark:text-slate-400',    pill: 'bg-slate-500/10 text-slate-500 dark:text-slate-400',    text: '#64748b'  },
  public:  { icon: 'bg-blue-500/10 text-blue-500 dark:text-blue-400',       pill: 'bg-blue-500/10 text-blue-500 dark:text-blue-400',       text: '#3b82f6'  },
  message: { icon: 'bg-orange-500/10 text-orange-500 dark:text-orange-400', pill: 'bg-orange-500/10 text-orange-500 dark:text-orange-400', text: '#f97316'  },
  media:   { icon: 'bg-purple-500/10 text-purple-500 dark:text-purple-400', pill: 'bg-purple-500/10 text-purple-500 dark:text-purple-400', text: '#a855f7'  },
  config:  { icon: 'bg-teal-500/10 text-teal-500 dark:text-teal-400',       pill: 'bg-teal-500/10 text-teal-500 dark:text-teal-400',       text: '#14b8a6'  },
};

// Border color when filter is active (inline style safe because opacity is transparent)
const TYPE_BORDER: Record<ActivityType, string> = {
  admin:   'rgba(106,177,73,0.4)',
  system:  'rgba(100,116,139,0.4)',
  public:  'rgba(59,130,246,0.4)',
  message: 'rgba(249,115,22,0.4)',
  media:   'rgba(168,85,247,0.4)',
  config:  'rgba(20,184,166,0.4)',
};

const ACTION_ICON: Record<string, string> = {
  'Create':       'add_circle',
  'Update':       'edit',
  'Delete':       'delete',
  'Upload':       'upload',
  'Login':        'login',
  'Save':         'save',
  'Activate':     'toggle_on',
  'Deactivate':   'toggle_off',
  'Read':         'mark_email_read',
  'Reply':        'reply',
  'Archive':      'archive',
  'Export':       'download',
};

function exportLogsCSV(logs: ActivityLog[]) {
  const headers = ['Time', 'Actor', 'Action', 'Target', 'Section', 'Page', 'Type', 'Detail'];
  const rows = logs.map(l => [
    new Date(l.timestamp).toLocaleString('id-ID'),
    l.actor, l.action, l.target, l.section, l.page,
    TYPE_LABELS[l.type] || l.type,
    l.detail || '',
  ]);
  const csv = [headers, ...rows]
    .map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `activity_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

const ALL = 'All';
const FILTER_TYPES: (ActivityType | typeof ALL)[] = [ALL, 'admin', 'message', 'config', 'media', 'public', 'system'];

export default function AdminActivityLog() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filter, setFilter] = useState<ActivityType | typeof ALL>(ALL);
  const [search, setSearch] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setLogs(getActivityLogs());
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'wdu_activity_logs') setLogs(getActivityLogs());
    };
    window.addEventListener('storage', onStorage);
    const poll = setInterval(() => setLogs(getActivityLogs()), 5000);
    return () => { window.removeEventListener('storage', onStorage); clearInterval(poll); };
  }, []);

  const filtered = logs.filter(l => {
    const matchType = filter === ALL || l.type === filter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      l.actor.toLowerCase().includes(q) ||
      l.target.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      l.section.toLowerCase().includes(q) ||
      (l.detail || '').toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  const handleClear = () => { clearActivityLogs(); setLogs([]); setShowClearConfirm(false); };

  const statsByType = FILTER_TYPES.filter(t => t !== ALL).map(t => ({
    type: t as ActivityType,
    count: logs.filter(l => l.type === t).length,
  }));

  return (
    <div className="space-y-8 pb-24 max-w-6xl">

      {/* ── Clear Confirm Modal ── */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-surface-container-lowest rounded-3xl p-10 max-w-sm w-full shadow-2xl border border-outline-variant/20"
            >
              <div className="w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center mb-5 mx-auto">
                <span className="material-symbols-outlined text-3xl text-error"
                  style={{ fontVariationSettings: "'FILL' 1" }}>delete_sweep</span>
              </div>
              <h3 className="text-xl font-black text-center text-on-surface mb-2">Delete All Logs?</h3>
              <p className="text-sm text-on-surface-variant text-center mb-8">
                All activity history will be permanently deleted and cannot be recovered.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-3 rounded-2xl font-bold text-sm bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                 </button>
                 <button
                   onClick={handleClear}
                   className="flex-1 py-3 rounded-2xl font-bold text-sm bg-error text-white hover:opacity-90 transition-colors"
                 >
                   Delete All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-[#6ab149]/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg text-[#6ab149]"
                style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#6ab149]">System Log</span>
          </div>
          <h1 className="text-4xl font-black text-on-surface tracking-tight leading-tight">
            All Activities
          </h1>
          <p className="text-sm text-on-surface-variant mt-2 font-medium">
            Complete history of changes in Admin Panel &amp; Main Page
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Live badge */}
          <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#6ab149]"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6ab149]"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6ab149]">Live</span>
          </div>

          <button
            onClick={() => exportLogsCSV(filtered)}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 font-bold text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all shadow-sm disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-base">download</span>
            Export CSV
          </button>

          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={logs.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-error/10 rounded-xl border border-error/20 font-bold text-sm text-error hover:bg-error/20 transition-all disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-base">delete_sweep</span>
            Clear All
          </button>
        </div>
      </motion.div>

      {/* ── Stats Cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        {statsByType.map(({ type, count }) => {
          const s = TYPE_STYLES[type];
          const icon = getActivityIcon(type);
          const isActive = filter === type;
          return (
            <button
              key={type}
              onClick={() => setFilter(isActive ? ALL : type)}
              className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all text-center group
                ${isActive
                  ? 'bg-surface-container border-outline-variant/60 shadow-md'
                  : 'bg-surface-container-lowest dark:bg-[#121312] border-outline-variant/20 hover:bg-surface-container hover:border-outline-variant/40 shadow-sm'
                }`}
              style={isActive ? { borderColor: TYPE_BORDER[type] } : undefined}
            >
              <span className={`material-symbols-outlined text-xl transition-transform group-hover:scale-110 ${s.icon}`}
                style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              <span className={`text-2xl font-black ${isActive ? '' : 'text-on-surface'}`}
                style={isActive ? { color: s.text } : undefined}>
                {count}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? '' : 'text-on-surface/60'}`}
                style={isActive ? { color: s.text } : undefined}>
                {TYPE_LABELS[type]}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Filter & Search Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.14 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-surface-container-lowest dark:bg-[#121312] rounded-2xl border border-outline-variant/20 shadow-sm px-6 py-4"
      >
        {/* Type filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {FILTER_TYPES.map(t => {
            const isActive = filter === t;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all
                  ${isActive
                    ? 'text-white shadow-md'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                style={isActive ? { background: GREEN, boxShadow: `0 4px 12px ${GREEN}50` } : undefined}
              >
                {t === ALL ? 'All' : TYPE_LABELS[t as ActivityType]}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative flex-shrink-0 w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
            search
          </span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search actor, target, action..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low/50 border-2 border-transparent focus:border-[#6ab149] outline-none rounded-xl text-sm font-medium text-on-surface placeholder:text-on-surface-variant/50 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* ── Summary row ── */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-on-surface-variant font-medium">
          Showing <span className="font-black text-on-surface">{filtered.length}</span> of{' '}
          <span className="font-black text-on-surface">{logs.length}</span> activities
        </p>
        {(filter !== ALL || search) && (
          <button
            onClick={() => { setFilter(ALL); setSearch(''); }}
            className="text-xs font-bold flex items-center gap-1 text-[#6ab149] hover:underline"
          >
            <span className="material-symbols-outlined text-sm">filter_alt_off</span>
            Reset Filter
          </button>
        )}
      </div>

      {/* ── Log Table ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="bg-surface-container-lowest dark:bg-[#121312] rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-3 px-8 py-4 border-b border-outline-variant/15 bg-gradient-to-r from-primary/10 to-white dark:from-[#1a1c1a] dark:to-[#121312]">
          {['Type', 'Actor', 'Action', 'Target', 'Section', 'Time'].map((h, i) => (
            <div key={h}
              className={`text-[10px] font-black uppercase tracking-[0.18em] text-on-surface
                ${i === 0 ? 'col-span-1' : i === 1 ? 'col-span-2' : i === 2 ? 'col-span-2' : i === 3 ? 'col-span-3' : i === 4 ? 'col-span-2' : 'col-span-2 text-right'}`}>
              {h}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-24 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-[#6ab149]/10 flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-4xl text-[#6ab149]"
                style={{ fontVariationSettings: "'FILL' 1" }}>history_toggle_off</span>
            </div>
              <h3 className="text-lg font-black text-on-surface mb-1">
                {logs.length === 0 ? 'No Activity Yet' : 'No Results'}
              </h3>
              <p className="text-sm text-on-surface-variant max-w-xs">
                {logs.length === 0
                  ? 'Logs will appear automatically whenever there are changes in the system.'
                  : 'Try changing your filter or search keyword.'}
              </p>
            {(filter !== ALL || search) && (
              <button
                onClick={() => { setFilter(ALL); setSearch(''); }}
                className="mt-5 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all"
                style={{ background: GREEN }}
              >
                Reset Filter
              </button>
            )}
          </div>
        )}

        {/* Log Rows */}
        <div className="divide-y divide-outline-variant/10">
          <AnimatePresence initial={false}>
            {filtered.map((log, idx) => {
              const s = TYPE_STYLES[log.type] || TYPE_STYLES.admin;
              const actionIcon = ACTION_ICON[log.action] || 'radio_button_checked';
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.2, delay: idx < 15 ? idx * 0.025 : 0 }}
                  className="grid grid-cols-12 gap-3 px-8 py-4 items-center hover:bg-primary/5 transition-colors duration-150 group"
                >
                  {/* Tipe icon */}
                  <div className="col-span-1">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-xl ${s.icon}`}
                      title={TYPE_LABELS[log.type]}
                    >
                      <span className="material-symbols-outlined text-base"
                        style={{ fontVariationSettings: "'FILL' 1" }}>
                        {getActivityIcon(log.type)}
                      </span>
                    </span>
                  </div>

                  {/* Aktor */}
                  <div className="col-span-2">
                    <p className="text-sm font-bold text-on-surface truncate leading-tight group-hover:text-[#6ab149] transition-colors">
                      {log.actor}
                    </p>
                    <p className="text-[10px] text-on-surface-variant/70 font-medium mt-0.5">{log.page}</p>
                  </div>

                  {/* Aksi */}
                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${s.pill}`}>
                      <span className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}>{actionIcon}</span>
                      {log.action}
                    </span>
                  </div>

                  {/* Target */}
                  <div className="col-span-3">
                    <p className="text-sm font-semibold text-on-surface truncate">{log.target}</p>
                    {log.detail && (
                      <p className="text-[11px] text-on-surface-variant/60 italic mt-0.5 truncate">{log.detail}</p>
                    )}
                  </div>

                  {/* Section */}
                  <div className="col-span-2">
                    <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-lg inline-block">
                      {log.section}
                    </span>
                  </div>

                  {/* Waktu */}
                  <div className="col-span-2 text-right">
                    <p className="text-xs font-bold text-on-surface-variant"
                      title={new Date(log.timestamp).toLocaleString('id-ID')}>
                      {timeAgo(log.timestamp)}
                    </p>
                    <p className="text-[10px] text-on-surface-variant/40 mt-0.5">
                      {new Date(log.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div className="px-8 py-4 bg-surface-container/40 border-t border-outline-variant/10 flex items-center justify-between">
              <p className="text-xs text-on-surface-variant">
                <span className="font-bold text-on-surface">{filtered.length}</span> entries displayed
                {logs.length > filtered.length && (
                  <> · <span className="font-bold text-on-surface">{logs.length - filtered.length}</span> hidden by filter</>
                )}
              </p>
              <p className="text-[10px] text-on-surface-variant/40 font-medium">
                Max. 50 entries stored · Auto-updated every 5 sec
              </p>
          </div>
        )}
      </motion.div>

    </div>
  );
}
