import { useEffect, useState } from "react";
import getAxios from "../AxiosInstance";

export default function useAxiosGet(url: string, schema: string) {
  const [payload, setPayload] = useState(undefined);
  const [err, setErr] = useState(undefined);

  useEffect(() => {
    getAxios()
      .get(url)
      .then((res) => setPayload(res.data.payload[schema]))
      .catch((err) => setErr(err.response.data));
  }, []);


  return [payload, err];
}
