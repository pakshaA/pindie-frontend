export const isResponseOk = (response) => {
    return !(response instanceof Error);
  };
