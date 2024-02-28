"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
  currentPage: number;
}

export const Pagination = ({ totalPages, currentPage }: Props) => {
  if (totalPages === 1) return null;

  const pages = Array.from({ length: totalPages }, (x, i) => i + 1);


  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {pages.map((page, index) => (
            <li key={index} className="page-item">
              <Link
                className={`page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                  currentPage === page ? "bg-gray-200" : ""
                }`}
                href="#"
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
