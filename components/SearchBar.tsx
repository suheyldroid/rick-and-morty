'use client';

import {Input} from "@/components/ui/input";
import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useState} from "react";
import {debounce} from "lodash";
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function SearchBar() {
    const t = useTranslations('filters');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('name') || '');

    const debouncedSearch = useCallback(
        debounce((term: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (term) {
                params.set('name', term);
            } else {
                params.delete('name');
            }
            params.set('page', '1');
            router.push(`${pathname}?${params.toString()}`);
        }, 300),
        [searchParams, pathname]
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        debouncedSearch(term);
    };

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={handleSearch}
                className="bg-[#2a2a2a] border-gray-700 text-gray-200 placeholder:text-gray-400"
            />
        </div>
    );
} 