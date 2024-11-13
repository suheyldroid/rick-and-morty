import CharacterFilters from '@/components/CharacterFilters';
import CharacterList from '@/components/CharacterList';
import SearchBar from '@/components/SearchBar';
import CharacterListSkeleton from '@/components/CharacterListSkeleton';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
export default function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const t = useTranslations();

    return (
        <main className="min-h-screen bg-[#1a1a1a]">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4 !leading-loose">
                        {t('home.title')}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {t('home.subtitle')}
                    </p>
                </div>

                <SearchBar />
                <CharacterFilters />

                <Suspense fallback={<CharacterListSkeleton />}>
                    <CharacterList searchParams={searchParams} />
                </Suspense>
            </div>
        </main>
    );
} 