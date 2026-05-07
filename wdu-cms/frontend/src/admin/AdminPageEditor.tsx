import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Save, Plus, Trash2, Layout, Type, Image as ImageIcon, 
  Layers, ChevronUp, ChevronDown, CheckCircle2, AlertCircle,
  FileText, Play, Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { usePages } from '../context/PageContext';

interface Section {
  id: string;
  type: 'text' | 'hero_mini' | 'features' | 'cta' | 'gallery' | 'quote';
  content: any;
}

const SECTION_TYPES = [
  { id: 'text', label: 'Rich Text Block', icon: <Type size={18} />, defaultContent: { title: 'Section Title', body: 'Content goes here...', align: 'left' } },
  { id: 'hero_mini', label: 'Mini Hero', icon: <Layout size={18} />, defaultContent: { badge: 'Limited Offer', title: 'Big Headline', subtitle: 'Supporting text' } },
  { id: 'cta', label: 'Call To Action', icon: <Play size={18} />, defaultContent: { title: 'Ready to start?', buttonText: 'Contact Us', link: '/kontak' } },
  { id: 'quote', label: 'Testimonial / Quote', icon: <Quote size={18} />, defaultContent: { text: 'Quote content', author: 'Author Name', role: 'Position' } },
];

export default function AdminPageEditor() {
  const { slug } = useParams();
  const { refreshPages } = usePages();
  const [page, setPage] = useState<any>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchPage = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/pages/${slug}`);
      setPage(data);
      // Sections is stored as JSON in DB
      const loadedSections = typeof data.sections === 'string' ? JSON.parse(data.sections) : (data.sections || []);
      setSections(loadedSections);
    } catch (error) {
      console.error('Failed to fetch page:', error);
      showToast('error', 'Failed to load page content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put(`/pages/${slug}`, { 
        ...page, 
        sections: sections // Prisma Json field handles this
      });
      await refreshPages();
      showToast('success', 'Page content saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      showToast('error', 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const addSection = (typeId: string) => {
    const typeDef = SECTION_TYPES.find(t => t.id === typeId);
    const newSection: Section = {
      id: `sec_${Date.now()}`,
      type: typeId as any,
      content: { ...(typeDef?.defaultContent || {}) }
    };
    setSections([...sections, newSection]);
    setShowTypeSelector(false);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);
  };

  const updateSectionContent = (id: string, field: string, value: any) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, content: { ...s.content, [field]: value } } : s
    ));
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#6ab149]/20 border-t-[#6ab149] rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Editor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-32 animate-in fade-in duration-1000">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-24 right-8 z-[100] px-8 py-4 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-3 animate-in slide-in-from-right duration-500 ${
          toast.type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-[#6ab149]' : 'bg-white/20'}`}>
            <span className="material-symbols-outlined text-[14px]">
              {toast.type === 'success' ? 'check' : 'close'}
            </span>
          </div>
          {toast.msg}
        </div>
      )}

      {/* Header Premium */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#6ab149] to-[#5a9e3f] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#6ab149]/20">
              <FileText size={20} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
              Edit <span className="text-[#6ab149]">Content</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm font-medium pl-1 shadow-sm flex items-center gap-2">
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono text-slate-500">REF: {slug?.toUpperCase()}</span>
            Arrange and design dynamic sections for this page.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={fetchPage}
            className="px-6 py-4 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all active:scale-95"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-2xl font-black text-sm shadow-2xl hover:bg-[#6ab149] dark:hover:bg-[#6ab149] hover:text-white transition-all active:scale-95 disabled:opacity-70 flex items-center gap-3"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={18} />}
            Publish Changes
          </button>
        </div>
      </header>

      {/* Section List */}
      <div className="space-y-10">
        {sections.length === 0 ? (
          <div className="group relative py-32 bg-slate-50 dark:bg-slate-800/20 rounded-[3rem] text-center border-2 border-dashed border-slate-200 dark:border-slate-800 transition-all hover:border-[#6ab149]/30">
            <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-[2.5rem] flex items-center justify-center shadow-xl mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
              <Layers size={40} className="text-slate-200" />
            </div>
            <div className="space-y-2 mb-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Empty Layout</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">Start building your premium page experience by adding sections.</p>
            </div>
            <button 
              onClick={() => setShowTypeSelector(true)}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#6ab149] transition-all shadow-xl"
            >
              Add First Section
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {sections.map((section, index) => (
              <motion.div
                layout
                key={section.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-[#6ab149]/5 transition-all duration-500 overflow-hidden"
              >
                {/* Control Panel */}
                <div className="px-10 py-6 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-[#6ab149] shadow-sm border border-slate-100 dark:border-slate-700 group-hover:rotate-12 transition-transform duration-500">
                      {SECTION_TYPES.find(t => t.id === section.type)?.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em]">Section 0{index + 1}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span className="text-[10px] font-black text-[#6ab149] uppercase tracking-[0.2em]">{section.type}</span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white capitalize tracking-tight">{section.type.replace('_', ' ')} Block</h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-100 dark:border-slate-700">
                      <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-2 text-slate-400 hover:text-[#6ab149] hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg disabled:opacity-20 transition-all"><ChevronUp size={20} /></button>
                      <button onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1} className="p-2 text-slate-400 hover:text-[#6ab149] hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg disabled:opacity-20 transition-all"><ChevronDown size={20} /></button>
                    </div>
                    <button onClick={() => removeSection(section.id)} className="w-11 h-11 flex items-center justify-center bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 size={20} /></button>
                  </div>
                </div>

                {/* Editor Surface */}
                <div className="p-10 bg-white dark:bg-slate-900">
                  {section.type === 'text' && (
                    <div className="grid gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Section Title</label>
                        <input 
                          type="text" 
                          value={section.content.title}
                          onChange={(e) => updateSectionContent(section.id, 'title', e.target.value)}
                          placeholder="Headline for this section..."
                          className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] text-lg font-black text-slate-900 dark:text-white border-2 border-transparent focus:border-[#6ab149] focus:bg-white dark:focus:bg-slate-800 transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Body Content</label>
                        <textarea 
                          rows={6}
                          value={section.content.body}
                          onChange={(e) => updateSectionContent(section.id, 'body', e.target.value)}
                          placeholder="Rich content here..."
                          className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] text-base text-slate-600 dark:text-slate-400 leading-relaxed border-2 border-transparent focus:border-[#6ab149] focus:bg-white dark:focus:bg-slate-800 transition-all outline-none resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {section.type === 'hero_mini' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Badge Text</label>
                        <input 
                          type="text" 
                          value={section.content.badge}
                          onChange={(e) => updateSectionContent(section.id, 'badge', e.target.value)}
                          className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-[#6ab149]"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest ml-1">Main Headline</label>
                        <input 
                          type="text" 
                          value={section.content.title}
                          onChange={(e) => updateSectionContent(section.id, 'title', e.target.value)}
                          className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-[#6ab149]"
                        />
                      </div>
                    </div>
                  )}

                  {section.type === 'cta' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-3 md:col-span-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CTA Headline</label>
                        <input 
                          type="text" 
                          value={section.content.title}
                          onChange={(e) => updateSectionContent(section.id, 'title', e.target.value)}
                          className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-[#6ab149]"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Button Label</label>
                        <input 
                          type="text" 
                          value={section.content.buttonText}
                          onChange={(e) => updateSectionContent(section.id, 'buttonText', e.target.value)}
                          className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-[#6ab149]"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Link</label>
                        <input 
                          type="text" 
                          value={section.content.link}
                          onChange={(e) => updateSectionContent(section.id, 'link', e.target.value)}
                          className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-[#6ab149]"
                        />
                      </div>
                    </div>
                  )}

                  {section.type === 'quote' && (
                    <div className="space-y-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Testimonial Quote</label>
                        <textarea 
                          rows={4}
                          value={section.content.text}
                          onChange={(e) => updateSectionContent(section.id, 'text', e.target.value)}
                          className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] text-lg font-medium border-2 border-transparent focus:border-[#6ab149] focus:bg-white outline-none italic text-slate-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Author Name</label>
                          <input 
                            type="text" 
                            value={section.content.author}
                            onChange={(e) => updateSectionContent(section.id, 'author', e.target.value)}
                            className="w-full px-8 py-5 bg-slate-50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-[#6ab149]"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Designation</label>
                          <input 
                            type="text" 
                            value={section.content.role}
                            onChange={(e) => updateSectionContent(section.id, 'role', e.target.value)}
                            className="w-full px-8 py-5 bg-slate-50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-[#6ab149]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* No specific inputs for preview blocks, they just render the components */}
                  {['hero_main', 'services_preview', 'about_preview', 'trust_clients', 'gallery_preview', 'visi_misi', 'direksi_grid', 'portfolio_timeline', 'services_grid', 'contact_form'].includes(section.type) && (
                    <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        This section renders the {section.type.replace('_', ' ')} component.
                      </p>
                      <p className="text-[10px] text-slate-300 mt-2 italic">No additional configuration required for this block.</p>
                    </div>
                  )}

                  {/* Fallback */}
                  {!['text', 'hero_mini', 'cta', 'quote', 'hero_main', 'services_preview', 'about_preview', 'trust_clients', 'gallery_preview', 'visi_misi', 'direksi_grid', 'portfolio_timeline', 'services_grid', 'contact_form'].includes(section.type) && (
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 border border-dashed border-slate-200">
                      <AlertCircle size={18} /> Module under construction
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Section Controls */}
      <div className="mt-20 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
        </div>
        <div className="relative flex justify-center">
          <button 
            onClick={() => setShowTypeSelector(!showTypeSelector)}
            className="group px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-[#6ab149] dark:hover:bg-[#6ab149] hover:text-white transition-all active:scale-95 flex items-center gap-3"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
              <Plus size={16} />
            </div>
            Add Section
          </button>
        </div>

        <AnimatePresence>
          {showTypeSelector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full left-0 right-0 mb-10 p-6 bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-slate-800 grid grid-cols-2 md:grid-cols-5 gap-4 z-50 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50/50 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              {SECTION_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => addSection(type.id)}
                  className="relative flex flex-col items-center gap-4 p-6 rounded-[2rem] hover:bg-[#6ab149]/5 text-slate-600 dark:text-slate-400 hover:text-[#6ab149] transition-all group"
                >
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-white dark:group-hover:bg-slate-700 transition-all">
                    {type.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-center">{type.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
