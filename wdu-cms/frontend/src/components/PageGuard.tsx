import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePages } from '../context/PageContext';
import NotFoundPage from '../pages/NotFoundPage';

interface PageGuardProps {
  slug: string;
  children: React.ReactNode;
}

export default function PageGuard({ slug, children }: PageGuardProps) {
  const { pages, loading } = usePages();
  const [published, setPublished] = useState(true);
  const [checked, setChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      const page = pages.find(p => p.slug === slug);
      
      // If page not found in state, assume it's published (don't 404)
      if (!page) {
        console.warn(`[PageGuard] ${slug} not found in pages state, defaulting to published=true`);
        setPublished(true);
      } else {
        console.log(`[PageGuard] ${slug} => published: ${page.isPublished}`);
        setPublished(page.isPublished);
      }
      
      setChecked(true);
    }
  }, [slug, pages, loading, location.pathname]);

  if (!checked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!published) {
    return <NotFoundPage />;
  }

  return <>{children}</>;
}
