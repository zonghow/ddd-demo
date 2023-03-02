import { EntityID } from '../../shared/core/Entity';
import { UseCase } from '../../shared/core/UseCase';
import { TimeValueObject } from '../../shared/TimeValueObject';
import { LabelTaskStatus } from '../domain/LabelTaskStatusValueObject';
import { LabelTaskRepository } from '../repository/LabelTaskRepository';

export interface ListLabelTaskUseCaseReqDto {
  labelId: number;
  page: number;
  pageSize: number;
  startDate?: string;
  endDate?: string;
  status: LabelTaskStatus | 'All';
}

export interface ListLabelTaskUseCaseResDto {
  page: number;
  pageSize: number;
  total: number;
  items: {
    date: string;
    startTime?: string;
    endTime?: string;
    upstreamReadyTime?: string;
    errMsg: string;
    instanceId: EntityID;
    status: LabelTaskStatus;
    statusText: string;
    isNotStartedYet: boolean;
    isWaitingDataReady: boolean;
    isRunning: boolean;
    isWaitingImport: boolean;
    isImporting: boolean;
    isSucceeded: boolean;
    isFailed: boolean;
    isAborted: boolean;
    stepCost: {
      total: number;
      totalFmt: string;
      waitingDataReady: number;
      waitingDataReadyFmt: string;
      running: number;
      runningFmt: string;
      waitingImport: number;
      waitingImportFmt: string;
      importing: number;
      importingFmt: string;
    };
  }[];
}

export class ListLabelTaskUseCase
  implements UseCase<ListLabelTaskUseCaseReqDto, ListLabelTaskUseCaseResDto>
{
  async execute(dto: ListLabelTaskUseCaseReqDto) {
    const labelTaskRepo = new LabelTaskRepository();
    const dtoStatus2RepoStatusMap: Record<
      ListLabelTaskUseCaseReqDto['status'],
      number | undefined
    > = {
      All: undefined,
      NotStartedYet: 0,
      WaitingDataReady: 1,
      Running: 2,
      WaitingImport: 3,
      Importing: 4,
      Succeeded: 5,
      Failed: 6,
      Aborted: 7,
    };
    const { page, pageSize, total, items } = await labelTaskRepo.pagingListTask(
      {
        status: dtoStatus2RepoStatusMap[dto.status],
        labelId: dto.labelId,
        startDate: dto.startDate,
        endDate: dto.endDate,
        page: dto.page,
        pageSize: dto.pageSize,
      }
    );
    return {
      page,
      pageSize,
      total,
      items: items.map((it) => ({
        date: it.date,
        startTime: it.startTime
          ? it.startTime.format(TimeValueObject.TEMPLATE_COMMON)
          : undefined,
        endTime: it.endTime ? it.endTime.format('MM-DD HH:mm') : undefined,
        upstreamReadyTime: it.upstreamReadyTime
          ? it.upstreamReadyTime.format()
          : undefined,
        errMsg: it.errMsg,
        instanceId: it.id,
        status: it.status.status,
        statusText: it.status.statusText,
        isNotStartedYet: it.status.isNotStartedYet(),
        isWaitingDataReady: it.status.isWaitingDataReady(),
        isRunning: it.status.isRunning(),
        isWaitingImport: it.status.isWaitingImport(),
        isImporting: it.status.isImporting(),
        isSucceeded: it.status.isSucceeded(),
        isFailed: it.status.isFailed(),
        isAborted: it.status.isAborted(),
        stepCost: {
          total: it.stepCost.total(),
          totalFmt: it.stepCost.totalFmt(),
          waitingDataReady: it.stepCost.waitingDataReady,
          waitingDataReadyFmt: it.stepCost.waitingDataReadyFmt(),
          running: it.stepCost.running,
          runningFmt: it.stepCost.runningFmt(),
          waitingImport: it.stepCost.waitingImport,
          waitingImportFmt: it.stepCost.waitingImportFmt(),
          importing: it.stepCost.importing,
          importingFmt: it.stepCost.importingFmt(),
        },
      })),
    };
  }
}
