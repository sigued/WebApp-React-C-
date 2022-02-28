import { serverBaseUrl } from "src/routes/routePaths";

export const httpPostRequest = async (
  url: string,
  httpMethod: string,
  token: string | undefined,
  content: {} | undefined
) => {
  try {
    const res: Response = await fetch(serverBaseUrl + url, {
      method: httpMethod,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: content !== undefined ? JSON.stringify(content) : undefined,
    });

    if (!res?.ok) {
      throw await res?.text();
    }

    return res;
  } catch (err: any) {
    return typeof err === "string" && err !== "" && err.length < 200
      ? err
      : "le serveur ne repond pas";
  }
};
