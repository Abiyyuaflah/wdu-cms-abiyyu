'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  order: number;
}

export default function GalleryAdmin() {
  const { token } = useAuth();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/content/gallery');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:8000/api/content/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Gallery item added successfully!' });
        setFormData({ title: '', imageUrl: '' });
        fetchGallery();
      } else {
        setMessage({ type: 'error', text: 'Failed to add item.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred.' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/content/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Item deleted successfully!' });
        fetchGallery();
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete item.' });
    }
  };

  if (isLoading) {
    return <div className="text-slate-500">Loading gallery...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm max-w-2xl">
        <h2 className="text-lg font-extrabold text-accent-dark mb-6">Add New Gallery Item</h2>

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
            <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-none"
              placeholder="https://..."
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-primary/90"
          >
            Add to Gallery
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h2 className="text-lg font-extrabold text-accent-dark mb-4">Gallery Items ({items.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative group">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full aspect-square object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white rounded-full hover:bg-red-50"
                >
                  <span className="material-symbols-outlined text-red-500">delete</span>
                </button>
              </div>
              <p className="text-sm font-bold text-slate-700 mt-2 truncate">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
