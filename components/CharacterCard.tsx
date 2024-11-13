'use client';

import { Character } from '@/lib/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

export default function CharacterCard({ character }: { character: Character }) {
    const t = useTranslations('Character');
    const router = useRouter();
    const statusColor = {
        Alive: 'bg-green-500',
        Dead: 'bg-red-500',
        unknown: 'bg-gray-500',
    }[character.status];

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <Card
                className="overflow-hidden bg-[#2a2a2a] border-gray-700 hover:border-green-500 transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/character/${character.id}`)}
            >
                <div className="relative h-64 overflow-hidden">
                    <Image
                        src={character.image}
                        alt={character.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-bold text-white mb-2 truncate">
                        {character.name}
                    </h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${statusColor}`} />
                            <span className="text-gray-300">
                                {t(`status.${character.status}`)} - {character.species}
                            </span>
                        </div>
                        <div>
                            <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                                {t(`gender.${character.gender}`)}
                            </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">
                            {t('lastLocation')}:
                            <br />
                            <span className="text-gray-300">{character.location.name}</span>
                        </p>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}