import { getCharacterById, getCharacterWithEpisodes } from "@/lib/api";
import { CharacterDetail } from "@/components/CharacterDetail";
import { Suspense } from "react";
import { CharacterDetailSkeleton } from "@/components/LoadingSkeleton";
import { getTranslations } from 'next-intl/server';
import EpisodesTable from "@/components/EpisodesTable";

export default async function CharacterDetailPage({
    params
}: {
    params: { id: string, locale: string }
}) {
    const t = await getTranslations('Character');
    const { character, episodes } = await getCharacterWithEpisodes(params.id);

    if (!character) {
        return <div>{t('notFound')}</div>;
    }

    return (
        <Suspense fallback={<CharacterDetailSkeleton />}>
            <CharacterDetail character={character} />
            <EpisodesTable episodes={episodes} />
        </Suspense>
    );
} 