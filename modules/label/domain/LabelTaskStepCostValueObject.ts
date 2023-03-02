import { ValueObject } from '../../shared/ValueObject';

interface LabelTaskStepCostValueObjectProps {
  waitingDataReady?: number;
  running?: number;
  waitingImport?: number;
  importing?: number;
}

export class LabelTaskStepCostValueObject extends ValueObject<LabelTaskStepCostValueObjectProps> {
  get waitingDataReady() {
    return LabelTaskStepCostValueObject.getCost(this.props.waitingDataReady);
  }

  get running() {
    return LabelTaskStepCostValueObject.getCost(this.props.running);
  }

  get waitingImport() {
    return LabelTaskStepCostValueObject.getCost(this.props.waitingImport);
  }

  get importing() {
    return LabelTaskStepCostValueObject.getCost(this.props.importing);
  }

  private constructor(props: LabelTaskStepCostValueObjectProps) {
    super(props);
  }

  static create(props: LabelTaskStepCostValueObjectProps) {
    return new LabelTaskStepCostValueObject(props);
  }

  private static getCost(n: any) {
    if (typeof n === 'number') {
      return n;
    }
    return -1;
  }

  static sumCost(...ns: number[]) {
    let ret = 0;
    const narr = ns.filter((n) => typeof n === 'number' && n !== -1);
    narr.forEach((n) => {
      ret += n;
    });
    return ret;
  }

  static formatSeconds(seconds: number) {
    if (seconds < 60) {
      return seconds + 's';
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m${remainingSeconds}s`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      let timeString = `${hours}h`;
      if (remainingMinutes > 0) {
        timeString += `${remainingMinutes}m`;
      }
      if (remainingSeconds > 0) {
        timeString += `${remainingSeconds}s`;
      }
      return timeString;
    } else {
      const days = Math.floor(seconds / 86400);
      const remainingHours = Math.floor((seconds % 86400) / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      let timeString = `${days}d`;
      if (remainingHours > 0) {
        timeString += `${remainingHours}h`;
      }
      if (remainingMinutes > 0) {
        timeString += `${remainingMinutes}m`;
      }
      if (remainingSeconds > 0) {
        timeString += `${remainingSeconds}s`;
      }
      return timeString;
    }
  }

  total() {
    return LabelTaskStepCostValueObject.sumCost(
      this.props.waitingDataReady,
      this.props.running,
      this.props.waitingImport,
      this.props.importing
    );
  }

  totalFmt() {
    return LabelTaskStepCostValueObject.formatSeconds(this.total());
  }

  waitingDataReadyFmt() {
    return LabelTaskStepCostValueObject.formatSeconds(
      this.props.waitingDataReady
    );
  }

  runningFmt() {
    return LabelTaskStepCostValueObject.formatSeconds(this.props.running);
  }

  waitingImportFmt() {
    return LabelTaskStepCostValueObject.formatSeconds(this.props.waitingImport);
  }

  importingFmt() {
    return LabelTaskStepCostValueObject.formatSeconds(this.props.importing);
  }
}
