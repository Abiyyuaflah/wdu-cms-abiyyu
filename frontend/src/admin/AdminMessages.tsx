import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Download, Archive } from 'lucide-react';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import { logActivity } from '../utils/activityLogger';

const SUPER_ADMIN_EMAIL = 'admin@wdu.co.id';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface PaginatedResponse {
  messages: ContactMessage[];
  total: number;
  page: number;
  totalPages: number;
}

const PAGE_SIZE = 10;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 10,
    transition: { duration: 0.2 }
  }
};

const exportToCSV = (messages: ContactMessage[], filename: string) => {
  const headers = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Date'];
  const rows = messages.map(m => [
    m.name,
    m.email,
    m.phone || '',
    m.subject || '',
    m.message,
     m.isRead ? 'Read' : 'Unread',
     new Date(m.createdAt).toLocaleDateString('en-US')
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');
  
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

export default function AdminMessages() {
  const user = useAuthStore((state) => state.user);
  const isSuperAdmin = user?.email === SUPER_ADMIN_EMAIL;
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState<'all' | 'read' | 'unread'>('all');
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [markingAll, setMarkingAll] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchMessages = useCallback(async (p = 1, search = '', status = 'all') => {
    setLoading(true);
    try {
      const statusQuery = status === 'all' ? '' : `&status=${status}`;
      const searchHost = search ? `&search=${encodeURIComponent(search)}` : '';
      const url = `/contact/messages?page=${p}&limit=${PAGE_SIZE}${statusQuery}${searchHost}`;
      const { data: res } = await api.get(url);
      
      if (res && Array.isArray(res.messages)) {
        setData(res);
      } else {
        console.error('Data format error:', res);
        setData({ messages: [], total: 0, page: 1, totalPages: 0 });
      }
    } catch (err) {
      console.error('Network/API error:', err);
       showToast('error', 'Failed to connect to server.');
      setData({ messages: [], total: 0, page: 1, totalPages: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages(1, '', 'all');
  }, [fetchMessages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMessages(1, searchTerm, activeStatus);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, activeStatus, fetchMessages]);

  useEffect(() => {
    if (page > 1) {
      fetchMessages(page, searchTerm, activeStatus);
    }
  }, [page, fetchMessages, searchTerm, activeStatus]);

  const handleOpen = async (msg: ContactMessage) => {
    setSelected(msg);
    setIsReplying(false);
    setReplyText('');
    if (msg && !msg.isRead) {
      try {
        await api.patch(`/contact/messages/${msg.id}/read`);
        setData((prev) =>
          prev
            ? {
                ...prev,
                messages: prev.messages.map((m) =>
                  m.id === msg.id ? { ...m, isRead: true } : m
                ),
              }
            : prev
        );
      } catch (err) {
        console.error('Update read error:', err);
      }
    }
  };

  const handleMarkAllRead = async () => {
    setMarkingAll(true);
    try {
      await api.patch('/contact/messages/mark-all-read');
      setData((prev) =>
        prev
          ? { ...prev, messages: prev.messages.map((m) => ({ ...m, isRead: true })) }
          : prev
      );
       showToast('success', 'All messages marked as read.');
      logActivity({
        action: 'Membaca',
        actor: user?.name || user?.email || 'Admin',
        target: 'All Messages',
        section: 'Inbox',
        page: 'Admin Panel',
        type: 'message',
         detail: 'Mark all messages as read',
      });
    } catch {
       showToast('error', 'Failed to update messages.');
    } finally {
      setMarkingAll(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isSuperAdmin) {
      showToast('error', 'Only Super Admin can delete messages.');
      return;
    }
    const target = data?.messages.find(m => m.id === id);
    setDeleting(id);
    try {
      await api.delete(`/contact/messages/${id}`);
      setData((prev) =>
        prev
          ? {
              ...prev,
              messages: prev.messages.filter((m) => m.id !== id),
              total: Math.max(0, prev.total - 1),
            }
          : prev
      );
      if (selected?.id === id) setSelected(null);
       showToast('success', 'Successfully deleted.');
      logActivity({
        action: 'Menghapus',
        actor: user?.name || user?.email || 'Super Admin',
         target: `Message from ${target?.name || 'sender'}`,
        section: 'Inbox',
        page: 'Admin Panel',
        type: 'message',
        detail: target?.subject || target?.message?.slice(0, 60),
      });
    } catch {
       showToast('error', 'Failed to delete.');
    } finally {
      setDeleting(null);
      setShowDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`fixed top-24 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm bg-primary text-white flex items-center gap-3 ${toast.type === 'error' ? 'bg-error' : ''}`}
          >
            <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteConfirm && isSuperAdmin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-[2rem] p-10 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-2xl font-black mb-4">Delete Message?</h3>
              <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The message will be permanently deleted.</p>
              <div className="flex gap-4">
                <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-4 rounded-2xl bg-gray-100 font-bold hover:bg-gray-200 transition-all">Cancel</button>
                <button onClick={() => handleDelete(showDeleteConfirm)} className="flex-1 py-4 rounded-2xl bg-error text-white font-bold hover:opacity-90 transition-all">                   {deleting ? '...' : 'Delete'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          >
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-[2.5rem] w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-12 py-10 border-b flex justify-between items-start bg-gray-50/50">
                <div>
                  <h3 className="text-3xl font-black text-on-surface leading-tight tracking-tighter">
                    {selected?.subject || '(No Subject)'}
                  </h3>
                  <p className="text-gray-900 font-bold text-sm mt-4">{selected?.name}</p>
                  <p className="text-gray-500 text-xs">{selected?.email}</p>
                  {selected?.phone && (
                    <p className="text-gray-500 text-xs mt-1">
                      <span className="material-symbols-outlined text-xs align-middle mr-1">phone</span>
                      {selected.phone}
                    </p>
                  )}
                </div>
                <button onClick={() => setSelected(null)} className="p-3 rounded-2xl hover:bg-gray-200 transition-all text-gray-400 hover:text-gray-900">
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>
              <div className="px-12 py-10 overflow-y-auto flex-1 custom-scrollbar">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm leading-relaxed text-gray-800 font-body text-base whitespace-pre-wrap">
                  {selected?.message}
                </div>
                <AnimatePresence>
                  {isReplying && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-10 overflow-hidden"
                    >
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Tulis balasan..."
                        className="w-full h-44 p-6 bg-white border-2 border-primary/20 focus:border-primary outline-none rounded-3xl text-sm transition-all"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="px-12 py-8 border-t flex justify-between items-center bg-gray-50/30">
                {isSuperAdmin ? (
                  <button
                    onClick={() => setShowDeleteConfirm(selected.id)}
                    className="flex items-center gap-1.5 text-error font-bold text-sm hover:underline"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                    Delete Message
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-gray-300 text-sm cursor-not-allowed select-none">
                    <span className="material-symbols-outlined text-base">lock</span>
                    Delete Message
                  </div>
                )}
                <div className="flex gap-4">
                  {isReplying ? (
                    <>
                      <button onClick={() => setIsReplying(false)} className="px-8 py-3 rounded-2xl border-2 font-bold text-sm">Cancel</button>
                      <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}&body=${encodeURIComponent(replyText)}`} className="px-10 py-3 rounded-2xl bg-primary text-white font-black text-sm shadow-lg shadow-primary/20">Send Email</a>
                    </>
                  ) : (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsReplying(true)} 
                      className="px-10 py-3 rounded-2xl bg-primary text-white font-black text-sm shadow-lg shadow-primary/20"
                    >
                      Reply
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <span className="text-primary font-black text-[11px] uppercase tracking-[0.3em] mb-3 block">Communications</span>
          <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-gray-900 leading-none">Inbox</h1>
          <p className="text-gray-500 text-sm mt-4 font-medium max-w-md">Unified management for incoming messages from the website.</p>
        </div>
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              try {
                const { data } = await api.get('/contact/messages?limit=1000');
                exportToCSV(data.messages || [], 'messages');
              } catch {
                showToast('error', 'Failed to export data.');
              }
            }} 
            className="px-6 py-4 rounded-2xl bg-white border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2"
          >
            <Download size={18} />
            Export CSV
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMarkAllRead} 
            className="px-8 py-4 rounded-2xl bg-primary text-white font-black hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 text-sm"
          >
            {markingAll ? '...' : 'Mark All as Read'}
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm"
      >
        <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-2xl">
          {(['all', 'unread', 'read'] as const).map((status) => (
            <button key={status} onClick={() => setActiveStatus(status)} className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all ${activeStatus === status ? 'bg-white text-primary shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>{status}</button>
          ))}
        </div>
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}                placeholder="Search name, subject, or email..." className="w-full pl-14 pr-6 py-4 bg-gray-100 border-2 border-transparent focus:border-primary/20 focus:bg-white outline-none rounded-2xl text-sm font-bold transition-all" />
        </div>
      </motion.div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/20">
        <div className="grid grid-cols-12 gap-4 px-10 py-7 bg-gray-50/50 border-b border-gray-100 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
          <div className="col-span-1 text-center">Status</div>
                   <div className="col-span-3">Sender</div>
                   <div className="col-span-6">Message & Subject</div>
                   <div className="col-span-2 text-right">Date</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeStatus}-${page}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="divide-y divide-gray-50"
          >
            {loading ? (
              <div className="p-10 space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : !data || data.messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-gray-300 text-4xl">inventory_2</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900">Empty Inbox</h4>
                <p className="text-gray-500 text-sm mt-2">No incoming messages found at this time.</p>
              </motion.div>
            ) : (
              data.messages.map((msg) => (
                <motion.div
                  key={msg?.id}
                  variants={itemVariants}
                  onClick={() => handleOpen(msg)}
                  className={`grid grid-cols-12 gap-4 px-10 py-7 items-center hover:bg-primary/[0.02] transition-all duration-300 cursor-pointer relative group ${!msg?.isRead ? 'bg-primary/[0.01]' : ''}`}
                >
                  {!msg?.isRead && (
                    <motion.div 
                      layoutId={`read-indicator-${msg.id}`}
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary shadow-lg shadow-primary/30" 
                    />
                  )}
                  <div className="col-span-1 flex justify-center">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${!msg?.isRead ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'}`}>
                      <span className="material-symbols-outlined text-lg">{msg?.isRead ? 'drafts' : 'mail'}</span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className={`text-base leading-tight transition-all ${!msg?.isRead ? 'font-black text-gray-900' : 'font-bold text-gray-500 opacity-70'}`}>{msg?.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{msg?.email}</p>
                    {msg?.phone && (
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">phone</span>
                        {msg.phone}
                      </p>
                    )}
                  </div>
                  <div className="col-span-6">
                    <p className={`text-base truncate transition-all ${!msg?.isRead ? 'font-black text-gray-900' : 'font-bold text-gray-500 opacity-60'}`}>{msg?.subject || '(No Subject)'}</p>
                    <p className="text-sm text-gray-400 truncate opacity-70 italic font-body">{msg?.message}</p>
                  </div>
                  <div className="col-span-2 text-right flex items-center justify-end gap-3">
                    <p className={`text-xs font-black font-label ${!msg?.isRead ? 'text-primary' : 'text-gray-400 opacity-50'}`}>
                      {msg?.createdAt ? new Date(msg?.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '-'}
                    </p>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <button 
                        onClick={(e) => { e.stopPropagation(); showToast('success', 'Message archived.'); }}
                        className="p-2 rounded-xl hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-all"
                      >
                        <Archive size={16} />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); window.location.href = `mailto:${msg?.email}`; }}
                        className="p-2 rounded-xl hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-all"
                      >
                        <span className="material-symbols-outlined text-base">reply</span>
                      </button>
                      {isSuperAdmin && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(msg?.id); }}
                          className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-error transition-all"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {data && data.totalPages > 1 && (
          <div className="px-10 py-6 bg-gray-50/30 flex justify-between items-center border-t border-gray-100">
             <p className="text-xs text-gray-500 font-bold">Total pesan: <span className="text-primary">{data.total}</span></p>
             <div className="flex gap-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={page === 1} 
                  onClick={() => setPage(p => p - 1)}
                  className="px-6 py-2 rounded-xl bg-white border font-bold text-xs hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                  Sebelumnya
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={page === data.totalPages} 
                  onClick={() => setPage(p => p + 1)}
                  className="px-6 py-2 rounded-xl bg-white border font-bold text-xs hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                  Selanjutnya
                </motion.button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
