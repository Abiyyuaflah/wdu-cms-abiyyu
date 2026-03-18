const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchLandingContent() {
  const res = await fetch(`${API_BASE_URL}/landing`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
}

export async function updateContent(section: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/admin/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section, data }),
  });
  if (!res.ok) throw new Error('Failed to update content');
  return res.json();
}
