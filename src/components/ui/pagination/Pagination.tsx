"use client";

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  if (totalPages === 1) return null;
  const currentPage = parseInt(searchParams.get("page") || "1") || 1;

  if (currentPage < 1) redirect(pathname);

  const currentPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === "...") {
      if (currentPage <= 3) {
        params.set("page", "4");
        return `${pathname}?${params.toString()}`;
      }
      if (currentPage >= totalPages - 2) {
        params.set("page", `${totalPages - 3}`);
        return `${pathname}?${params.toString()}`;
      }
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = generatePaginationNumbers(currentPage, totalPages);

  return (
    <div className="flex text-center items-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none items-center gap-1">
          <li className="page-item disabled">
            <Link
              className={clsx(
                "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                { "text-gray-500 pointer-events-none": currentPage === 1 }
              )}
              href={currentPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {pages.map((page, index) => (
            <li key={index} className="page-item">
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300",
                  {
                    "bg-blue-600 text-white hover:text-white hover:bg-blue-700 shadow-md focus:shadow-md":
                      currentPage === page,
                    "text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none bg-transparent":
                      currentPage !== page,
                  }
                )}
                href={currentPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className={clsx(
                "page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                {
                  "text-gray-500 pointer-events-none":
                    currentPage === totalPages,
                }
              )}
              href={currentPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
