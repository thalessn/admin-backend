import Entity from "../../entity/entity";
import { InMemorySearchableRepository } from "../in-memory-repository";
import { SearchParams, SearchResult } from "../repository-contracts";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ["name"];

  protected async applyFilter(
    items: StubEntity[],
    filter: string | null
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return (
        i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        i.props.price.toString() === filter
      );
    });
  }
}

describe("InMemorySearchableRepository Unit Test", () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => (repository = new StubInMemorySearchableRepository()));
  describe("applyFilter method", () => {
    it("should no filter when filter param is null", async () => {
      const items = [new StubEntity({ name: "name value", price: 5 })];
      const spyFilterMethod = jest.spyOn(items, "filter");
      const itemsFilteres = await repository["applyFilter"](items, null);
      expect(itemsFilteres).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it("should filter using a filter param", async () => {
      const items = [
        new StubEntity({ name: "teste", price: 5 }),
        new StubEntity({ name: "TESTE", price: 5 }),
        new StubEntity({ name: "fake", price: 0 }),
      ];

      const spyFilterMethod = jest.spyOn(items, "filter");
      let itemsFiltered = await repository["applyFilter"](items, "TESTE");

      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await repository["applyFilter"](items, "5");
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      itemsFiltered = await repository["applyFilter"](items, "no-filter");
      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe("applySort method", () => {
    it("should no sort items", async () => {
      const items = [
        new StubEntity({ name: "teste", price: 5 }),
        new StubEntity({ name: "TESTE", price: 5 }),
        new StubEntity({ name: "fake", price: 0 }),
      ];

      const spyFilterMethod = jest.spyOn(items, "filter");
      let itemsSorted = await repository["applySort"](items, null, null);
      expect(itemsSorted).toStrictEqual(items);

      itemsSorted = await repository["applySort"](items, "price", "asc");
      expect(itemsSorted).toStrictEqual(items);
    });

    it("should sort items", async () => {
      const items = [
        new StubEntity({ name: "b", price: 5 }),
        new StubEntity({ name: "a", price: 5 }),
        new StubEntity({ name: "c", price: 5 }),
      ];

      const spyFilterMethod = jest.spyOn(items, "filter");
      let itemsSorted = await repository["applySort"](items, "name", "asc");
      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

      itemsSorted = await repository["applySort"](items, "name", "desc");
      expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);
    });
  });

  describe("applyPaginate method", () => {
    it("should paginate items", async () => {
      const items = [
        new StubEntity({ name: "a", price: 5 }),
        new StubEntity({ name: "b", price: 5 }),
        new StubEntity({ name: "c", price: 5 }),
        new StubEntity({ name: "d", price: 5 }),
        new StubEntity({ name: "e", price: 5 }),
      ];
      let itemsPaginated = await repository["applyPaginate"](items, 1, 2);
      expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

      itemsPaginated = await repository["applyPaginate"](items, 2, 2);
      expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

      itemsPaginated = await repository["applyPaginate"](items, 4, 2);
      expect(itemsPaginated).toStrictEqual([]);
    });
  });

  describe("search method", () => {
    it("should apply only paginate when other params ar null", async () => {
      const entity = new StubEntity({ name: "a", price: 5 });
      const items = Array(16).fill(entity);
      repository.items = items;

      const result = await repository.search(new SearchParams());
      expect(result).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          sort: null,
          sort_dir: null,
          filter: null,
        })
      );
    });
  });

  it("should apply paginate and filter", async () => {
    const items = [
      new StubEntity({ name: "teste", price: 5 }),
      new StubEntity({ name: "TESTE", price: 5 }),
      new StubEntity({ name: "teSte", price: 5 }),
      new StubEntity({ name: "a", price: 5 }),
    ];
    repository.items = items;

    let result = await repository.search(
      new SearchParams({
        page: 1,
        per_page: 2,
        filter: "TESTE",
      })
    );

    expect(result).toStrictEqual(
      new SearchResult({
        items: [items[0], items[1]],
        total: 3,
        current_page: 1,
        filter: "TESTE",
        per_page: 2,
        sort: null,
        sort_dir: null,
      })
    );

    result = await repository.search(
      new SearchParams({
        page: 2,
        per_page: 2,
        filter: "TESTE",
      })
    );

    expect(result).toStrictEqual(
      new SearchResult({
        items: [items[2]],
        total: 3,
        current_page: 2,
        filter: "TESTE",
        per_page: 2,
        sort: null,
        sort_dir: null,
      })
    );
  });

  describe("should apply paginate and sort", () => {
    const items = [
      new StubEntity({ name: "b", price: 5 }),
      new StubEntity({ name: "a", price: 5 }),
      new StubEntity({ name: "d", price: 5 }),
      new StubEntity({ name: "e", price: 5 }),
      new StubEntity({ name: "c", price: 5 }),
    ];

    const arrange = [
      {
        search_params: new SearchParams({ page: 1, per_page: 2, sort: "name" }),
        search_result: new SearchResult({
          items: [items[1], items[0]],
          total: 5,
          current_page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: null,
        }),
      },
      {
        search_params: new SearchParams({ page: 2, per_page: 2, sort: "name" }),
        search_result: new SearchResult({
          items: [items[4], items[2]],
          total: 5,
          current_page: 2,
          per_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: null,
        }),
      },
      {
        search_params: new SearchParams({
          page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: "desc",
        }),
        search_result: new SearchResult({
          items: [items[3], items[2]],
          total: 5,
          current_page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: "desc",
          filter: null,
        }),
      },
      {
        search_params: new SearchParams({
          page: 2,
          per_page: 2,
          sort: "name",
          sort_dir: "desc",
        }),
        search_result: new SearchResult({
          items: [items[4], items[0]],
          total: 5,
          current_page: 2,
          per_page: 2,
          sort: "name",
          sort_dir: "desc",
          filter: null,
        }),
      },
    ];

    beforeEach(() => {
      repository.items = items;
    });

    test.each(arrange)(
      "when value is %j",
      async ({ search_params, search_result }) => {
        let result = await repository.search(search_params);
        expect(result).toStrictEqual(search_result);
      }
    );
  });

  it("should search using filter, sort and paginate", async () => {
    const items = [
      new StubEntity({ name: "test", price: 5 }),
      new StubEntity({ name: "a", price: 5 }),
      new StubEntity({ name: "TEST", price: 5 }),
      new StubEntity({ name: "e", price: 5 }),
      new StubEntity({ name: "teSt", price: 5 }),
    ];
    repository.items = items;

    const arrange = [
      {
        params: new SearchParams({
          page: 1,
          per_page: 2,
          sort: "name",
          filter: "TEST",
        }),
        result: new SearchResult({
          items: [items[2], items[4]],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: "TEST",
        }),
      },
      {
        params: new SearchParams({
          page: 2,
          per_page: 2,
          sort: "name",
          filter: "TEST",
        }),
        result: new SearchResult({
          items: [items[0]],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: "TEST",
        }),
      },
    ];

    for (const i of arrange) {
      let result = await repository.search(i.params);
      expect(result).toStrictEqual(i.result);
    }
  });
});
