import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {clsx} from "clsx";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Rick and Morty Karakterleri',
    description: 'Rick and Morty karakterlerinin koleksiyonu',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
        <body className={clsx(inter.className,"min-h-screen bg-[#1a1a1a]")}>{children}</body>
        </html>
    );
}
