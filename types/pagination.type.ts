type Pagination<T> = {
  page: number;
  limit: number;
  sort: string;
  keyword: string;

  total_items: number;
  total_pages: number;
  current_page: number;
  start_count: number;
  end_count: number;
  entities: T[];
};

export type ParamPagination = Omit<
  Pagination<any>,
  | "total_items"
  | "total_pages"
  | "current_page"
  | "start_count"
  | "end_count"
  | "entities"
>;

export type PaginationResponse<T> = Omit<
  Pagination<T>,
  "pages" | "limit" | "sort" | "keyword"
>;

export type ParamPaginationProduct = ParamPagination & {
  cate_id: string;
  sort_field: string;
};
