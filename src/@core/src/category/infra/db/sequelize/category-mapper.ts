import { Category } from "#category/domain";
import {
  EntityValidationError,
  UniqueEntityId,
  LoadEntityError,
} from "#seedwork/domain";
import { CategoryModel } from "./category-model";

export class CategoryModelMapper {
  static toEntity(model: CategoryModel) {
    const { id, ...otherData } = model.toJSON();
    const _id = new UniqueEntityId(id);
    try {
      return new Category(otherData, _id);
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }
      throw e;
    }
  }
}
