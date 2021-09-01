import { appDomain } from './Domains';
import moment from 'moment';
import {
  setD2,
  changeCurrentProject,
  changeFilterBy,
  changeIndicator,
  changeIndicatorGroup,
  changeIndicatorGroupIndex,
  changeIndicatorGroups,
  changeIndicatorIndex,
  changeIndicators,
  changeOu,
  changePeriod,
  changeUrl,
  addLevels,
  addOrganisationUnits,
  changePeriodType,
  changeLevel
} from "./Events";
import { Store } from './interfaces';

export const enumerateDates = (startDate: moment.Moment, endDate: moment.Moment, addition: any, format: string) => {
  const dates = [];
  const currDate = moment(startDate).startOf(addition);
  const lastDate = moment(endDate).startOf(addition);
  dates.push(currDate.clone().format(format));
  while (currDate.add(1, addition).diff(lastDate) <= 0) {
    dates.push(currDate.clone().format(format));
  }
  return dates;
};

function addition(periodType: string) {
  switch (periodType) {
    case "date":
      return "days";
    case "week":
      return "weeks";
    case "month":
      return "months";
    case "quarter":
      return "quarters";
    case "year":
      return "years";
  }
}

function additionFormat(periodType: string) {
  switch (periodType) {
    case "date":
      return "YYYYMMDD";
    case "week":
      return "YYYY[W]WW";
    case "month":
      return "YYYYMM";
    case "quarter":
      return "YYYY[Q]Q";
    case "year":
      return "YYYY";
    default:
      return ""
  }
}

export const app = appDomain.createStore<Store>({
  d2: null,
  url: '/analytics',
  filterBy: 'period',
  indicator: '',
  ou: ['akV6429SUqu'],
  level: '',
  indicatorGroup: '',
  periodType: 'month',
  indicatorGroups: [],
  organisationUnits: [],
  indicators: [],
  period: [moment().subtract(1, 'months').startOf('m'), moment().add(1, 'months').endOf('m')],
}).on(setD2, (state, d2) => {
  return { ...state, d2 }
})
  .on(changeIndicator, (state, indicator: string) => {
    return { ...state, indicator }
  })
  .on(changeIndicatorGroup, (state, indicatorGroup: string) => {
    return { ...state, indicatorGroup }
  })
  .on(changePeriod, (state, period: [moment.Moment, moment.Moment]) => {
    return { ...state, period }
  })
  .on(changeOu, (state, ou: string[]) => {
    return { ...state, ou, level: "" }
  })
  .on(changeUrl, (state, url: string) => {
    return { ...state, url }
  })
  .on(changeFilterBy, (state, filterBy: string) => {
    return { ...state, filterBy }
  })
  .on(changeIndicators, (state, indicators: any[]) => {
    return { ...state, indicators }
  })
  .on(changeIndicatorIndex, (state, indicatorIndex: number) => {
    return { ...state, indicatorIndex }
  })
  .on(changeIndicatorGroupIndex, (state, indicatorGroupIndex: number) => {
    return { ...state, indicatorGroupIndex }
  })
  .on(changeIndicatorGroups, (state, indicatorGroups: any[]) => {
    return { ...state, indicatorGroups }
  }).on(changeCurrentProject, (state, data: [string, string, string]) => {
    const [currentProjectStartDate, currentProjectEndDate, currentProjectFrequency] = data;
    return { ...state, currentProjectStartDate, currentProjectEndDate, currentProjectFrequency }
  }).on(addLevels, (state, levels) => {
    return { ...state, levels }
  }).on(addOrganisationUnits, (state, organisationUnits) => {
    return { ...state, organisationUnits }
  }).on(changePeriodType, (state, periodType) => {
    return { ...state, periodType }
  }).on(changeLevel, (state, level) => {
    return { ...state, level }
  });

export const $d2 = app.map(({ d2 }) => {
  return d2;
});

export const $orgUnits = app.map((state) => {
  if (state.level !== '') {
    return [...state.ou, state.level].join(';')
  }
  return state.ou.join(';')
});

export const $periods = app.map((state) => {
  const periods = enumerateDates(state.period[0], state.period[1], addition(state.periodType), additionFormat(state.periodType));

  return periods.join(';')

});


export const allIndicators = app.map((state) => {
  const index = state.indicatorIndex || -1

  if (state.indicators && index !== -1) {
    return state.indicators.map((row: any) => [row[0], row[index]])
  }
  return []
});

export const currentIndicator = app.map((state) => {
  const index = state.indicatorIndex || -1
  const indic = state.indicators.find((row: any) => row[0] === state.indicator);
  if (indic && index !== -1) {
    return indic[index];
  }
  return "";
});

export const indicatorForGroup = app.map((state) => {
  const indicatorGroupIndex = state.indicatorGroupIndex || -1
  const indicatorIndex = state.indicatorIndex || -1
  if (state.indicators && indicatorGroupIndex !== -1 && indicatorIndex !== -1) {
    return state.indicators.filter((row: any) => row[indicatorGroupIndex] === state.indicatorGroup).map((row: any) => [row[0], row[indicatorIndex]])
  }
  return []
});