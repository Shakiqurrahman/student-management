import axios from "axios";
import { useState } from "react";
import { config } from "../config/config";

const useMutationApi = (defaultURL = config.API) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const callMutation = async (endpoint, requestData, options = {}) => {
    const { method = "post", baseURL = defaultURL, token = "" } = options;

    setIsLoading(true);
    setError("");
    try {
      const response = await axios({
        method,
        url: `${baseURL}${endpoint}`,
        data: requestData,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true, // Ensure cookies are sent with the request
      });

      setData(response.data);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.errorSources?.[0]?.message ||
        error?.response?.data?.message ||
        "An unexpected error occurred.";
      setError(errorMessage);
      throw errorMessage;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, callMutation };
};

export default useMutationApi;
