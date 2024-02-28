export const generatePaginationNumbers = (currentPage: number, totaPages: number) => {
  if (totaPages <= 7) {
    return Array.from({ length: totaPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totaPages - 1, totaPages];
  }

  if (currentPage >= totaPages - 2) {
    return [1, 2, "...", totaPages - 2, totaPages - 1, totaPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totaPages,
  ];
};
