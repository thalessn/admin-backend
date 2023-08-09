export class SequelizeModelFactory {
  private _count = 1;

  constructor(private model, private defaultfactoryProps: () => any) {}

  count(count: number) {
    this._count = count;
    return this;
  }

  async create(data?) {
    return this.model.create(data ? data : this.defaultfactoryProps());
  }

  make(data?) {
    return this.model.build(data ? data : this.defaultfactoryProps());
  }

  async bulkCreate(factoryProps?: (index: number) => any) {
    const data = new Array(this._count)
      .fill(factoryProps ? factoryProps : this.defaultfactoryProps)
      .map((factory, index) => factory(index));
    return this.model.bulkCreate(data);
  }

  bulkMake() {}
}
