import CategoryRepository from "../domain/repository/category.repository";
import UseCase from "../../@seedwork/application/use-case";

export default class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepository.findById(input.id);

    await this.categoryRepository.delete(input.id);
  }
}

export type Input = {
  id: string;
};

export type Output = void;
