'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Episode } from "@/lib/types";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from 'next-intl';
import { Card } from "@/components/ui/card";

interface EpisodesTableProps {
    episodes: Episode[];
}

export default function EpisodesTable({ episodes }: EpisodesTableProps) {
    const t = useTranslations('Character');
    const [selectedSeason, setSelectedSeason] = useState<string>("all");
    const seasons = Array.from(new Set(episodes.map(ep => ep.episode.match(/S(\d+)/)?.[1] || "")));

    const filteredEpisodes = selectedSeason === "all"
        ? episodes
        : episodes.filter(ep => ep.episode.startsWith(`S${selectedSeason.padStart(2, '0')}`));

    return (
        <div className="container mx-auto px-4 mt-8">
            <Card className="bg-[#2a2a2a] border-gray-700">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">{t('episodes')}</h2>
                        <div className="w-[180px]">
                            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                                <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-gray-200">
                                    <SelectValue placeholder={t('selectSeason')} />
                                </SelectTrigger>
                                <SelectContent className="bg-[#2a2a2a] border-gray-700">
                                    <SelectItem value="all" className="text-gray-200">
                                        {t('allSeasons')}
                                    </SelectItem>
                                    {seasons.map((season) => (
                                        <SelectItem 
                                            key={season} 
                                            value={season}
                                            className="text-gray-200"
                                        >
                                            {t('season')} {parseInt(season)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="border rounded-lg border-gray-700 overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-gray-800/50 border-gray-700">
                                    <TableHead className="text-gray-400 w-[100px]">{t('season')}</TableHead>
                                    <TableHead className="text-gray-400 w-[100px]">{t('episode')}</TableHead>
                                    <TableHead className="text-gray-400">{t('name')}</TableHead>
                                    <TableHead className="text-gray-400 hidden md:table-cell w-[150px]">{t('airDate')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEpisodes.map((episode) => {
                                    const [, season, episodeNum] = episode.episode.match(/S(\d+)E(\d+)/) || [];
                                    return (
                                        <TableRow
                                            key={episode.id}
                                            className="hover:bg-gray-800/50 border-gray-700 cursor-pointer whitespace-nowrap"
                                            onClick={() => window.open(`https://www.imdb.com/title/tt2861424/episodes?season=${parseInt(season)}`, '_blank')}
                                        >
                                            <TableCell className="text-gray-300">
                                                {t('season')} {parseInt(season)}
                                            </TableCell>
                                            <TableCell className="text-gray-300">
                                                {t('episode')} {parseInt(episodeNum)}
                                            </TableCell>
                                            <TableCell className="text-gray-300 font-medium">
                                                {episode.name}
                                            </TableCell>
                                            <TableCell className="text-gray-300 hidden md:table-cell">
                                                {new Date(episode.air_date).toLocaleDateString('tr-TR')}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </Card>
        </div>
    );
} 