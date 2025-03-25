export async function networkRequest(
  urlPath: string,
  method: string,
  body?: any
) {
  let response;
  if (method === "GET") {
    response = await fetch(urlPath);
  } else if (method === "POST") {
    if (body === undefined) {
      throw new Error("POST request must have a body");
    }
    response = await fetch(urlPath, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  if (!response || (response.status !== 200 && response.status !== 201)) {
    console.error("Network Request Error", {
      urlPath,
      method,
      body,
      response,
    });
    return;
  }
  return response;
}
