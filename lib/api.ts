import {Character, CharacterResponse, Episode} from './types';

export async function getCharacters({
                                        status,
                                        gender,
                                        page = 1,
                                        name,
                                    }: {
    status?: string;
    gender?: string;
    page?: number;
    name?: string;
}): Promise<CharacterResponse> {
    const params = new URLSearchParams();
    if (status) params.append('status', status.toLowerCase());
    if (gender) params.append('gender', gender.toLowerCase());
    if (name) params.append('name', name);
    params.append('page', page.toString());

    const response = await fetch(
        `https://rickandmortyapi.com/api/character?${params.toString()}`,
        {next: {revalidate: 60}}
    );

    if (!response.ok) {
        if (response.status === 404) {
            return {
                info: {count: 0, pages: 0, next: null, prev: null},
                results: []
            };
        }
        throw new Error('API hatası');
    }

    return response.json();
}

export async function getCharacterById(id: string): Promise<Character> {
    try {
        const response = await fetch(
            `https://rickandmortyapi.com/api/character/${id}`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
            throw new Error(`Karakter bulunamadı: ${id}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Karakter getirme hatası:', error);
        throw error;
    }
}

export async function getCharacterWithEpisodes(id: string): Promise<{character: Character; episodes: Episode[]}> {
    const character = await getCharacterById(id);
    
    // Bölüm ID'lerini URL'lerden çıkar
    const episodeIds = character.episode.map(url => url.split('/').pop()).join(',');
    
    // Tüm bölümleri tek seferde çek
    const episodesResponse = await fetch(
        `https://rickandmortyapi.com/api/episode/${episodeIds}`,
        { next: { revalidate: 3600 } }
    );

    if (!episodesResponse.ok) {
        throw new Error('Bölüm bilgileri alınamadı');
    }

    // Tek bölüm varsa dizi haline getir, birden fazla bölüm varsa zaten dizi gelecek
    const episodesData = await episodesResponse.json();
    const episodes = Array.isArray(episodesData) ? episodesData : [episodesData];

    // Bölümleri sezon ve bölüm numarasına göre sırala
    const sortedEpisodes = episodes.sort((a, b) => {
        const [aSeasonNum, aEpNum] = a.episode.match(/S(\d+)E(\d+)/)?.slice(1).map(Number) || [0, 0];
        const [bSeasonNum, bEpNum] = b.episode.match(/S(\d+)E(\d+)/)?.slice(1).map(Number) || [0, 0];
        
        return aSeasonNum === bSeasonNum ? aEpNum - bEpNum : aSeasonNum - bSeasonNum;
    });

    return { character, episodes: sortedEpisodes };
}