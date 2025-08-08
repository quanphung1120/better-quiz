"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useSearchParams } from "next/navigation";

interface DataPaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function DataPagination({
  totalPages,
  currentPage,
}: DataPaginationProps) {
  const searchParams = useSearchParams();

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Show pages 2, 3, 4, 5 and ellipsis
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show ellipsis and last 4 pages
        pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show ellipsis, current page with neighbors, ellipsis
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Create URL with page parameter
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page or no pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious href={createPageUrl(currentPage - 1)} />
          ) : (
            <PaginationPrevious
              href="#"
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageUrl(page as number)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext href={createPageUrl(currentPage + 1)} />
          ) : (
            <PaginationNext
              href="#"
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
