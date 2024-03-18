import { useSearchParams } from "react-router-dom";

function useQueryParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  const handleChange = (param: string, value: string) => {
    setSearchParams((prev) => {
      if (value === "") {
        searchParams.delete(param);
      } else {
        searchParams.set(param, value);
      }

      return prev;
    });
  };

  return { query, handleChange };
}

export default useQueryParam;
