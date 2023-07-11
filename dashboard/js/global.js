const apiHandler = async (options) => {
  const apiResponse = await fetch(options.destination, {
    method: options.method || "GET",
    body: options.parse ? JSON.stringify(options.body) : options.body || null,
    headers: options.headers || {},
  });

  const resultData = await apiResponse.json();
  return resultData;
};
