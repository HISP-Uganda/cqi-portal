export interface Store {
  d2: any;
  url: string;
  indicator: string;
  indicatorGroup: string;
  indicatorGroups: any[];
  period: [moment.Moment, moment.Moment];
  filterBy: string;
  ou: string[];
  periodType: string;
  level: string;
  organisationUnits: any[]
  indicators: any[];
  indicatorIndex?: number;
  indicatorGroupIndex?: number;
  currentProjectStartDate?: string;
  currentProjectEndDate?: string;
  currentProjectFrequency?: string;
}
