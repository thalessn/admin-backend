import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
  GetCategoryUseCase,
  DeleteCategoryUseCase,
  UpdateCategoryUseCase,
} from '@tsn/micro-videos/category/application';

@Injectable()
export class CategoriesService {
  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  private listUseCase: ListCategoriesUseCase.UseCase;

  @Inject(GetCategoryUseCase.UseCase)
  private getUseCase: GetCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  private deleteUseCase: DeleteCategoryUseCase.UseCase;

  @Inject(UpdateCategoryUseCase.UseCase)
  private updateUseCase: UpdateCategoryUseCase.UseCase;

  create(createCategoryDto: CreateCategoryUseCase.Input) {
    return this.createUseCase.execute(createCategoryDto);
  }

  search(input: ListCategoriesUseCase.Input) {
    return this.listUseCase.execute(input);
  }

  findOne(input: GetCategoryUseCase.Input) {
    return this.getUseCase.execute(input);
  }

  update(input: UpdateCategoryUseCase.Input) {
    return this.updateUseCase.execute(input);
  }

  remove(input: DeleteCategoryUseCase.Input) {
    return this.deleteUseCase.execute(input);
  }
}
