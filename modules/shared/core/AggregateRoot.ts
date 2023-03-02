import { Entity } from './Entity';

export abstract class AggregateRoot<T> extends Entity<T> {
  addDomainEvent(evt: any): void {}
  clearEvents(): void {}
}
