import CategoryRepository from "../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./dto/category-output";
import UseCase from "../../@seedwork/application/use-case";
import { SearchInputDto } from "../../@seedwork/application/dto/search-input";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../../@seedwork/application/dto/pagination-output";

export default class ListCategoriesUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    let searchResult = await this.categoryRepository.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): Output {
    const items = searchResult.items.map((i) =>
      CategoryOutputMapper.toOutput(i)
    );
    const pagination = PaginationOutputMapper.toPaginationOutput(searchResult);
    return {
      items,
      ...pagination,
    };
  }
}

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<CategoryOutput>;
