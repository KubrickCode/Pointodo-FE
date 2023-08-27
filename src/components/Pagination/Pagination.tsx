import { FC } from "react";

interface Props {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const Pagination: FC<Props> = ({ totalPage, currentPage, setCurrentPage }) => {
  const MAX_PAGES = 5;

  const startPage =
    currentPage <= MAX_PAGES ? 1 : currentPage - Math.floor(MAX_PAGES / 2);
  const endPage = Math.min(startPage + MAX_PAGES - 1, totalPage);

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  if (!totalPage) {
    return;
  }

  return (
    <div className="flex flex-row">
      <button
        className={`border py-3 px-4 border-neutral-300 rounded-l-lg dark:bg-neutral-300  ${
          currentPage === 1
            ? "cursor-not-allowed"
            : "hover:bg-blue-100 dark:hover:bg-neutral-400"
        }`}
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        className={`border py-3 px-4 border-neutral-300 dark:bg-neutral-300 ${
          currentPage === 1
            ? "cursor-not-allowed"
            : "hover:bg-blue-100 dark:hover:bg-neutral-400"
        }`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(startPage + index)}
          className={`border border-neutral-300 py-2 px-4 dark:bg-neutral-300 ${
            currentPage === startPage + index
              ? "border-blue-300 bg-blue-50 cursor-not-allowed dark:bg-neutral-500 dark:border-0 dark:text-neutral-200"
              : "hover:bg-blue-100 dark:hover:bg-neutral-400"
          }`}
        >
          {startPage + index}
        </button>
      ))}

      <button
        className={`border py-3 px-4 border-neutral-300 dark:bg-neutral-300 ${
          currentPage === totalPage
            ? "cursor-not-allowed"
            : "hover:bg-blue-100 dark:hover:bg-neutral-400"
        }`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        <svg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>

      <button
        className={`border py-3 px-4 border border-neutral-300 dark:bg-neutral-300 rounded-r-lg ${
          currentPage === totalPage
            ? "cursor-not-allowed"
            : "hover:bg-blue-100 dark:hover:bg-neutral-400"
        }`}
        onClick={() => handlePageClick(totalPage)}
        disabled={currentPage === totalPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
