async function getHandler(urlPath: string) {
  const response = await fetch(urlPath);
  return response;
}

async function postHandler(urlPath: string, method: string, body: any) {
  if (body === undefined) {
    throw new Error("POST request must have a body");
  }
  const response = await fetch(urlPath, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
}

function handleErrors(
  response: Response,
  urlPath: string,
  method: string,
  body: any
) {
  console.error("Network Request Error", {
    urlPath,
    method,
    body,
    response,
  });
}

export async function networkRequest(
  urlPath: string,
  method: string,
  body?: any
) {
  let response: Response | undefined;

  switch (method) {
    case "GET":
      response = await getHandler(urlPath);
      break;

    case "POST":
      response = await postHandler(urlPath, method, body);
      break;

    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }

  if (!response || (response.status !== 200 && response.status !== 201)) {
    handleErrors(response, urlPath, method, body);
    return;
  }

  return response;
}
