import Link from 'next/link';
import {Button} from "@/components/ui/button";
import {Home} from "lucide-react";
import { useTranslations } from 'next-intl';
export const dynamic = "force-dynamic"
export default function NotFound() {
    const t = useTranslations('notFound');

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
            <h2 className="text-4xl font-bold text-white mb-4">{t('title')}</h2>
            <p className="text-gray-400 text-center mb-8">
                {t('message')}
            </p>
            <Button asChild>
                <Link href="/">
                    <Home className="mr-2 h-4 w-4"/>
                    {t('backToHome')}
                </Link>
            </Button>
        </div>
    );
} 