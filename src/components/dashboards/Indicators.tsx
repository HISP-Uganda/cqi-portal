import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useStore } from "effector-react";
import { useEffect, useState } from "react";
import { changeUrl } from "../../Events";
import { useEventOptions } from "../../Queries";
import { $d2 } from "../../Store";
import AllIndicators from "../AllIndicators";

const Indicators = () => {
  const d2 = useStore($d2);
  const [dataElementIndex, setDataElementIndex] = useState<number>(-1)
  const { data, isError, isLoading, error, isSuccess } = useEventOptions(d2, 'vPQxfsUQLEy', 'kToJ1rk0fwY');
  useEffect(() => {
    if (!!data) {
      setDataElementIndex(data.headers.findIndex((header: any) => header.name === 'kToJ1rk0fwY'))
    }
    changeUrl('/indicators');
  }, [data])
  return (
    <>
      {isLoading && <Center className="biggest-height"><Spinner /></Center>}
      {isSuccess && <AllIndicators dataElementIndex={dataElementIndex} rows={data.rows} />}
      {isError && <Center className="biggest-height">{error?.message}</Center>}
    </>
  )
}

export default Indicators
