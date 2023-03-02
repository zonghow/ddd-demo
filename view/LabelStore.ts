import { Message } from '@arco-design/web-react';
import { flatten, toArray } from 'lodash';
import { makeAutoObservable } from 'mobx';
import {
  ListLabelTaskUseCase,
  ListLabelTaskUseCaseReqDto,
  ListLabelTaskUseCaseResDto,
} from '../modules/label/usecase/ListLabelTaskUseCase';
import { RerunLabelTaskUseCase } from '../modules/label/usecase/RerunLabelTaskUseCase';

type TaskItems = ListLabelTaskUseCaseResDto['items'];

export class LabelStore {
  page = 1;
  pageSize = 10;
  total = 0;
  taskList: TaskItems = [];
  loadingTaskList = false;
  dateRange: [string, string] = [undefined, undefined];

  listLabelTaskUseCase = new ListLabelTaskUseCase();
  rerunLabelTaskUseCase = new RerunLabelTaskUseCase();

  constructor() {
    makeAutoObservable(this);
  }

  listLabelTask = async () => {
    const dto: ListLabelTaskUseCaseReqDto = {
      labelId: 1,
      page: this.page,
      pageSize: this.pageSize,
      status: 'All',
      startDate: this.dateRange[0],
      endDate: this.dateRange[1],
    };
    try {
      this.loadingTaskList = true;
      const { total, items } = await this.listLabelTaskUseCase.execute(dto);
      this.total = total;
      this.taskList = items;
    } catch (e) {
      throw e;
    } finally {
      this.loadingTaskList = false;
    }
  };

  rerunLabelTask = async (taskItems: TaskItems | TaskItems[0]) => {
    Message.loading({ content: 'loading...', duration: 500 });
    await this.rerunLabelTaskUseCase.execute({
      labelId: 1,
      partitionDateList: flatten([taskItems]).map((it) => it.date),
    });
    Message.success('success');
    await this.listLabelTask();
  };

  handleDateRangeChange = async (v) => {
    this.dateRange = v;
    await this.listLabelTask();
  };
}
