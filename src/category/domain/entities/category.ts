import { v4 as uuidv4 } from "uuid";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

//Essa ideia de props, lembra bastante a props do React.
export class Category {
  public readonly id: string;

  constructor(public readonly props: CategoryProperties, id?: string) {
    this.id = id || uuidv4();
    this.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  get created_at() {
    return this.props.created_at;
  }
}
