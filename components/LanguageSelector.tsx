"use client";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LanguageSelector() {
    const t = useTranslations('language');
    const params = useParams();
    const router = useRouter();
    const currentLocale = params.locale || 'tr';
    const pathname = usePathname()
    function changeLanguage(lang: string) {
        router.push({
            pathname: pathname
        }, { locale: lang, });
    };


    return (
        <Select onValueChange={changeLanguage} defaultValue={currentLocale as string}>
            <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-gray-200 flex items-center w-fit gap-2">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue placeholder={t('select')} />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] border-gray-700">
                <SelectItem value="tr" className="text-gray-200">
                    {t('tr')}
                </SelectItem>
                <SelectItem value="en" className="text-gray-200">
                    {t('en')}
                </SelectItem>
            </SelectContent>
        </Select>
    );
}

; 