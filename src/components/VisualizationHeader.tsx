import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import { ChangeEvent, FC } from "react";
import { changeFilterBy, changeIndicator, changeIndicatorGroup } from "../Events";
import { app, indicatorForGroup } from "../Store";
import Indicator from "./Indicator";
import IndicatorGroup from "./IndicatorGroup";
export interface HeaderProps {
}
const VisualizationHeader: FC<HeaderProps> = () => {
  const store = useStore(app);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const indicators = useStore(indicatorForGroup)
  const onIndicatorGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    changeIndicatorGroup(e.target.value);
    changeIndicator(indicators[0][0])
  }
  return (
    <>
      <Button onClick={onOpen}>
        Filters
      </Button>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody>
              <HStack>
                {store.url !== '/indicators' && store.url !== '/' && <>
                  <IndicatorGroup value={store.indicatorGroup} onChange={onIndicatorGroupChange} />
                  <Indicator />
                </>}
                {store.url === '/indicators' && <>
                  {store.filterBy === 'period' ? <Button onClick={() => changeFilterBy('orgUnit')}>Filter By OrgUnits</Button> : <Button onClick={() => changeFilterBy('period')}>Filter By Period</Button>}
                </>}
                <Text>This is coming</Text>
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default VisualizationHeader
