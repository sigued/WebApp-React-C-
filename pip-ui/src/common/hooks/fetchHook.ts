import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { serverBaseUrl } from "src/routes/routePaths";

export const useFetchRequest = (initialUrl = "", initialHttpMethod = "") => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.currentUser);
  const [url] = useState(initialUrl);
  const [httpMethod] = useState(initialHttpMethod);
  const [response, setResponse] = useState<Response>();

  useEffect(() => {
    if (initialUrl === "") return;

    const getResponse = async () => {
      try {
        const res: Response = await fetch(serverBaseUrl + url, {
          method: httpMethod,
          headers: {
            Authorization: "Bearer " + user?.token,
            "Content-Type": "application/json",
          },
        });
        if (!res?.ok) {
          throw await res?.text();
        }

        setResponse(res);
      } catch (err: any) {
        dispatch(
          alertActions.createAlert({
            message:
              typeof err === "string" && err !== ""
                ? err
                : "le serveur ne repond pas",
            type: "error",
          })
        );
      }
    };

    getResponse();
  }, [dispatch, httpMethod, initialUrl, url, user?.token]);

  return { response };
};
