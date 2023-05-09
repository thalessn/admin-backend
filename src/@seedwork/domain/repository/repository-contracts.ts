import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string): Promise<void>;
}

export type SortDirection = "asc" | "desc";

export type SearchProps<Filter = string> = {
  page?: number | null;
  per_page?: number | null;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
};

class SearchParams {
  protected _page: number;
  protected _per_page: number = 15;
  protected _sort: string | null;
  protected _sort_dir: string | null;
  protected _filter: string | null;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;

    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }
    this._page = _page;
  }

  get per_page() {
    return this._per_page;
  }

  private set per_page(value: number) {
    let _per_page = +value;

    if (
      Number.isNaN(_per_page) ||
      _per_page <= 0 ||
      parseInt(_per_page as any) !== _per_page
    ) {
      _per_page = this._per_page;
    }
    this._per_page = _per_page;
  }

  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === "" ? null : `${value}`;
  }

  get sort_dir() {
    return this._sort_dir;
  }

  private set sort_dir(value: string | null) {
    if (!this.sort) {
      this.sort_dir = null;
    }
    const dir = `${value}`.toLocaleUpperCase();
    this._sort_dir = dir !== "asc" && dir !== "desc" ? "asc" : dir;
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter =
      value === null || value === undefined || value === "" ? null : `${value}`;
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchOutput,
  SearchInput = SearchParams
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
