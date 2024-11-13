import { Character } from "@/lib/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useTranslations } from 'next-intl';

interface CharacterDetailProps {
    character: Character;
}

export function CharacterDetail({ character }: CharacterDetailProps) {
    const t = useTranslations('Character');
    const statusColor = {
        Alive: 'bg-green-500',
        Dead: 'bg-red-500',
        unknown: 'bg-gray-500',
    }[character.status];

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="bg-[#2a2a2a] border-gray-700 overflow-hidden">
                <div className="md:flex">
                    <div className="relative h-96 md:w-96 shrink-0">
                        <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="p-6 flex-1">
                        <h1 className="text-3xl font-bold text-white mb-4">
                            {character.name}
                        </h1>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className={`h-3 w-3 rounded-full ${statusColor}`} />
                                <span className="text-xl text-gray-200">
                                    {t('status.label')}: {t(`status.${character.status}`)}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400">{t('species')}</p>
                                    <p className="text-gray-200 text-lg">{character.species}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">{t('gender.label')}</p>
                                    <Badge variant="secondary" className="mt-1 bg-gray-700 text-gray-200">
                                        {t(`gender.${character.gender}`)}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-gray-400">{t('origin')}</p>
                                    <p className="text-gray-200 text-lg">{character.origin.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">{t('lastLocation')}</p>
                                    <p className="text-gray-200 text-lg">{character.location.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
} 