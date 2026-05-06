import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Search, Edit2, ExternalLink, Eye, AlertCircle, X,
  CheckCircle2, XCircle, Save, FolderOpen, 
  ChevronRight, Layout, LayoutGrid, Layers
} from 'lucide-react';
import api from '../services/api';
import { usePages } from '../context/PageContext';

interface Page {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  isPublished: boolean;
  updatedAt: string;
}

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [draftPage, setDraftPage] = useState<Page | null>(null);
  const { refreshPages } = usePages();

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchPages = async () => {
    try {
      const { data } = await api.get('/pages');
      setPages(data);
    } catch (err) {
      console.error('Failed to fetch pages:', err);
      showToast('error', 'Failed to fetch page data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleUpdatePage = async () => {
    if (!editingPage) return;
    setIsSaving(true);
    try {
      await api.put(`/pages/${editingPage.slug}`, editingPage);
      showToast('success', 'Page updated successfully!');
      fetchPages();
      await refreshPages();
      setEditingPage(null);
    } catch (err) {
      console.error('Failed to update page:', err);
      showToast('error', 'Failed to update page.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublish = async (page: Page) => {
    try {
      const newStatus = !page.isPublished;
      console.log(`[AdminPages] Toggling ${page.slug} to isPublished=${newStatus}`);
      
      // Call API to update backend
      const response = await api.patch(`/pages/${page.slug}/publish`, { isPublished: newStatus });
      console.log('[AdminPages] API Response:', response.data);
      
      // Update local state
      setPages(prev => prev.map(p => p.id === page.id ? { ...p, isPublished: newStatus } : p));
      
      // Refresh PageContext so other components get updated data
      await refreshPages();
      
      showToast('success', newStatus ? 'Page published!' : 'Page unpublished!');
    } catch (err: any) {
      console.error('[AdminPages] Failed to toggle publish:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Unknown error';
      showToast('error', 'Failed: ' + errorMsg);
      
      // Re-fetch pages to ensure UI is in sync with backend
      fetchPages();
    }
  };

  const handlePreview = async (page: Page) => {
    if (page.isPublished) {
      window.open(`/${page.slug === 'home' ? '' : page.slug}`, '_blank');
    } else {
      setDraftPage(page);
      setShowDraftModal(true);
    }
  };

  const handlePublishAndPreview = async () => {
    if (!draftPage) return;
    try {
      await api.patch(`/pages/${draftPage.slug}/publish`, { isPublished: true });
      setPages(prev => prev.map(p => p.id === draftPage.id ? { ...p, isPublished: true } : p));
      await refreshPages();
      setShowDraftModal(false);
      setDraftPage(null);
      showToast('success', 'Page published successfully!');
      setTimeout(() => window.open(`/${draftPage.slug === 'home' ? '' : draftPage.slug}`, '_blank'), 300);
    } catch (err) {
      console.error('Failed to publish:', err);
      showToast('error', 'Failed to publish page.');
    }
  };

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.slug.toLowerCase().includes(search.toLowerCase())
  ).filter(p => !['system-reminder'].includes(p.slug));

  const PageCard = ({ page }: { page: Page }) => (
    <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-2xl border border-gray-100 p-5 hover:border-[#6ab149]/30 hover:shadow-[0_8px_30px_rgba(106,177,73,0.08)] transition-all group relative shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); handleTogglePublish(page); }}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm ${
            page.isPublished 
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/20' 
              : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white hover:from-slate-500 hover:to-slate-600 shadow-slate-400/20'
          }`}
        >
          {page.isPublished ? 'Published' : 'Draft'}
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); handlePreview(page); }}
          className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all flex items-center gap-1 shadow-sm shadow-indigo-500/20"
        >
          <Eye size={12} /> Preview
        </button>
      </div>

      <div className="flex justify-between items-start mb-4 mt-2">
        <div className="p-3 bg-gradient-to-br from-[#6ab149]/5 to-[#6ab149]/10 text-[#6ab149] rounded-xl group-hover:from-[#6ab149]/10 group-hover:to-[#6ab149]/15 transition-colors">
          <FileText size={22} className="stroke-[2.5px]" />
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => setEditingPage(page)}
            className="p-2 text-gray-400 hover:text-[#6ab149] hover:bg-[#6ab149]/10 rounded-lg transition-all"
            title="Edit Metadata"
          >
            <Edit2 size={16} />
          </button>
          <a 
            href={page.slug === 'home' ? '/' : `/${page.slug}`} 
            target="_blank" 
            rel="noreferrer"
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
            title="View Live"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <div>
        <h3 className="font-black text-gray-900 text-base tracking-tight mb-1 group-hover:text-[#6ab149] transition-colors">
          {page.title}
        </h3>
        <p className="inline-block text-[10px] font-mono text-gray-400 group-hover:text-gray-500 uppercase tracking-tighter mb-4 bg-gray-50 px-2 py-0.5 rounded-full">
          /{page.slug === 'home' ? '' : page.slug}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-1.5">
          {page.isPublished ? (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Published</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-slate-400"></div>
              <span>Draft</span>
            </div>
          )}
        </div>
        <span className="text-[9px] text-gray-300 font-bold group-hover:text-gray-400 transition-colors uppercase">
          {new Date(page.updatedAt).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
        </span>
      </div>

      <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-[#6ab149]/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-6 z-[100] px-6 py-3 rounded-xl shadow-lg font-semibold text-sm flex items-center gap-2 animate-in slide-in-from-right ${
          toast.type === 'success' ? 'bg-gradient-to-r from-[#6ab149] to-[#5a9e3f] text-white' : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
        }`}>
          <span className="material-symbols-outlined text-base">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          {toast.msg}
        </div>
      )}

      {/* Draft Preview Modal */}
      {showDraftModal && draftPage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <AlertCircle className="text-amber-600" size={28} />
              </div>
              <button
                onClick={() => { setShowDraftModal(false); setDraftPage(null); }}
                className="p-2 hover:bg-gray-100 hover:text-gray-500 rounded-xl transition-all text-gray-400"
              >
                <X size={20} />
              </button>
            </div>
            <h3 className="text-xl font-black text-gray-800 tracking-tight mb-2">Page Not Published</h3>
            <p className="text-sm text-gray-500 font-body leading-relaxed mb-6">
              The page <strong>{draftPage.title}</strong> is currently in <strong>Draft</strong> status. You need to publish the page first to view it live.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDraftModal(false); setDraftPage(null); }}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishAndPreview}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#6ab149] to-[#5a9e3f] text-white font-bold text-sm hover:from-[#5a9e3f] hover:to-[#4d8a34] transition-all shadow-lg shadow-[#6ab149]/25"
              >
                Publish & View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers size={14} className="text-[#6ab149]" />
            <span className="text-[#6ab149] font-black text-[10px] tracking-widest uppercase">CMS Content Architecture</span>
          </div>
          <h1 className="text-3xl font-black text-on-surface tracking-tight">Platform Pages</h1>
          <p className="text-on-surface-variant text-sm mt-1 max-w-xl">Manage all static content structure and SEO metadata in one organized panel.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-[#6ab149] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search pages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border border-gray-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:border-[#6ab149]/50 focus:shadow-none transition-all font-bold w-full md:w-64 shadow-sm text-on-surface"
            />
          </div>
        </div>
      </div>

      {/* FOLDER: HALAMAN DETAIL */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
          <div className="p-2 bg-gradient-to-br from-secondary/10 to-secondary/5 text-secondary rounded-lg">
            <FolderOpen size={18} />
          </div>
          <h2 className="text-lg font-black text-on-surface tracking-tight">Detail Pages (Deep Links)</h2>
          <span className="bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary px-2 py-0.5 rounded-full text-[10px] font-black uppercase">{filteredPages.length} Pages</span>
        </div>
        
{loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-48 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="text-center py-10 flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-gray-300">inbox</span>
              <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs">Folder Empty</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPages.map(page => <PageCard key={page.id} page={page} />)}
          </div>
        )}
      </section>

      {/* Edit Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/30 backdrop-blur-md transition-all duration-500">
          <div className="bg-white h-full w-full max-w-lg shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-500">
            <header className="mb-10 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">Configuration Metadata</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Ref: {editingPage.slug.toUpperCase()}</p>
              </div>
              <button 
                onClick={() => setEditingPage(null)}
                className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all text-gray-400"
              >
                <XCircle size={24} />
              </button>
            </header>

            <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Display Title</label>
                <input 
                  type="text" 
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                  className="w-full p-4 bg-gray-50/80 hover:bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-bold text-gray-700 focus:border-[#6ab149] focus:ring-2 focus:ring-[#6ab149]/10 outline-none transition-all"
                />
              </div>

              <div className="space-y-4 pt-4 border-t-2 border-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <LayoutGrid size={14} className="text-[#6ab149]" />
                  <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest">SEO Optimization</h4>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Meta Title Tag</label>
                  <input 
                    type="text" 
                    value={editingPage.metaTitle}
                    onChange={(e) => setEditingPage({...editingPage, metaTitle: e.target.value})}
                    className="w-full p-4 bg-gray-50/80 hover:bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-medium text-gray-600 focus:border-[#6ab149] focus:ring-2 focus:ring-[#6ab149]/10 outline-none transition-all"
                    placeholder="WDU - Wahana Data Utama"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Meta Description</label>
                  <textarea 
                    value={editingPage.metaDesc}
                    rows={4}
                    onChange={(e) => setEditingPage({...editingPage, metaDesc: e.target.value})}
                    className="w-full p-4 bg-gray-50/80 hover:bg-gray-50 border-2 border-transparent rounded-2xl text-sm font-medium text-gray-600 focus:border-[#6ab149] focus:ring-2 focus:ring-[#6ab149]/10 outline-none transition-all resize-none"
                    placeholder="Deskripsi singkat halaman..."
                  />
                  <div className="flex justify-between px-1">
                    <p className="text-[9px] text-gray-400 italic">Disarankan maksimal 160 karakter.</p>
                    <p className={`text-[10px] font-bold ${editingPage.metaDesc.length > 160 ? 'text-red-500' : 'text-[#6ab149]'}`}>
                      {editingPage.metaDesc.length}/160
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-gray-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Visibility Status</h4>
                  <p className="text-[10px] text-gray-400 font-medium">Aktifkan untuk menampilkan halaman ke publik.</p>
                </div>
                <div 
                  onClick={() => setEditingPage({...editingPage, isPublished: !editingPage.isPublished})}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${editingPage.isPublished ? 'bg-gradient-to-r from-[#6ab149] to-[#5a9e3f]' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${editingPage.isPublished ? 'left-7' : 'left-1'}`}></div>
                </div>
              </div>
            </div>

            <footer className="mt-10 pt-6 border-t-2 border-gray-50 flex gap-4">
              <button 
                onClick={() => setEditingPage(null)}
                className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 hover:text-gray-500 transition-colors rounded-2xl"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdatePage}
                disabled={isSaving}
                className="flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r from-[#6ab149] to-[#5a9e3f] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-[#6ab149]/25 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70"
              >
                {isSaving ? (
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <Save size={18} /> Update Content
                  </>
                )}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
