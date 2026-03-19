'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function AboutAdmin() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    aboutTitle: 'Human Intuition. Machine Precision.',
    aboutText: "Founded in 2006, we've evolved from a research powerhouse into a digital transformation catalyst. We understand that data isn't just numbers—it's the pulse of your future enterprise.",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:8000/api/content/global', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'About section updated successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update about section.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h2 className="text-lg font-extrabold text-accent-dark mb-6">About Section Settings</h2>

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.aboutTitle}
              onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.aboutText}
              onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
