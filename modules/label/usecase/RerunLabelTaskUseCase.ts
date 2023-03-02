import { EntityID } from '../../shared/core/Entity';
import { UseCase } from '../../shared/core/UseCase';
import { LabelTaskRepository } from '../repository/LabelTaskRepository';

export interface RerunLabelTaskUseCaseReqDTO {
  labelId: EntityID;
  partitionDateList: string[];
}

export interface RerunLabelTaskUseCaseResDTO {}

export class RerunLabelTaskUseCase
  implements UseCase<RerunLabelTaskUseCaseReqDTO, RerunLabelTaskUseCaseResDTO>
{
  async execute(dto: RerunLabelTaskUseCaseReqDTO) {
    if (dto.partitionDateList.length === 0) {
      throw Error('Plz select the record you want to run');
    }
    const labelTaskRepo = new LabelTaskRepository();
    await labelTaskRepo.manualRunLabelTask(dto.labelId, dto.partitionDateList);
  }
}
