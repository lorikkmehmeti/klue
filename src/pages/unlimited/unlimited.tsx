import { useEffect } from 'react';
import { useBreadcrumb } from '@/lib/providers/BreadcrumbProvider.tsx';

export function UnlimitedPage() {
   const { addBreadcrumb, clearBreadcrumbs } = useBreadcrumb();

   useEffect(() => {
      addBreadcrumb({ label: 'Unlimited Challenge', link: '/unlimited' });

      return () => {
         clearBreadcrumbs();
      };
   }, [addBreadcrumb]);

   return <div>unlimited</div>;
}
