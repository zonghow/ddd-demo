import { AggregateRoot } from '../../shared/core/AggregateRoot';
import { EntityID } from '../../shared/core/Entity';

interface LabelAggregateRootProps {}

export class LabelAggregateRoot extends AggregateRoot<LabelAggregateRootProps> {
  private constructor(id: EntityID, props: LabelAggregateRootProps) {
    super(id, props);
  }

  static create(id: EntityID, props: LabelAggregateRootProps) {
    return new LabelAggregateRoot(id, props);
  }
}
