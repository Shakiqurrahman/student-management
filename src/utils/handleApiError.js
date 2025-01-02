export const handleApiError = (error) => {
  const err =
    error?.response?.data?.errorSources[0]?.message ||
    "An unexpected error occurred.";
  return err;
};
