import dayjs from 'dayjs';

import { MilestoneItem } from '../model/public-api';
import {
  DrillingRigInfoDto,
  OperationTypeLib,
  ScheduleDto,
  ScheduleWorkDto,
  ClusterType,
  ScheduleMilestone,
  ScheduleWork,
} from './types';
import { DrillingCluster } from './ui/drilling-cluster';
import { MovingCluster } from './ui/moving-between-clusters';

export function createMilestoneItems(
  schedule: ScheduleDto,
): Array<MilestoneItem<DrillingRigInfoDto, ScheduleMilestone>> {
  const { clusters, drillingRigs } = schedule;

  if (!drillingRigs) {
    return [];
  }

  return drillingRigs.map((drillingRig) => {
    const uniqClusters: Set<number> = new Set();

    drillingRig.scheduleWorks?.forEach(({ clusterId }) => {
      if (clusterId) uniqClusters.add(clusterId);
    });

    const milestonesWorks = Array.from(uniqClusters).map((clusterId) => {
      return drillingRig.scheduleWorks?.filter(
        (work) => work.clusterId === clusterId,
      );
    });

    const result = [
      ...milestonesWorks.map((milestoneWorks) =>
        milestoneWorks?.filter(
          ({ operationType }) =>
            operationType !== OperationTypeLib.MovingBetweenClusters,
        ),
      ),
      ...milestonesWorks.map((milestoneWorks) =>
        milestoneWorks?.filter(
          ({ operationType }) =>
            operationType === OperationTypeLib.MovingBetweenClusters,
        ),
      ),
    ].filter((works) => works && works.length > 0);

    const milestones = result
      .filter((workList) => workList?.length)
      .map((milestoneWorks) => {
        const firstWork = milestoneWorks?.at(0) as ScheduleWorkDto;

        const startDates = milestoneWorks?.map(({ startTime }) =>
          dayjs(startTime),
        );
        const endDates = milestoneWorks?.map(({ endTime }) => dayjs(endTime));

        // Если передвижка между кустами
        if (
          firstWork.operationType === OperationTypeLib.MovingBetweenClusters
        ) {
          const item: ScheduleMilestone = {
            clusterId: firstWork.clusterId!,
            caption: '',
            clusterType: ClusterType.move,
            distance: parseFloat(firstWork.distance!.toFixed(2)),
            startTime: dayjs
              ?.min([...startDates!])
              .startOf('day')
              .toDate(),
            endTime: dayjs
              ?.max([...endDates!])
              .endOf('day')
              .toDate(),
            items: null,
          };
          return item;
        }

        const currentCluster =
          clusters?.find(
            ({ clusterId }) => firstWork.clusterId === clusterId,
          ) ?? null;

        const works: Array<ScheduleWork> = (milestoneWorks as ScheduleWorkDto[])
          .map(({ clusterId, operationType, wellId, startTime, endTime }) => {
            const wellName =
              currentCluster?.wells?.find((well) => wellId === well.wellId)
                ?.wellName ?? String(wellId);

            const work: ScheduleWork = {
              clusterId: clusterId!,
              drillingRigId: drillingRig.drillingRigId!,
              wellId: wellName,
              operationType: operationType!,
              startTime: dayjs(startTime).startOf('day').toDate(),
              endTime: dayjs(endTime).endOf('day').toDate(),
            };

            return work;
          })
          .filter(
            ({ operationType }) =>
              operationType !== OperationTypeLib.MovingBetweenClusters,
          );

        let clusterCaption = String(firstWork.clusterId);
        if (currentCluster) {
          const { ngduName, fieldName, clusterName } = currentCluster;
          clusterCaption = `${clusterName} / ${ngduName} / ${fieldName}`;
        }

        const item: ScheduleMilestone = {
          caption: clusterCaption,
          clusterType: ClusterType.drilling,
          powerLine: currentCluster?.powerLine,
          drillingRigId: drillingRig.drillingRigId!,
          startTime: dayjs
            ?.min([...startDates!])
            .startOf('day')
            .toDate(),
          endTime: dayjs
            ?.max([...endDates!])
            .endOf('day')
            .toDate(),
          items: works,
          ...currentCluster,
        };

        return item;
      });

    const items: MilestoneItem<DrillingRigInfoDto, ScheduleMilestone> = {
      item: drillingRig,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      milestones: milestones
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
        .map((milestone) => ({
          ...milestone,
          component:
            milestone.clusterType === ClusterType.drilling
              ? DrillingCluster
              : MovingCluster,
        })),
    };

    return items;
  });
}
