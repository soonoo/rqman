import axios, { AxiosError } from "axios";
import {
  ErrorResult,
  isErrorResult,
  QueryResults,
  ReadResult,
  WriteResult,
} from "@/types/rqlite";

const httpClient = axios.create({
  // baseURL: "http://localhost:4001",
  baseURL: "/api/rqlite",
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
