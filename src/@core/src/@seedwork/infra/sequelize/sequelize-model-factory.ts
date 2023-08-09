import { Model } from "sequelize-typescript";

export class SequelizeModelFactory<ModelClass extends Model, ModelProps = any> {
  private _count = 1;

  constructor(private model, private defaultfactoryProps: () => ModelProps) {}

  count(count: number) {
    this._count = count;
    return this;
  }

  async create(data?: ModelProps): Promise<ModelClass> {
    return this.model.create(data ? data : this.defaultfactoryProps());
  }

  make(data?: ModelProps): ModelClass {
    return this.model.build(data ? data : this.defaultfactoryProps());
  }

  async bulkCreate(
    factoryProps?: (index: number) => ModelProps
  ): Promise<ModelClass[]> {
    const data = new Array(this._count)
      .fill(factoryProps ? factoryProps : this.defaultfactoryProps)
      .map((factory, index) => factory(index));
    return this.model.bulkCreate(data);
  }

  bulkMake(factoryProps?: (index: number) => ModelProps): ModelClass[] {
    const data = new Array(this._count)
      .fill(factoryProps ? factoryProps : this.defaultfactoryProps)
      .map((factory, index) => factory(index));
    return this.model.bulkBuild(data);
  }
}
