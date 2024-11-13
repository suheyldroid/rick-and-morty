'use client';

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from 'next-intl';
export const dynamic = "force-dynamic"
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const t = useTranslations('error'); // Hata mesajları için çevirileri al

    return (
        <div className="min-h-[400px] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
                {t('title')} {/* Hata başlığı */}
            </h2>
            <p className="text-gray-400 mb-4">
                {error.message || t('message')} {/* Hata mesajı */}
            </p>
            <Button
                onClick={reset}
                variant="outline"
                className="border-gray-700 hover:bg-gray-700"
            >
                <RefreshCcw className="mr-2 h-4 w-4"/>
                {t('retry')} {/* Tekrar dene buton metni */}
            </Button>
        </div>
    );
} 