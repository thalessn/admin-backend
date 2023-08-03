export class SequelizeModelFactory {
  constructor(private model, private factoryProps: () => any) {}

  async create(data?) {
    this.model.create(data ? data : this.factoryProps());
  }

  make() {}

  async bulkCreate() {}

  bulkMake() {}
}
