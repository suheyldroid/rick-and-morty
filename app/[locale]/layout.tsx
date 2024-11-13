import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from "react";
import LanguageSelector from '@/components/LanguageSelector';
import { Metadata } from 'next';

async function getMessages(locale: string) {
    try {
        return (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }
}


export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    if (params.locale === "tr") {
        return ({
            title: 'Rick ve Morty Karakterleri',
            description: 'Rick ve Morty karakterlerinin koleksiyonu',
        })
    }

    return {
        title: 'Rick and Morty Characters',
        description: 'Collection of Rick and Morty characters',
    };
}



export default async function LocaleLayout({
    children,
    params
}: {
    children: ReactNode;
    params: { locale: string };
}) {
    const isValidLocale = ['en', 'tr'].includes(params.locale);
    if (!isValidLocale) notFound();

    const messages = await getMessages(params.locale);

    return (
        <NextIntlClientProvider locale={params.locale} messages={messages}>
            <header className="flex justify-end items-center p-4 bg-[#1a1a1a]">
                <LanguageSelector />
            </header>
            <main>{children}</main>
        </NextIntlClientProvider>
    );
} 