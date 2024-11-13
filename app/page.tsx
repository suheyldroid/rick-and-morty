import CharacterList from '@/components/CharacterList';
import CharacterFilters from "@/components/CharacterFilters";
import SearchBar from "@/components/SearchBar";
import {Suspense} from "react";
import {CharacterDetailSkeleton} from "@/components/LoadingSkeleton";

export default async function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    return (
        <main className="min-h-screen bg-[#1a1a1a]">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
                        Rick and Morty Karakterleri
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Çoklu evrenleri keşfet ve favori karakterlerini bul
                    </p>
                </div>

                <SearchBar />
                <CharacterFilters />
                
                <Suspense fallback={<CharacterDetailSkeleton />}>
                    <CharacterList searchParams={searchParams} />
                </Suspense>
            </div>
        </main>
    );
}