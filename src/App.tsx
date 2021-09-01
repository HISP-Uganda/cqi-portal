import { Box, Flex, HStack, Link, Stack, Text, Button, Spacer } from '@chakra-ui/react';
import { DatePicker, Select } from 'antd';
import { useStore } from 'effector-react';
import { ChangeEvent } from 'react';
import { HashRouter as Router, Link as Linker, Route } from 'react-router-dom';
import Analytics from "./components/dashboards/Analytics";
import Indicators from "./components/dashboards/Indicators";
import Layered from "./components/dashboards/Layered";
import Indicator from './components/Indicator';
import IndicatorGroup from './components/IndicatorGroup';
import OrgUnitTreeSelect from './components/OrgUnitTreeSelect';
import { changeFilterBy, changeIndicator, changeIndicatorGroup, changeLevel, changeOu, changePeriod, changePeriodType } from './Events';
import { useD2 } from "./Queries";
import { app, indicatorForGroup } from './Store';

const { Option } = Select;
const { RangePicker } = DatePicker

function App() {
  const { isLoading, isError, isSuccess, data, error } = useD2();
  const store = useStore(app);
  const indicators = useStore(indicatorForGroup)

  const setSelectedOrgUnit = (units: any[]) => {
    changeOu(units)
  }

  const setSelectedLevel = (levels: any) => {
    changeLevel(levels)
  }

  const onIndicatorGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    changeIndicatorGroup(e.target.value);
    changeIndicator(indicators[0][0])
  }

  function PickerWithType({ type, onChange }: any) {
    if (store.periodType === 'date') return <RangePicker onChange={onChange} size="large" value={store.period} />;
    return <RangePicker picker={type} onChange={onChange} size="large" value={store.period} />;
  }
  return (
    <Box h="100vh" w="100vw">
      {isLoading && <Flex >Loading</Flex>}
      {isSuccess && <Router>
        <Stack px="10px" direction="row" bg="blue.800" py={2} alignContent="center" alignItems="center" textColor="white" mb="10px" spacing="20px">
          <Box fontWeight="bold" fontSize="2xl">Ministry of Health</Box>
          <HStack fontSize="xl" spacing="5" textTransform="uppercase">
            <Link as={Linker} to="/" _hover={{ border: "none" }}>Analytics</Link>
            <Link as={Linker} to="/layered" _hover={{ border: "none" }}>Layered Dashboard</Link>
            <Link as={Linker} to="/indicators" _hover={{ border: "none" }}>All Indicators</Link>
          </HStack>
        </Stack>
        <Stack direction="row" p="5px">
          <OrgUnitTreeSelect
            selectedOrgUnit={store.ou}
            setSelectedOrgUnit={setSelectedOrgUnit}
            initialUnits={data.organisationUnits}
            selectedLevel={store.level}
            setSelectedLevel={setSelectedLevel}
            initialLevels={data.levels}
          />
          <Stack direction="row">
            <Stack>
              <Text>Period Type</Text>
              <Select value={store.periodType} onChange={(periodType: string) => changePeriodType(periodType)} size="large" style={{ width: '200px' }}>
                <Option value="date">Daily</Option>
                <Option value="week">Weekly</Option>
                <Option value="month">Monthly</Option>
                <Option value="quarter">Quarterly</Option>
                <Option value="year">Yearly</Option>
              </Select>
            </Stack>
            <Stack>
              <Text>Period Range</Text>
              <PickerWithType type={store.periodType} onChange={(value: any) => changePeriod(value)} />
            </Stack>
          </Stack>

          {store.url.includes('indicators') && <Stack direction="row">
            <Stack>
              <Text>&nbsp;</Text>
              {store.filterBy === 'period' ? <Button onClick={() => changeFilterBy('orgUnit')}>Filter By OrgUnits</Button> : <Button onClick={() => changeFilterBy('period')}>Filter By Period</Button>}
            </Stack>
          </Stack>}
          {store.url.includes('layered') && <Stack direction="row">
            <Stack>
              <Flex>
                <Text>Program Area</Text>
                <Spacer />
              </Flex>
              <IndicatorGroup value={store.indicatorGroup} onChange={onIndicatorGroupChange} />
            </Stack>
            <Stack>
              <Text>Indicator</Text>
              <Indicator />
            </Stack>
          </Stack>}
        </Stack>
        <Route path="/" exact>
          <Analytics />
        </Route>
        <Route path="/layered">
          <Layered />
        </Route>
        <Route path="/indicators">
          <Indicators />
        </Route>
      </Router>}
      {isError && <div>{JSON.stringify(error?.message)}</div>}
    </Box>
  );
}
export default App;
