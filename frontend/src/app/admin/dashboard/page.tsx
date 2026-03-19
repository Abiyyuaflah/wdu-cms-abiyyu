'use client';

import { useAuth } from '@/hooks/useAuth';

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Services', value: '3', icon: 'apps', color: 'bg-primary' },
    { label: 'Gallery Items', value: '6', icon: 'photo_library', color: 'bg-secondary' },
    { label: 'Experience Years', value: '18', icon: 'workspace_premium', color: 'bg-accent-dark' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <span className="material-symbols-outlined text-white text-2xl">{stat.icon}</span>
            </div>
            <p className="text-3xl font-extrabold text-accent-dark">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h2 className="text-lg font-extrabold text-accent-dark mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/hero"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-primary hover:text-white transition-all group"
          >
            <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">edit</span>
            <span className="text-sm font-bold">Edit Hero</span>
          </a>
          <a
            href="/admin/services"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-primary hover:text-white transition-all group"
          >
            <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">add_circle</span>
            <span className="text-sm font-bold">Add Service</span>
          </a>
          <a
            href="/admin/gallery"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-primary hover:text-white transition-all group"
          >
            <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">add_photo_alternate</span>
            <span className="text-sm font-bold">Add Image</span>
          </a>
          <a
            href="/admin/about"
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-primary hover:text-white transition-all group"
          >
            <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">person</span>
            <span className="text-sm font-bold">Edit About</span>
          </a>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h2 className="text-lg font-extrabold text-accent-dark mb-4">Recent Activity</h2>
        <p className="text-slate-500 text-sm">No recent activity</p>
      </div>
    </div>
  );
}
