import { GamesFiltering } from "@/types/game"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "../ui/pagination"

type GamesPaginationProps = {
  pageNumber: number
  totalPages: number
  handlePagination: (value: string) => void
}

export default function GamesPagination({
  pageNumber,
  totalPages,
  handlePagination
}: GamesPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={pageNumber <= 1 ? "pointer-events-none opacity-50" : undefined}
            href="#"
            onClick={() => handlePagination(Math.max(pageNumber - 1, 1).toString())}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={pageNumber === index + 1}
              onClick={() => handlePagination((index + 1).toString())}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pageNumber < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePagination(Math.min(pageNumber + 1, totalPages).toString())}
            className={pageNumber === totalPages ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
