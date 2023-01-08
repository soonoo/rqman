export interface ReadResult {
  columns: string[];
  types: string[];
  values?: any[][];
  time: number;
  error: string;
}

export interface WriteResult {
  last_insert_id: number;
  rows_affected: number;
}

export interface ErrorResult {
  error: string;
}

type AnyResult = ReadResult | WriteResult | ErrorResult;

export const isReadResult = (result: AnyResult): result is ReadResult => {
  return "columns" in result;
}

export const isWriteResult = (result: AnyResult): result is WriteResult => {
  return "rows_affected" in result;
}

export const isErrorResult = (result: AnyResult): result is ErrorResult => {
  return "error" in result;
}

export interface QueryResults<T = (ReadResult | WriteResult | ErrorResult)> {
  results: T[];
  time: number;
}
