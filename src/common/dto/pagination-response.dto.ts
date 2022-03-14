export class PaginatedResponseDto<TData> {
  data: TData[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}
