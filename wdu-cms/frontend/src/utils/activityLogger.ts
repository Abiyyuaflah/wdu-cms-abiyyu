/**
 * Activity Logger Utility
 * Menyimpan log aktivitas ke localStorage dan mengirim storage event
 * agar dashboard dapat memantau secara real-time.
 */

export type ActivityType =
  | 'admin'     // aksi admin (CRUD)
  | 'system'    // sistem otomatis
  | 'public'    // perubahan halaman publik
  | 'message'   // pesan masuk
  | 'media'     // upload/hapus media
  | 'config';   // perubahan konfigurasi

export type ActivityAction =
  | 'Membuat'
  | 'Mengubah'
  | 'Menghapus'
  | 'Mengunggah'
  | 'Login'
  | 'Menyimpan'
  | 'Mengaktifkan'
  | 'Menonaktifkan'
  | 'Membaca'
  | 'Membalas'
  | 'Mengarsipkan'
  | 'Mengekspor';

export interface ActivityLog {
  id: string;
  action: ActivityAction | string;
  actor: string;
  target: string;
  section: string;       // e.g. "Hero", "Layanan", "Proyek", "Konfigurasi Situs"
  page: string;          // e.g. "Admin Panel", "Halaman Utama"
  timestamp: string;
  type: ActivityType;
  detail?: string;       // deskripsi tambahan opsional
}

const STORAGE_KEY = 'wdu_activity_logs';
const MAX_LOGS = 50;

/** Ambil semua log aktivitas */
export function getActivityLogs(): ActivityLog[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/** Tambah log aktivitas baru */
export function logActivity(params: Omit<ActivityLog, 'id' | 'timestamp'>): void {
  try {
    const logs = getActivityLogs();
    const newLog: ActivityLog = {
      ...params,
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
    };

    // Tambahkan di depan, batasi maksimal MAX_LOGS entri
    const updated = [newLog, ...logs].slice(0, MAX_LOGS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch storage event agar tab lain / komponen lain bisa dengar
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: JSON.stringify(updated),
        storageArea: localStorage,
      })
    );
  } catch (err) {
    console.warn('[ActivityLogger] Failed to write log:', err);
  }
}

/** Hapus semua log */
export function clearActivityLogs(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(
    new StorageEvent('storage', { key: STORAGE_KEY, newValue: null, storageArea: localStorage })
  );
}

/** Helper: ikon material symbol berdasarkan tipe */
export function getActivityIcon(type: ActivityType): string {
  switch (type) {
    case 'admin':   return 'manage_accounts';
    case 'system':  return 'settings';
    case 'public':  return 'language';
    case 'message': return 'mail';
    case 'media':   return 'perm_media';
    case 'config':  return 'tune';
    default:        return 'history';
  }
}

/** Helper: warna badge berdasarkan tipe */
export function getActivityColor(type: ActivityType): string {
  switch (type) {
    case 'admin':   return 'bg-primary/10 text-primary';
    case 'system':  return 'bg-secondary/10 text-secondary';
    case 'public':  return 'bg-blue-500/10 text-blue-500';
    case 'message': return 'bg-orange-500/10 text-orange-500';
    case 'media':   return 'bg-purple-500/10 text-purple-500';
    case 'config':  return 'bg-teal-500/10 text-teal-500';
    default:        return 'bg-surface-container text-on-surface-variant';
  }
}

/** Relative time helper (mis. "2 menit lalu") */
export function timeAgo(isoTimestamp: string): string {
  const diff = Math.floor((Date.now() - new Date(isoTimestamp).getTime()) / 1000);
  if (diff < 60) return `${diff} dtk lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)} mnt lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
}
