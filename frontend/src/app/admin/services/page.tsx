'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
  order: number;
}

export default function ServicesAdmin() {
  const { token } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'analytics',
    link: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/content/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const url = editingId
        ? `http://localhost:8000/api/content/services/${editingId}`
        : 'http://localhost:8000/api/content/services';

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: `Service ${editingId ? 'updated' : 'created'} successfully!` });
        setFormData({ title: '', description: '', icon: 'analytics', link: '' });
        setEditingId(null);
        fetchServices();
      } else {
        setMessage({ type: 'error', text: 'Failed to save service.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred.' });
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      link: service.link,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/content/services/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Service deleted successfully!' });
        fetchServices();
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete service.' });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', icon: 'analytics', link: '' });
  };

  if (isLoading) {
    return <div className="text-slate-500">Loading services...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm max-w-2xl">
        <h2 className="text-lg font-extrabold text-accent-dark mb-6">
          {editingId ? 'Edit Service' : 'Add New Service'}
        </h2>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-bold ${
              message.type === 'success'
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Icon (Material Symbol)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none"
                placeholder="e.g., analytics"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Link Text</label>
            <input
              type="text"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-primary/90"
            >
              {editingId ? 'Update' : 'Create'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h2 className="text-lg font-extrabold text-accent-dark mb-4">Existing Services</h2>
        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-2xl">{service.icon}</span>
                <div>
                  <p className="font-bold text-accent-dark">{service.title}</p>
                  <p className="text-sm text-slate-500">{service.description.substring(0, 50)}...</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-primary">edit</span>
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-red-500">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
