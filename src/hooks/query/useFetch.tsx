import { useQuery } from "@tanstack/react-query";

interface Props {
  path: string;
  params: string;
}

function useFetch<T>({ path, params }: Props) {
  const result = useQuery<T[]>({
    queryKey: [path, params],
    // queryFn: async () => {

    //   return res?.data?.data
    // },
  });
  return result;
}

export default useFetch;
