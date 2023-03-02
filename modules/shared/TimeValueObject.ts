import dayjs from 'dayjs';
import { ValueObject } from './core/ValueObject';

interface TimeValueObjectProps {
  time: dayjs.ConfigType;
}

export class TimeValueObject extends ValueObject<TimeValueObjectProps> {
  static TEMPLATE_COMMON = 'YYYY-MM-DD HH:mm:ss';

  get time() {
    return dayjs(this.props.time);
  }

  private constructor(props: TimeValueObjectProps) {
    super(props);
  }

  static create(props: TimeValueObjectProps) {
    return new TimeValueObject(props);
  }

  format(template: string = TimeValueObject.TEMPLATE_COMMON) {
    return this.time.format(template);
  }
}
