export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  object: T[];
  pageNumber: number;
  pageSize: number;
  totalSize: number;
  errors: string[] | null;
}

export const formatPaginatedResponse = <T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
  message = "Success"
): PaginatedResponse<T> => {
  return {
    success: true,
    message,
    object: items,
    pageNumber: page,
    pageSize: limit,
    totalSize: total,
    errors: null,
  };
};
