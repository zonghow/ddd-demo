import { AggregateRoot } from '../../shared/AggregateRoot';
import { EntityID } from '../../shared/Entity';

interface LabelAggregateRootProps {}

export class LabelAggregateRoot extends AggregateRoot<LabelAggregateRootProps> {
  private constructor(id: EntityID, props: LabelAggregateRootProps) {
    super(id, props);
  }

  static create(id: EntityID, props: LabelAggregateRootProps) {
    return new LabelAggregateRoot(id, props);
  }
}
