'use client';

import { usePathname } from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {ResponsePagination} from "@/lib/types";

export default function CharacterPagination({pagination, searchParams}: Props) {
    const pathname = usePathname();
    const page = Number(searchParams.page) || 1;
    const totalPages = pagination.pages;

    function getPageNumbers() {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            return Array.from({length: totalPages}, (_, i) => i + 1);
        }

        // Always show first page
        pages.push(1);

        // Calculate start and end of the middle range
        let startPage = Math.max(page - 1, 2);
        let endPage = Math.min(page + 1, totalPages - 1);

        // Adjust if we're near the start or end
        if (page <= 3) {
            endPage = 4;
        } else if (page >= totalPages - 2) {
            startPage = totalPages - 3;
        }

        // Add ellipsis if needed
        if (startPage > 2) {
            pages.push('ellipsis');
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis if needed
        if (endPage < totalPages - 1) {
            pages.push('ellipsis');
        }

        // Always show last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    function updatePage(newPage: number) {
        const params = new URLSearchParams(searchParams as Record<string, string>);
        params.set('page', newPage.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <>{
            !pagination.count ? (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-xl">
                        Seçilen filtrelerle eşleşen karakter bulunamadı.
                    </p>
                </div>
            ) : (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={updatePage(page - 1)}
                                aria-disabled={page === 1}
                                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>

                        {getPageNumbers().map((pageNum, index) => (
                            <PaginationItem key={index}>
                                {pageNum === 'ellipsis' ? (
                                    <PaginationEllipsis/>
                                ) : (
                                    <PaginationLink
                                        href={updatePage(pageNum as number)}
                                        isActive={page === pageNum}
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href={updatePage(page + 1)}
                                aria-disabled={page === totalPages}
                                className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )
        }
        </>
    )
}

interface Props {
    pagination: ResponsePagination
    searchParams: { [key: string]: string | string[] | undefined };
}
