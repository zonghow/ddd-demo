import * as React from 'react';
import { observer } from 'mobx-react';
import { LabelStore } from './LabelStore';
import { useMount } from 'ahooks';
import {
  Button,
  DatePicker,
  Popover,
  Steps,
  Table,
} from '@arco-design/web-react';

const { Step } = Steps;

const labelStore = new LabelStore();

export const Label: React.FC = observer(() => {
  useMount(async () => {
    await labelStore.listLabelTask();
  });
  return (
    <div>
      <DatePicker.RangePicker onChange={labelStore.handleDateRangeChange} />
      <Table
        loading={labelStore.loadingTaskList}
        size="mini"
        data={labelStore.taskList}
        rowKey={'id'}
        columns={[
          {
            title: '业务日期',
            dataIndex: 'date',
          },
          {
            title: '运行状态',
            dataIndex: 'statusText',
          },
          {
            title: '上游就绪时间',
            dataIndex: 'upstreamReadyTime',
          },
          {
            title: '开始运行时间',
            dataIndex: 'startTime',
          },
          {
            title: '结束运行时间',
            dataIndex: 'endTime',
          },
          {
            title: '耗时',
            dataIndex: 'stepCost.totalFmt',
            render: (col, item) => {
              if (!item.stepCost.total) return '--';
              const stepStatus = item.isFailed ? 'error' : undefined;
              const getCurrentSteps = () => {
                if (item.isWaitingDataReady) return 1;
                if (item.isRunning) return 2;
                if (item.isWaitingImport) return 3;
                if (item.isImporting) return 4;
                return 6;
              };
              return (
                <Popover
                  content={
                    <Steps
                      type="dot"
                      size="small"
                      current={getCurrentSteps()}
                      direction="vertical"
                    >
                      <Step title={'开始'} status={stepStatus} />
                      <Step
                        title={'待数据集就绪'}
                        description={item.stepCost.waitingDataReadyFmt}
                        status={stepStatus}
                      />
                      <Step
                        title={'运行数据'}
                        description={item.stepCost.runningFmt}
                        status={stepStatus}
                      />
                      <Step
                        title={'等待导入'}
                        description={item.stepCost.waitingImportFmt}
                        status={stepStatus}
                      />
                      <Step
                        title={'导入'}
                        description={item.stepCost.importingFmt}
                        status={stepStatus}
                      />
                      <Step
                        title={item.isFailed ? '失败' : '成功'}
                        status={stepStatus}
                      />
                    </Steps>
                  }
                >
                  <div>{item.stepCost.totalFmt}</div>
                </Popover>
              );
            },
          },
          {
            title: '操作',
            dataIndex: 'id',
            render: (col, item) => {
              return (
                <Button onClick={() => labelStore.rerunLabelTask(item)}>
                  重新运行
                </Button>
              );
            },
          },
        ]}
      />
    </div>
  );
});
