export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

//Essa ideia de props, lembra bastante a props do React.
export class Category {
  constructor(public readonly props: CategoryProperties) {}

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.name;
  }

  get is_active() {
    return this.props.is_active;
  }

  get created_at() {
    return this.props.created_at;
  }
}
