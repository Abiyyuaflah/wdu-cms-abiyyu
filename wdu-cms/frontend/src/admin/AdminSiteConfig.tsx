import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import { logActivity } from '../utils/activityLogger';

const SUPER_ADMIN_EMAIL = 'admin@wdu.co.id';

interface SiteConfig {
  email: string;
  telepon: string;
  alamat: string;
  companyProfile: string;
  footerCopyright: string;
  socialYoutube: string;
  socialInstagram: string;
}

const defaultConfig: SiteConfig = {
  email: 'info@wahanadata.co.id',
  telepon: '+62 21 1234 5678',
  alamat: 'Jakarta, Indonesia',
  companyProfile: '',
  footerCopyright: '© 2024 Wahana Data Utama. All rights reserved.',
  socialYoutube: '',
  socialInstagram: '',
};

const STORAGE_KEY = 'wdu_site_config';

export default function AdminSiteConfig() {
  const user = useAuthStore((state) => state.user);
  const isSuperAdmin = user?.email === SUPER_ADMIN_EMAIL;

  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setConfig({ ...defaultConfig, ...JSON.parse(stored) });
      } catch (e) {
        setConfig(defaultConfig);
      }
    }
  }, []);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (field: keyof SiteConfig, value: string) => {
    if (!isSuperAdmin) return;
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!isSuperAdmin) return;
    setSaving(true);
    try {
      // Check if companyProfile was removed (to delete from server)
      const oldConfig = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (oldConfig.companyProfile && !config.companyProfile) {
        // File was removed, try to delete from server
        try {
          // Extract filename from URL
          const urlParts = oldConfig.companyProfile.split('/');
          const filename = urlParts[urlParts.length - 1];
          if (filename) {
            await api.delete(`/upload/${filename}`).catch(err => {
              console.warn('Failed to delete file from server:', err);
            });
          }
        } catch (e) {
          console.warn('Error deleting file:', e);
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
       showToast('success', 'Site configuration saved successfully!');
       logActivity({
         action: 'Save',
         actor: user?.name || user?.email || 'Super Admin',
         target: 'Site Configuration',
         section: 'Configuration',
         page: 'Admin Panel',
         type: 'config',
         detail: `Email: ${config.email} | Phone: ${config.telepon}`,
       });
    } catch (e) {
       showToast('error', 'Failed to save configuration.');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof SiteConfig) => {
    if (!isSuperAdmin) return;
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf', 'text/html'];
    const ext = file.name.toLowerCase().split('.').pop();
    const allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'pdf', 'html', 'htm'];
    
    if (!allowedTypes.includes(file.type) && !allowedExts.includes(ext || '')) {
      showToast('error', 'Tipe file tidak didukung. Gunakan JPG, PNG, WEBP, GIF, SVG, PDF, atau HTML.');
      return;
    }

    // Security warning for HTML files
    if (file.type === 'text/html' || ext === 'html' || ext === 'htm') {
      showToast('error', '⚠️ PERHATIAN: File HTML bisa mengandung JavaScript berbahaya (XSS risk). Pastikan file berasal dari sumber terpercaya.');
    }

    // Validate file size (20MB)
    if (file.size > 20 * 1024 * 1024) {
      showToast('error', 'Ukuran file maksimal 20MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await api.post('/upload', formData);
       // Jangan set Content-Type manually, biar browser yang atur multipart boundary

      handleChange(field, data.url);
       showToast('success', 'File berhasil diupload!');
     } catch (err: any) {
       console.error('Upload failed:', err);
       const errorMessage = err.response?.data?.error || 'Gagal mengupload file. Pastikan backend server berjalan.';
       showToast('error', errorMessage);
     } finally {
       setUploading(false);
       // Reset file input
       e.target.value = '';
     }
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl">
      {toast && (
        <div className={`fixed top-20 right-6 z-[100] px-6 py-3 rounded-xl shadow-lg font-semibold text-sm flex items-center gap-2 ${toast.type === 'success' ? 'bg-[#6ab149] text-white' : 'bg-red-500 text-white'}`}>
          <span className="material-symbols-outlined text-base">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div>
         <h1 className="text-3xl font-black text-on-surface">Site Configuration</h1>
         <p className="text-on-surface-variant text-sm mt-1">11.5 Site Configuration</p>
      </div>

      {/* Access Restriction Banner */}
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

      {/* INFORMASI KONTAK Card */}
      <section className={`bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/20 ${!isSuperAdmin ? 'opacity-75' : ''}`}>
           <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
           <span className="material-symbols-outlined text-[#6ab149]">contact_mail</span>
           CONTACT INFORMATION
         </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
             <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Site Email</label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => handleChange('email', e.target.value)}
              readOnly={!isSuperAdmin}
              className={`px-4 py-3 bg-surface-container rounded-xl border-2 border-transparent outline-none text-sm ${isSuperAdmin ? 'focus:border-[#6ab149] cursor-text' : 'cursor-not-allowed text-on-surface-variant'}`}
              placeholder="email@domain.com"
            />
          </div>
          <div className="flex flex-col gap-2">
             <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Phone Number</label>
            <input
              type="text"
              value={config.telepon}
              onChange={(e) => handleChange('telepon', e.target.value)}
              readOnly={!isSuperAdmin}
              className={`px-4 py-3 bg-surface-container rounded-xl border-2 border-transparent outline-none text-sm ${isSuperAdmin ? 'focus:border-[#6ab149] cursor-text' : 'cursor-not-allowed text-on-surface-variant'}`}
              placeholder="+62 21 1234 5678"
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
             <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Physical Address</label>
            <textarea
              value={config.alamat}
              onChange={(e) => handleChange('alamat', e.target.value)}
              readOnly={!isSuperAdmin}
              rows={3}
              className={`px-4 py-3 bg-surface-container rounded-xl border-2 border-transparent outline-none text-sm resize-none ${isSuperAdmin ? 'focus:border-[#6ab149] cursor-text' : 'cursor-not-allowed text-on-surface-variant'}`}
               placeholder="Jl. Example No. 123, Jakarta..."
            />
          </div>
        </div>
      </section>

       {/* COMPANY PROFILE Card */}
       <section className={`bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/20 ${!isSuperAdmin ? 'opacity-75' : ''}`}>
            <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#6ab149]">description</span>
            COMPANY PROFILE FILE
          </h2>
         <div className="border-2 border-dashed border-outline-variant/30 rounded-xl p-8 text-center">
           <span className="material-symbols-outlined text-6xl text-outline-variant/30 mb-4">picture_pdf</span>
            <p className="text-sm text-on-surface mb-4">Upload/change Company Profile file (PDF, HTML)</p>
           {isSuperAdmin ? (
             config.companyProfile ? (
               <div className="flex flex-col items-center gap-4">
                  <span className="text-xs text-on-surface-variant bg-green-50 text-green-600 px-3 py-1 rounded-full">File saved - Upload disabled until deleted</span>
                 <div className="flex items-center gap-4">
                   <label className="cursor-not-allowed px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-semibold text-sm">
                      <span className="material-symbols-outlined text-base mr-1">upload</span>
                      Change File (Disabled)
                     <input type="file" accept=".pdf,.html,.htm" className="hidden" disabled={true} />
                   </label>
                   <button 
                     onClick={() => {
                       handleChange('companyProfile', '');
                       showToast('success', 'File marked for deletion. Click Save to confirm.');
                     }}
                     className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors flex items-center gap-2"
                   >
                     <span className="material-symbols-outlined text-base">delete</span>
                     Delete File
                   </button>
                 </div>
               </div>
             ) : (
               <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-[#6ab149] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all">
                 <span className="material-symbols-outlined text-base">upload</span>
                 Upload File
                 <input type="file" accept=".pdf,.html,.htm" className="hidden" onChange={(e) => handleFileUpload(e, 'companyProfile')} disabled={uploading} />
               </label>
             )
           ) : (
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container rounded-lg">
               {config.companyProfile ? (
                 <span className="text-xs text-on-surface-variant">File uploaded</span>
               ) : (
                 <span className="text-xs text-on-surface-variant">No file uploaded</span>
               )}
             </div>
           )}
         </div>
       </section>

      {/* FOOTER & SOCIAL MEDIA Card */}
      <section className={`bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/20 ${!isSuperAdmin ? 'opacity-75' : ''}`}>
        <h2 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#6ab149]">footer</span>
          FOOTER & SOCIAL MEDIA
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Footer Copyright Text</label>
            <input
              type="text"
              value={config.footerCopyright}
              onChange={(e) => handleChange('footerCopyright', e.target.value)}
              readOnly={!isSuperAdmin}
              className={`px-4 py-3 bg-surface-container rounded-xl border-2 border-transparent outline-none text-sm ${isSuperAdmin ? 'focus:border-[#6ab149] cursor-text' : 'cursor-not-allowed text-on-surface-variant'}`}
              placeholder="© 2024 Company Name. All rights reserved."
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">YouTube</label>
              <div className={`flex items-center gap-2 px-3 py-2.5 bg-surface-container rounded-xl border-2 border-transparent outline-none ${isSuperAdmin ? 'focus-within:border-[#6ab149]' : ''}`}>
                <span className="material-symbols-outlined text-red-600 text-sm">smart_display</span>
                <input
                  type="text"
                  value={config.socialYoutube}
                  onChange={(e) => handleChange('socialYoutube', e.target.value)}
                  readOnly={!isSuperAdmin}
                  className={`flex-1 bg-transparent outline-none text-sm ${!isSuperAdmin ? 'cursor-not-allowed text-on-surface-variant' : ''}`}
                  placeholder="youtube.com/..."
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Instagram</label>
              <div className={`flex items-center gap-2 px-3 py-2.5 bg-surface-container rounded-xl border-2 border-transparent outline-none ${isSuperAdmin ? 'focus-within:border-[#6ab149]' : ''}`}>
                <span className="material-symbols-outlined text-pink-500 text-sm">photo_camera</span>
                <input
                  type="text"
                  value={config.socialInstagram}
                  onChange={(e) => handleChange('socialInstagram', e.target.value)}
                  readOnly={!isSuperAdmin}
                  className={`flex-1 bg-transparent outline-none text-sm ${!isSuperAdmin ? 'cursor-not-allowed text-on-surface-variant' : ''}`}
                  placeholder="instagram.com/..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Save Button — hanya tampil untuk Super Admin */}
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