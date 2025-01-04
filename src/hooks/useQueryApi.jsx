import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { config } from "../config/config";

const useQueryApi = (
  endpoint,
  { token = "", lazy = false, baseURL = config.API } = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(!lazy);

  const callQuery = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios({
        method: "get",
        url: `${baseURL}${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
      });
      setData(response?.data?.data);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.errorSources?.[0]?.message ||
        error?.response?.data?.message ||
        "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, token]);

  useEffect(() => {
    if (shouldFetch) {
      callQuery();
    }
  }, [shouldFetch, callQuery]);

  const refetch = () => {
    setShouldFetch(true); // Manually trigger the fetch
  };

  return { isLoading, error, data, refetch };
};

export default useQueryApi;
