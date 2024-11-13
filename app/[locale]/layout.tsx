import {NextIntlClientProvider} from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from "react";

async function getMessages(locale: string) {
    try {
        return (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }
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
            {children}
        </NextIntlClientProvider>
    );
} 