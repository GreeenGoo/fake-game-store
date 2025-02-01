import "./styles/GamesPagination.css"

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
    <div className="pagination">
      <div className="pagination-content">
        <div className="pagination-item">
          <a
            href="#"
            className={`pagination-previous ${pageNumber <= 1 ? "disabled" : ""}`}
            onClick={() => handlePagination(Math.max(pageNumber - 1, 1).toString())}
          >
            &laquo; Prev
          </a>
        </div>

        {Array.from({ length: totalPages }, (_, index) => (
          <div className="pagination-item" key={index}>
            <a
              href="#"
              className={`pagination-link ${pageNumber === index + 1 ? "active" : ""}`}
              onClick={() => handlePagination((index + 1).toString())}
            >
              {index + 1}
            </a>
          </div>
        ))}

        {pageNumber < totalPages && (
          <div className="pagination-item">
            <span className="pagination-ellipsis">...</span>
          </div>
        )}

        <div className="pagination-item">
          <a
            href="#"
            className={`pagination-next ${pageNumber === totalPages ? "disabled" : ""}`}
            onClick={() => handlePagination(Math.min(pageNumber + 1, totalPages).toString())}
          >
            Next &raquo;
          </a>
        </div>
      </div>
    </div>
  )
}
