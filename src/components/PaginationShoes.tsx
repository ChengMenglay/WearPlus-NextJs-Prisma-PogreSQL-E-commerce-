import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface PaginationShoesProps {
  currentPage: number;
  totalPages: number;
  baseURL: string;
}
export default function PaginationShoes({
  currentPage,
  totalPages,
  baseURL,
}: PaginationShoesProps) {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {isFirstPage ? (
        <Button variant="outline" disabled>
          <ChevronLeft className="h-4 w-4 mr-1" />
        </Button>
      ) : (
        <Link href={`${baseURL}?page=${currentPage - 1}`}>
          <Button asChild variant="outline">
            <span>
              <ChevronLeft className="h-4 w-4 mr-1" />
            </span>
          </Button>
        </Link>
      )}

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages || 1}
      </span>

      {isLastPage ? (
        <Button variant="outline" disabled>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      ) : (
        <Link href={`${baseURL}?page=${currentPage + 1}`}>
          <Button asChild variant="outline">
            <span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </span>
          </Button>
        </Link>
      )}
    </div>
  );
}
