interface UnavailablePeriod {
  /** @format date */
  floodStart?: string;
  /** @format date */
  floodEnd?: string;
}

export interface ClusterDto {
  /** @format int32 */
  entityId?: number;
  /** @format int32 */
  id?: number;
  /** @format int32 */
  year?: number;
  name?: string | null;
  /** @format int32 */
  fieldId?: number;
  /** @format int32 */
  ngduId?: number;
  /** @format date */
  investmentDate?: string | null;
  /** @format double */
  coordinateX?: number | null;
  /** @format double */
  coordinateY?: number | null;
  /** @format int32 */
  landAllocationDuration?: number;
  /** @format double */
  idd?: number | null;
  /** @format double */
  netPresentValue?: number | null;
  /** @format double */
  payBackTime?: number | null;
  /** @format int32 */
  sitePreparationDuration?: number;
  floodPeriodSpring?: UnavailablePeriod;
  floodPeriodAutumn?: UnavailablePeriod;
  /** @format double */
  iddCoeff?: number | null;
  /** @format double */
  netPresentValueCoeff?: number | null;
  /** @format double */
  payBackTimeCoeff?: number | null;
  /** @format double */
  economicEfficiencyCoeff?: number | null;
  existInExternal?: boolean;
}
