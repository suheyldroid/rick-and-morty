'use client';

import {useRouter, useSearchParams, usePathname} from 'next/navigation';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {RotateCcw} from 'lucide-react';
import {Label} from '@/components/ui/label';
import { useTranslations } from 'next-intl';

export default function CharacterFilters() {
    const t = useTranslations('filters');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleStatusChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all') {
            params.delete('status');
        } else {
            params.set('status', value);
        }
        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleGenderChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all') {
            params.delete('gender');
        } else {
            params.set('gender', value);
        }
        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`);
    };

    const resetFilters = () => {
        router.push(pathname);
    };

    return (
        <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label className="text-gray-200">{t('status.label')}</Label>
                    <Select value={searchParams.get('status') || 'all'} onValueChange={handleStatusChange}>
                        <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-gray-200">
                            <SelectValue placeholder={t('status.placeholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2a2a2a] border-gray-700">
                            <SelectItem value="all" className="text-gray-200">
                                {t('status.all')}
                            </SelectItem>
                            <SelectItem value="alive" className="text-gray-200">
                                {t('status.alive')}
                            </SelectItem>
                            <SelectItem value="dead" className="text-gray-200">
                                {t('status.dead')}
                            </SelectItem>
                            <SelectItem value="unknown" className="text-gray-200">
                                {t('status.unknown')}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-gray-200">{t('gender.label')}</Label>
                    <Select value={searchParams.get('gender') || 'all'} onValueChange={handleGenderChange}>
                        <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-gray-200">
                            <SelectValue placeholder={t('gender.placeholder')} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2a2a2a] border-gray-700">
                            <SelectItem value="all" className="text-gray-200">
                                {t('gender.all')}
                            </SelectItem>
                            <SelectItem value="male" className="text-gray-200">
                                {t('gender.male')}
                            </SelectItem>
                            <SelectItem value="female" className="text-gray-200">
                                {t('gender.female')}
                            </SelectItem>
                            <SelectItem value="genderless" className="text-gray-200">
                                {t('gender.genderless')}
                            </SelectItem>
                            <SelectItem value="unknown" className="text-gray-200">
                                {t('gender.unknown')}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-end">
                    <Button
                        variant="outline"
                        className="w-full border-gray-700 hover:bg-gray-700"
                        onClick={resetFilters}
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        {t('resetFilters')}
                    </Button>
                </div>
            </div>
        </div>
    );
}