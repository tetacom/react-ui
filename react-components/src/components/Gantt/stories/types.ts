/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { BaseMilestone } from '@tetacom/react-components';

export interface ClusterInfoDto {
  /** @format int32 */
  clusterId?: number;
  clusterName?: string | null;
  fieldName?: string | null;
  ngduName?: string | null;
  /** @format double */
  totalProduction?: number;
  /** @format double */
  productionPerDay?: number;
  /** @format double */
  productionByDrillingPerDay?: number;
  /** @format double */
  workPrice?: number;
  powerLine?: PowerLineInfoDto;
  wells?: WellInfoDto[] | null;
  restrictionStatuses?: ClusterRestrictionStatus[] | null;
}

/** @format int32 */
export enum ClusterRestrictionStatus {
  InvestmentDirectionWarning = 1,
  LiftingCapabilityWarning = 2,
  SliderWarning = 4,
  HydrocarbonBaseWarning = 8,
  NeedPitlessDrillingWarning = 16,
  StartDrillingDateWarning = 32,
  UnavailableDateWarning = 64,
  UnavailableDateOffRoadLengthWarning = 128,
  SwampyWarning = 256,
  MainWellWarning = 512,
  MinimumWellCountWarning = 1024,
  PowerLineWarning = 2048,
}

export interface DrillingRigInfoDto {
  /** @format int32 */
  drillingRigId?: number;
  drillingRigNumber?: string | null;
  drillingRigDriveType?: DriveType;
  /** @format double */
  liftingCapability?: number;
  hasTopDrive?: boolean;
  hasSlider?: boolean;
  contractorName?: string | null;
  scheduleWorks?: ScheduleWorkDto[] | null;
}

/** @format int32 */
export enum DriveType {
  Electric = 0,
  Diesel = 1,
  ElectricDiesel = 2,
}

/** @format int32 */
export enum OperationTypeLib {
  Drilling = 0,
  MovingBetweenClusters = 1,
  MovingBetweenWells = 2,
}

export interface PowerLineInfoDto {
  /** @format int32 */
  id?: number;
  /** @format double */
  powerLineDistance?: number | null;
}

export interface ScheduleDto {
  clusters?: ClusterInfoDto[] | null;
  drillingRigs?: DrillingRigInfoDto[] | null;
}

export interface ScheduleWorkDto {
  /** @format date */
  startTime?: string;
  /** @format date */
  endTime?: string;
  /** @format int32 */
  clusterId?: number;
  /** @format int32 */
  wellId?: number;
  operationType?: OperationTypeLib;
  /** @format double */
  distance?: number;
}

/** @format int32 */

export interface WellInfoDto {
  /** @format int32 */
  wellId?: number;
  wellName?: string | null;
}

export enum ClusterType {
  move,
  drilling,
}

export type ScheduleWork = {
  clusterId: number;
  drillingRigId: number;
  wellId: string;
  operationType: OperationTypeLib;
} & BaseMilestone;

export type ScheduleMilestone = {
  caption: string;
  clusterType: ClusterType;
  drillingRigId?: number;
  distance?: number;
  items: ScheduleWork[] | null;
} & BaseMilestone &
  ClusterInfoDto;
