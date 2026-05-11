import { useState, useEffect } from 'react';
import { logActivity } from '../utils/activityLogger';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import { usePages, type Page } from '../context/PageContext';

const SUPER_ADMIN_EMAIL = 'admin@wdu.co.id';

interface SEOSettings {
  siteUrl: string;
  defaultTitle: string;
  defaultDesc: string;
  defaultKeywords: string;
  ogImageUrl: string;
  fbAppId: string;
  twitterSite: string;
  twitterCreator: string;
  orgName: string;
  orgLogoUrl: string;
  socialYoutube: string;
  socialInstagram: string;
  faviconUrl: string;
  appleTouchIcon: string;
}

const defaultSettings: SEOSettings = {
  siteUrl: 'https://wahanadatautama.com',
  defaultTitle: 'WDU - Wahana Data Utama',
  defaultDesc: 'Wahana Data Utama - Solusi Riset Pasar dan Transformasi Digital Terpercaya untuk Bisnis Anda. Riset pasar, analisis data, konsultasi IT, event organizer.',
  defaultKeywords: 'riset pasar, transformasi digital, konsultasi IT, survei, analisis data, event organizer, wahana data utama',
  ogImageUrl: '/og-image.jpg',
  fbAppId: '',
  twitterSite: '@wahanadatautama',
  twitterCreator: '@wahanadatautama',
  orgName: 'Wahana Data Utama',
  orgLogoUrl: '/apple-touch-icon.png',
  socialYoutube: 'https://www.youtube.com/@wahanadatautama9110',
  socialInstagram: 'https://www.instagram.com/wahanadatautama',
  faviconUrl: '/favicon-96x96.png',
  appleTouchIcon: '/apple-touch-icon.png',
};

const STORAGE_KEY = 'wdu_seo_settings';

const pageDisplayNames: Record<string, { name: string; icon: string }> = {
  home: { name: 'Beranda', icon: 'home' },
  'tentang-kami': { name: 'Tentang Kami', icon: 'info' },
  layanan: { name: 'Layanan', icon: 'build' },
  portfolio: { name: 'Pengalaman', icon: 'folder' },
  kontak: { name: 'Kontak', icon: 'mail' },
  'riset-pasar': { name: 'Riset Pasar', icon: 'analytics' },
  'analisis-data': { name: 'Analisis Data', icon: 'bar_chart' },
  'konsultasi-it': { name: 'Konsultasi IT', icon: 'support' },
  'riset-data': { name: 'Riset Data', icon: 'search_insights' },
  'event-organizer': { name: 'Event Organizer', icon: 'event' },
  survei: { name: 'Survei', icon: 'poll' },
  'sis-wdu': { name: 'SIS-WDU', icon: 'computer' },
  'privacy-policy': { name: 'Privacy Policy', icon: 'policy' },
  'terms-of-service': { name: 'Terms of Service', icon: 'description' },
};

function InputField({ label, value, onChange, placeholder, type = 'text', prefix }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  prefix?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">{label}</label>
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-container rounded-xl border-2 border-transparent outline-none focus-within:border-[#6ab149] transition-all">
        {prefix && <span className="text-on-surface-variant text-sm font-semibold">{prefix}</span>}
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="flex-1 bg-transparent outline-none text-sm resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        )}
      </div>
    </div>
  );
}

function ImagePreview({ url }: { url: string }) {
  const [error, setError] = useState(false);
  if (!url || error) return null;
  return (
    <div className="w-16 h-16 rounded-xl overflow-hidden border border-outline-variant/20 flex-shrink-0 bg-surface-container">
      <img
        src={url}
        alt="preview"
        className="w-full h-full object-contain"
        onError={() => setError(true)}
      />
    </div>
  );
}

function SectionCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <section className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/20">
      <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#6ab149]">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-surface-container rounded-xl animate-pulse ${className || ''}`} />;
}

