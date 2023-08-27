import React, { createContext, useCallback, useContext, useState } from 'react';

interface Breadcrumb {
   label: string;
   link: string;
}

interface BreadcrumbContextProps {
   breadcrumbs: Breadcrumb[];
   addBreadcrumb: ({ label, link }: Breadcrumb) => void;
   clearBreadcrumbs: () => void;
}

interface BreadcrumbProviderProps {
    children: React.ReactNode;
}

const initialBreadcrumb: Breadcrumb = {
    label: 'Home',
    link: '/'
}

const BreadcrumbContext = createContext<BreadcrumbContextProps | undefined>(undefined);

export function BreadcrumbProvider({ children }: BreadcrumbProviderProps) {
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([initialBreadcrumb]);

    const addBreadcrumb = useCallback(({ label, link }: Breadcrumb) => {
        setBreadcrumbs((prevBreadcrumbs) => [
            ...prevBreadcrumbs,
            { label, link },
        ]);
    }, []);

    const clearBreadcrumbs = () => {
        setBreadcrumbs([initialBreadcrumb]);
    };

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs, addBreadcrumb, clearBreadcrumbs }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

export function useBreadcrumb() {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
    }
    return context;
}
