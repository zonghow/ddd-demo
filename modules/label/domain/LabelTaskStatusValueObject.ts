import { ValueObject } from '../../shared/core/ValueObject';

export type LabelTaskStatus =
  | 'NotStartedYet'
  | 'WaitingDataReady'
  | 'Running'
  | 'WaitingImport'
  | 'Importing'
  | 'Succeeded'
  | 'Failed'
  | 'Aborted';

const LabelTaskStatusTextMap: Record<LabelTaskStatus, string> = {
  NotStartedYet: '等待上游就绪',
  WaitingDataReady: '检查数据集',
  Running: '运行数据',
  WaitingImport: '等待导入',
  Importing: '导入中',
  Succeeded: '执行成功',
  Failed: '执行失败',
  Aborted: '手动终止',
};

export interface LabelTaskStatusValueObjectProps {
  status: LabelTaskStatus;
}

export class LabelTaskStatusValueObject extends ValueObject<LabelTaskStatusValueObjectProps> {
  get status() {
    return this.props.status;
  }

  get statusText() {
    return LabelTaskStatusTextMap[this.props.status];
  }

  private constructor(props: LabelTaskStatusValueObjectProps) {
    super(props);
  }

  static create(props: LabelTaskStatusValueObjectProps) {
    return new LabelTaskStatusValueObject(props);
  }

  isNotStartedYet() {
    return this.props.status === 'NotStartedYet';
  }

  isWaitingDataReady() {
    return this.props.status === 'WaitingDataReady';
  }

  isRunning() {
    return this.props.status === 'Running';
  }

  isWaitingImport() {
    return this.props.status === 'WaitingImport';
  }

  isImporting() {
    return this.props.status === 'Importing';
  }

  isSucceeded() {
    return this.props.status === 'Succeeded';
  }

  isFailed() {
    return this.props.status === 'Failed';
  }

  isAborted() {
    return this.props.status === 'Aborted';
  }
}
