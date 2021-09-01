import { Td } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { useStore } from "effector-react";
import { FC } from "react";
import { useAnalytics } from "../Queries";
import { $d2, app, $orgUnits, $periods } from "../Store";
import { colors } from "../utils/common";

interface TableIndicatorProps {
  search: string;
  what: string
}

const TableIndicator: FC<TableIndicatorProps> = ({ search, what }) => {
  const d2 = useStore($d2);
  const store = useStore(app)
  const orgUnits = useStore($orgUnits);
  const periods = useStore($periods)
  const { data, isError, isLoading, error, isSuccess } = useAnalytics(d2, "vMfIVFcRWlu", "kHRn35W3Gq4", search, "rVZlkzOwWhi", "RgNQcLejbwX", orgUnits, periods, store.filterBy)
  return (
    <>
      {isLoading && <Td textAlign="center"><Spinner size="xs" /></Td>}
      {isSuccess && <Td bg={colors(data[what].indicator)} textAlign="center"> {data[what].indicator !== '-' ? `${data[what].indicator}%` : data[what].indicator} </Td>}
      {isError && <Td>{error?.message}</Td>}
    </>
  )
}

export default TableIndicator
