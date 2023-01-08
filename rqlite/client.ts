import axios from "axios";
import {
  isErrorResult,
  QueryResults,
  ReadResult,
  WriteResult,
} from "@/types/rqlite";
import { getConfig } from "hooks/useConfig";

const httpClient = axios.create({
  baseURL: "/api/rqlite",
});

httpClient.interceptors.request.use(function (config) {
  const activeAccount = getConfig().accounts.find((u) => u.isActive);

  if (activeAccount) {
    const { username, password } = activeAccount;
    config.headers = config.headers ?? {};
    const authHeader = btoa(`${username}:${password}`);
    (config.headers as any)["X-Rqlite-Authorization"] = `Basic ${authHeader}`;
  }
  return config;
});

export const rqlite = {
  read: (q: string[]) =>
    httpClient
      .post<QueryResults<ReadResult>>("/db/query?timings", q)
      .then((resp) => {
        if (isErrorResult(resp.data.results[0])) {
          throw resp;
        }
        return resp;
      }),

  write: (q: string[]) =>
    httpClient
      .post<QueryResults<WriteResult>>("/db/execute?timings", q)
      .then((resp) => {
        if (isErrorResult(resp.data.results[0])) {
          throw resp;
        }
        return resp;
      }),

  status: () => httpClient.get<any>("/status"),
  nodes: () => httpClient.get<any>("/nodes"),
  readiness: () => httpClient.get<any>("/readyz"),
  expvar: () => httpClient.get<any>("/debug/vars"),
};
