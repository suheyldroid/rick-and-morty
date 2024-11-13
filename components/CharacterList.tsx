import CharacterCard from './CharacterCard';
import {getCharacters} from "@/lib/api";
import CharacterPagination from "@/components/CharacterPagination";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import { getTranslations } from 'next-intl/server';

export default async function CharacterList({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const t = await getTranslations('Character');
    const status = searchParams?.status as string | undefined;
    const gender = searchParams?.gender as string | undefined;
    const name = searchParams?.name as string | undefined;
    const page = Number(searchParams?.page) || 1;

    const response = await getCharacters({status, gender, page, name});

    if (response.results.length === 0) {
        return (
            <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    {t('noResults')}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {response.results.map((character) => (
                    <CharacterCard key={character.id} character={character}/>
                ))}
            </div>
            <CharacterPagination pagination={response.info} searchParams={searchParams}/>
        </>
    );
}

interface Props {
    searchParams: { [key: string]: string | string[] | undefined };
}