export type EntityID = number | string;

export abstract class Entity<T> {
  id: EntityID;
  props: T;

  constructor(id: EntityID, props: T) {
    this.id = id;
    this.props = props;
  }

  equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return String(this.id) === String(object.id);
  }
}
