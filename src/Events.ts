import moment from 'moment';

import { appDomain } from './Domains';
export const changeLoading = appDomain.createEvent<boolean>();
export const setD2 = appDomain.createEvent<any>();
export const changeOu = appDomain.createEvent<string[]>("change ou");

export const changePeriod = appDomain.createEvent<[moment.Moment, moment.Moment]>("change period");
export const changeIndicator = appDomain.createEvent<string>('set current indicator');
export const changeIndicatorGroup = appDomain.createEvent<string>('set current indicator group');
export const changeUrl = appDomain.createEvent<string>('url');
export const changeFilterBy = appDomain.createEvent<string>('filterBy');
export const changeIndicators = appDomain.createEvent<any[]>('change current indicators')
export const changeIndicatorGroups = appDomain.createEvent<any[]>('change current indicators groups')
export const changeIndicatorIndex = appDomain.createEvent<number>('change current indicators index')
export const changeIndicatorGroupIndex = appDomain.createEvent<number>('change current indicator group index')
export const changeCurrentProject = appDomain.createEvent<[string, string, string]>('change current indicator group index')
export const addLevels = appDomain.createEvent<{ id: string, name: string, level: number }[]>()
export const addOrganisationUnits = appDomain.createEvent<any[]>()
export const changeLevel = appDomain.createEvent<string>();
export const changePeriodType = appDomain.createEvent<string>()
