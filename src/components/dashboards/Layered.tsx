import { Center, Flex, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useEffect } from "react";
import { changeUrl } from "../../Events";
import { useAnalytics } from "../../Queries";
import { $d2, app, currentIndicator, $orgUnits, $periods } from "../../Store";
import { colors } from "../../utils/common";
const Layered = () => {
  const store = useStore(app);
  const orgUnits = useStore($orgUnits);
  const currentInd = useStore(currentIndicator);
  const d2 = useStore($d2);
  const periods = useStore($periods);
  const { data, isError, isLoading, error, isSuccess } = useAnalytics(d2, "vMfIVFcRWlu", "kHRn35W3Gq4", store.indicator, "rVZlkzOwWhi", "RgNQcLejbwX", orgUnits, periods, "all", 'SUM', true, true)
  useEffect(() => {
    changeUrl('/layered');
  }, [])
  return (
    <>
      {isLoading && <Flex className="biggest-height" alignItems="center" justifyItems="center" justifyContent="center" alignContent="center"><Center><Spinner size="sm" /></Center></Flex>}
      {isSuccess && <VStack className="biggest-height" bg="white" overflow="auto" spacing="0">
        <Text bg="blue.800" textAlign="center" w="100%" position="sticky" top={0} textColor="white" fontSize="xl">{currentInd}</Text>
        <Table size="sm">
          <Thead bg="blue.800" position="sticky" top={7} boxShadow="0 2px 2px -1px rgba(0, 0, 0, 0.4)">
            <Tr>
              <Th textColor="white">Location</Th>
              {data.pes.map((pe: any) => <Th textColor="white" textAlign="center" key={pe.id}>{pe.name}</Th>)}
            </Tr>
          </Thead>
          <Tbody bg="white">
            {data.ous.map((ou: any) =>
              <Tr key={ou.id}>
                <Td>{ou.name}</Td>
                {data.pes.map((pe: any) => <Td bg={colors(data.data[ou.id][pe.id]['indicator'])} textAlign="center" key={`${pe.id}${ou.id}`}>{data.data[ou.id][pe.id]['indicator'] !== '-' ? `${data.data[ou.id][pe.id]['indicator']}%` : data.data[ou.id][pe.id]['indicator']}</Td>)}
              </Tr>)}
          </Tbody>
        </Table>
      </VStack>}
      {isError && <div>{error?.message}</div>}
    </>
  )
}

export default Layered
