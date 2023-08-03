import { UniqueEntityId } from "#seedwork/domain";
import { Category, CategoryRepository } from "#category/domain";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";
import EntityNotFoundError from "#seedwork/domain/errors/entity-not-found";
import { Op } from "sequelize";

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }
  async findById(id: string | UniqueEntityId): Promise<Category> {
    const _id = `${id}`;
    const model = await this._get(_id);
    return CategoryModelMapper.toEntity(model);
  }
  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();
    return models.map((m) => CategoryModelMapper.toEntity(m));
  }
  async update(entity: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;
    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: { name: { [Op.like]: `%${props.filter}%` } },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [["created_at", "DESC"]] }),
      offset,
      limit,
    });
    return new CategoryRepository.SearchResult({
      items: models.map((m) => CategoryModelMapper.toEntity(m)),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }

  private async _get(id: string): Promise<CategoryModel> {
    return await this.categoryModel.findByPk(id, {
      rejectOnEmpty: new EntityNotFoundError(`Entity not found using ID ${id}`),
    });
  }
}
