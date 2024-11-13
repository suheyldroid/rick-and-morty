export interface Character {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface CharacterResponse {
    info: ResponsePagination;
    results: Character[];
}

export interface ResponsePagination {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string; // Format: "S01E01"
    characters: string[];
    url: string;
    created: string;
}