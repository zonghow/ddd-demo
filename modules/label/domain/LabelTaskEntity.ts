import { Entity, EntityId } from '../../shared/Entity';
import { LabelTaskStatusValueObject } from './LabelTaskStatusValueObject';
import { LabelTaskStepCostValueObject } from './LabelTaskStepCostValueObject';
import { TimeValueObject } from './TimeValueObject';

export interface LabelTaskEntityProps {
  date: string; // 业务日期
  status: LabelTaskStatusValueObject; // 任务状态
  startTime?: TimeValueObject; // 开始时间
  endTime?: TimeValueObject; // 结束时间
  upstreamReadyTime?: TimeValueObject; // 上游就绪时间
  stepCost: LabelTaskStepCostValueObject; // 任务每步的耗时
  errMsg: string; // 错误日志
}

export class LabelTaskEntity extends Entity<LabelTaskEntityProps> {
  get date() {
    return this.props.date;
  }

  get status() {
    return this.props.status;
  }

  get startTime() {
    return this.props.startTime;
  }

  get endTime() {
    return this.props.endTime;
  }

  get upstreamReadyTime() {
    return this.props.upstreamReadyTime;
  }

  get stepCost() {
    return this.props.stepCost;
  }

  get errMsg() {
    return this.props.errMsg;
  }

  private constructor(id: EntityId, props: LabelTaskEntityProps) {
    super(id, props);
  }

  static create(id: EntityId, props: LabelTaskEntityProps): LabelTaskEntity {
    return new LabelTaskEntity(id, props);
  }
}
