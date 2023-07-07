import { SortDirection } from "@seedwork/domain/repository/repository-contracts";
import { InMemorySearchableRepository } from "../../../../@seedwork/domain/repository/in-memory-repository";
import { Category } from "../../../../category/domain/entities/category";
import CategoryRepository from "../../../domain/repository/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Category[],
    sort: string,
    sort_dir: SortDirection
  ): Promise<Category[]> {
    let result: Category[];
    if (!sort) {
      result = await super.applySort(items, "created_at", "desc");
    } else {
      result = await super.applySort(items, sort, sort_dir);
    }
    return result;
  }
}

export default CategoryInMemoryRepository;
