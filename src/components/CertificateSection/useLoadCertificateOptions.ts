import useGetCertificateSchemas from "@/api/useGetCertificateSchemas";
import { useMemo } from "react";

type Params = {
  keyword?: string;
  enabled?: boolean;
};

const useLoadCertificateOptions = ({ enabled, keyword }: Params) => {
  const queryResult = useGetCertificateSchemas({
    keepPreviousData: true,
    enabled,
  });

  const data = queryResult.data;

  const filtered = useMemo(() => {
    if (!data || !keyword) {
      return data;
    }
    return data.filter(({ title }) => {
      return title.toLowerCase().includes(keyword.toLowerCase());
    });
  }, [data, keyword]);

  return {
    ...queryResult,
    data: filtered,
  } as typeof queryResult;
};

export default useLoadCertificateOptions;
