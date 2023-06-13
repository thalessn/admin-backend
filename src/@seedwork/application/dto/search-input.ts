import { SortDirection } from "../../domain/repository/repository-contracts";

export type SearchInputDto<Filter = string> = {
  page?: number | null;
  per_page?: number | null;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
};
