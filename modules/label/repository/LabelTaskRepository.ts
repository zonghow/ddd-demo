import { mock } from '../../../http';
import { GetTaskInfoRes } from '../../../http/mock/GetTaskInfoRes';
import { EntityID } from '../../shared/Entity';
import { LabelTaskEntity } from '../domain/LabelTaskEntity';
import {
  LabelTaskStatusValueObject,
  LabelTaskStatusValueObjectProps,
} from '../domain/LabelTaskStatusValueObject';
import { LabelTaskStepCostValueObject } from '../domain/LabelTaskStepCostValueObject';
import { TimeValueObject } from '../domain/TimeValueObject';

export class LabelTaskRepository {
  async pagingListTask(options: any): Promise<{
    page: number;
    pageSize: number;
    total: number;
    items: LabelTaskEntity[];
  }> {
    const res = await mock(GetTaskInfoRes);
    return {
      page: res.page,
      pageSize: res.pageSize,
      total: res.total,
      items: res.items.map((it) =>
        LabelTaskEntity.create(it.instanceId, {
          date: it.date,
          startTime: it.startTime
            ? TimeValueObject.create({
                time: it.startTime,
              })
            : undefined,
          endTime: it.endTime
            ? TimeValueObject.create({
                time: it.endTime,
              })
            : undefined,
          upstreamReadyTime: it.upstreamReadyTime
            ? TimeValueObject.create({
                time: it.upstreamReadyTime,
              })
            : undefined,
          status: LabelTaskStatusValueObject.create({
            status: it.status as LabelTaskStatusValueObjectProps['status'],
          }),
          stepCost: LabelTaskStepCostValueObject.create({
            waitingDataReady: it.stepCost.WaitingDataReady,
            running: it.stepCost.Running,
            waitingImport: it.stepCost.WaitingImport,
            importing: it.stepCost.Importing,
          }),
          errMsg: it.errMsg,
        })
      ),
    };
  }

  async manualRunLabelTask(labelId: EntityID, dateList: string[]) {
    const res = await mock(true);
    return res;
  }
}