export default function AdminMetaSEO() {
  const user = useAuthStore((state) => state.user);
  const isSuperAdmin = user?.email === SUPER_ADMIN_EMAIL;
  const { pages, loading: pagesLoading, refreshPages } = usePages();

  const [settings, setSettings] = useState<SEOSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const [pageMeta, setPageMeta] = useState<Record<string, { metaTitle: string; metaDesc: string }>>({});
  const [dirtyPages, setDirtyPages] = useState<Set<string>>(new Set());
  const [savingMeta, setSavingMeta] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      } catch {
        setSettings(defaultSettings);
      }
    }
  }, []);

  useEffect(() => {
    if (pages.length > 0 && Object.keys(pageMeta).length === 0) {
      const initial: Record<string, { metaTitle: string; metaDesc: string }> = {};
      pages.forEach((p) => {
        initial[p.slug] = { metaTitle: p.metaTitle || '', metaDesc: p.metaDesc || '' };
      });
      setPageMeta(initial);
    }
  }, [pages, Object.keys(pageMeta).length]);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (field: keyof SEOSettings, value: string) => {
    if (!isSuperAdmin) return;
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!isSuperAdmin) return;
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      window.dispatchEvent(new CustomEvent('wdu_seo_settings_update'));
      showToast('success', 'SEO settings saved successfully!');
      logActivity({
        action: 'Save',
        actor: user?.name || user?.email || 'Super Admin',
        target: 'Meta SEO Settings',
        section: 'Configuration',
        page: 'Admin Panel',
        type: 'config',
        detail: `Default Title: ${settings.defaultTitle}`,
      });
    } catch {
      showToast('error', 'Failed to save SEO settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleMetaChange = (slug: string, field: 'metaTitle' | 'metaDesc', value: string) => {
    if (!isSuperAdmin) return;
    setPageMeta(prev => ({ ...prev, [slug]: { ...prev[slug], [field]: value } }));
    setDirtyPages(prev => new Set(prev).add(slug));
  };

  const handleSaveMeta = async () => {
    if (!isSuperAdmin) return;
    setSavingMeta(true);
    let success = 0;
    let failed = 0;
    const entries = Array.from(dirtyPages);
    for (const slug of entries) {
      const meta = pageMeta[slug];
      if (!meta) continue;
      try {
        await api.put(`/pages/${slug}`, {
          metaTitle: meta.metaTitle || null,
          metaDesc: meta.metaDesc || null,
        });
        success++;
      } catch {
        failed++;
      }
    }
    if (failed === 0) {
      showToast('success', `Meta title & description updated for ${success} page(s)!`);
      await refreshPages();
      setDirtyPages(new Set());
    } else {
      showToast('error', `${failed} page(s) failed to update.`);
    }
    setSavingMeta(false);
  };

  const isMetaDirty = (slug: string) => dirtyPages.has(slug);

  const displayUrl = settings.siteUrl.replace(/^https?:\/\//, '');
  const searchPreviewTitle = settings.defaultTitle.length > 60
    ? settings.defaultTitle.slice(0, 57) + '...'
    : settings.defaultTitle;
  const searchPreviewDesc = settings.defaultDesc.length > 160
    ? settings.defaultDesc.slice(0, 157) + '...'
    : settings.defaultDesc;

  return (
    <div className="space-y-8 pb-20 max-w-4xl">
      {toast && (
        <div className={`fixed top-20 right-6 z-[100] px-6 py-3 rounded-xl shadow-lg font-semibold text-sm flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-[#6ab149] text-white' : 'bg-red-500 text-white'
        }`}>
          <span className="material-symbols-outlined text-base">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
          {toast.msg}
        </div>
      )}

      <div>
        <h1 className="text-3xl font-black text-on-surface">Meta SEO Settings</h1>
        <p className="text-on-surface-variant text-sm mt-1">Configure global SEO meta tags, Open Graph, Twitter Card, Structured Data, and per-page meta</p>
      </div>

      {!isSuperAdmin && (
        <div className="flex items-start gap-4 p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-2xl">
          <span className="material-symbols-outlined text-amber-500 text-2xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
            shield_lock
          </span>
          <div>
            <p className="font-bold text-amber-700 dark:text-amber-400 text-sm">Access Restricted</p>
            <p className="text-amber-600 dark:text-amber-500 text-xs mt-1">
              This page can only be edited by <span className="font-semibold">Super Admin</span>.
              You only have access to view the current configuration.
            </p>
          </div>
        </div>
      )}

      {/* Live Preview */}
      <section className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/20 overflow-hidden">
        <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#6ab149]">preview</span>
          LIVE PREVIEW
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Google Search Preview */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-outline-variant/20">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Google Search Result</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[12px] text-gray-500">
                <span className="material-symbols-outlined text-sm">lock</span>
                {displayUrl}
                <span className="material-symbols-outlined text-sm">arrow_drop_down</span>
              </div>
              <p className="text-[14px] text-[#1a0dab] font-medium leading-tight hover:underline cursor-pointer">
                {searchPreviewTitle}
              </p>
              <p className="text-[12px] text-[#545454] leading-relaxed">
                {searchPreviewDesc}
              </p>
            </div>
          </div>
          {/* OG Preview */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-outline-variant/20">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Open Graph Preview</p>
            <div className="rounded-xl overflow-hidden border border-outline-variant/20">
              <div className="aspect-[1.91/1] bg-surface-container flex items-center justify-center overflow-hidden">
                {settings.ogImageUrl ? (
                  <img src={settings.ogImageUrl} alt="OG preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-outline-variant/50">image</span>
                )}
              </div>
              <div className="p-3 space-y-1">
                <p className="text-[11px] text-gray-500 uppercase font-medium">{displayUrl}</p>
                <p className="text-[13px] text-[#1a0dab] font-semibold leading-tight">{searchPreviewTitle}</p>
                <p className="text-[11px] text-gray-500 line-clamp-2">{searchPreviewDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Site Info */}
      <SectionCard icon="public" title="SITE INFO">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Site URL"
              value={settings.siteUrl}
              onChange={(v) => handleChange('siteUrl', v)}
              placeholder="https://example.com"
            />
            <InputField
              label="Default Title"
              value={settings.defaultTitle}
              onChange={(v) => handleChange('defaultTitle', v)}
              placeholder="Site Title"
            />
          </div>
          <InputField
            label="Default Description"
            value={settings.defaultDesc}
            onChange={(v) => handleChange('defaultDesc', v)}
            placeholder="Site description for search engines"
            type="textarea"
          />
          <InputField
            label="Default Keywords"
            value={settings.defaultKeywords}
            onChange={(v) => handleChange('defaultKeywords', v)}
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>
      </SectionCard>

      {/* Open Graph */}
      <SectionCard icon="share" title="OPEN GRAPH">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <InputField
                label="Default OG Image URL"
                value={settings.ogImageUrl}
                onChange={(v) => handleChange('ogImageUrl', v)}
                placeholder="/og-image.jpg"
              />
            </div>
            <div className="mt-7">
              <ImagePreview url={settings.ogImageUrl} />
            </div>
          </div>
          <InputField
            label="Facebook App ID"
            value={settings.fbAppId}
            onChange={(v) => handleChange('fbAppId', v)}
            placeholder="1234567890"
          />
        </div>
      </SectionCard>

      {/* Twitter Card */}
      <SectionCard icon="alternate_email" title="TWITTER CARD">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Twitter Site"
            value={settings.twitterSite}
            onChange={(v) => handleChange('twitterSite', v)}
            placeholder="@username"
            prefix="@"
          />
          <InputField
            label="Twitter Creator"
            value={settings.twitterCreator}
            onChange={(v) => handleChange('twitterCreator', v)}
            placeholder="@username"
            prefix="@"
          />
        </div>
      </SectionCard>

      {/* Organization Schema */}
      <SectionCard icon="business" title="ORGANIZATION SCHEMA">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Organization Name"
              value={settings.orgName}
              onChange={(v) => handleChange('orgName', v)}
              placeholder="Your Company Name"
            />
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <InputField
                  label="Organization Logo URL"
                  value={settings.orgLogoUrl}
                  onChange={(v) => handleChange('orgLogoUrl', v)}
                  placeholder="/logo.png"
                />
              </div>
              <div className="mt-7">
                <ImagePreview url={settings.orgLogoUrl} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="YouTube URL"
              value={settings.socialYoutube}
              onChange={(v) => handleChange('socialYoutube', v)}
              placeholder="https://youtube.com/@channel"
            />
            <InputField
              label="Instagram URL"
              value={settings.socialInstagram}
              onChange={(v) => handleChange('socialInstagram', v)}
              placeholder="https://instagram.com/username"
            />
          </div>
        </div>
      </SectionCard>

      {/* Favicon */}
      <SectionCard icon="tab" title="FAVICON">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <InputField
                label="Favicon URL"
                value={settings.faviconUrl}
                onChange={(v) => handleChange('faviconUrl', v)}
                placeholder="/favicon.ico"
              />
            </div>
            <div className="mt-7">
              <ImagePreview url={settings.faviconUrl} />
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <InputField
                label="Apple Touch Icon URL"
                value={settings.appleTouchIcon}
                onChange={(v) => handleChange('appleTouchIcon', v)}
                placeholder="/apple-touch-icon.png"
              />
            </div>
            <div className="mt-7">
              <ImagePreview url={settings.appleTouchIcon} />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Per-Page SEO */}
      <SectionCard icon="article" title="PER-PAGE SEO">
        <div className="space-y-4">
          <p className="text-sm text-on-surface-variant">
            Each page can have its own meta title & description that overrides the global defaults in search results.
          </p>
          {pagesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-surface-container/50 rounded-2xl">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : pages.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-4 text-outline-variant/50">info</span>
              <p className="text-sm font-medium">No pages loaded.</p>
              <p className="text-xs mt-1">Make sure the backend is running and pages exist.</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {pages.map((page) => {
                  const display = pageDisplayNames[page.slug] || { name: page.slug, icon: 'article' };
                  const meta = pageMeta[page.slug];
                  const dirty = isMetaDirty(page.slug);
                  return (
                    <div
                      key={page.slug}
                      className={`p-4 rounded-2xl border transition-all ${
                        dirty
                          ? 'border-[#6ab149]/40 bg-[#6ab149]/5'
                          : 'border-transparent bg-surface-container/30 hover:bg-surface-container/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="material-symbols-outlined text-[#6ab149]">{display.icon}</span>
                        <span className="text-sm font-bold text-on-surface flex-1">{display.name}</span>
                        {dirty && (
                          <span className="text-[10px] font-black text-[#6ab149] uppercase tracking-widest bg-[#6ab149]/10 px-2.5 py-1 rounded-full">
                            Modified
                          </span>
                        )}
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          page.isPublished
                            ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                            : 'text-amber-600 bg-amber-50 dark:bg-amber-900/20'
                        }`}>
                          {page.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1 mb-1.5 block">Meta Title</label>
                          <input
                            type="text"
                            value={meta?.metaTitle || ''}
                            onChange={(e) => handleMetaChange(page.slug, 'metaTitle', e.target.value)}
                            readOnly={!isSuperAdmin}
                            placeholder={settings.defaultTitle}
                            className={`w-full px-3.5 py-2.5 bg-surface-container rounded-xl border-2 border-transparent outline-none text-sm transition-all ${
                              isSuperAdmin ? 'focus:border-[#6ab149]' : 'cursor-not-allowed text-on-surface-variant'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1 mb-1.5 block">Meta Description</label>
                          <input
                            type="text"
                            value={meta?.metaDesc || ''}
                            onChange={(e) => handleMetaChange(page.slug, 'metaDesc', e.target.value)}
                            readOnly={!isSuperAdmin}
                            placeholder={settings.defaultDesc}
                            className={`w-full px-3.5 py-2.5 bg-surface-container rounded-xl border-2 border-transparent outline-none text-sm transition-all ${
                              isSuperAdmin ? 'focus:border-[#6ab149]' : 'cursor-not-allowed text-on-surface-variant'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {isSuperAdmin && dirtyPages.size > 0 && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-on-surface-variant font-medium">
                    {dirtyPages.size} page(s) modified
                  </span>
                  <button
                    onClick={handleSaveMeta}
                    disabled={savingMeta}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#6ab149] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-[#6ab149]/30 disabled:opacity-60"
                  >
                    <span className="material-symbols-outlined text-base">cloud_upload</span>
                    {savingMeta ? 'Saving...' : 'SAVE ALL CHANGES'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </SectionCard>

      {/* Save Button */}
      {isSuperAdmin ? (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-[#6ab149] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-[#6ab149]/30 disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-lg">save</span>
            {saving ? 'Saving...' : 'SAVE CHANGES'}
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <div className="flex items-center gap-2 px-6 py-3 bg-surface-container rounded-xl text-on-surface-variant text-sm font-medium">
            <span className="material-symbols-outlined text-base">lock</span>
            Only Super Admin can save changes
          </div>
        </div>
      )}
    </div>
  );
}
