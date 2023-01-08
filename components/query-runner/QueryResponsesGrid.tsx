import {
  isErrorResult,
  isReadResult,
  isWriteResult,
  QueryResults,
} from "@/types/rqlite";
import { Clear, Close } from "@mui/icons-material";
import { Tabs, Tab, Stack, Box, Divider, IconButton } from "@mui/material";
import { isEmpty } from "lodash";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";

interface IQueryResponseGridProp {
  data: ({ q: string } & QueryResults)[];
  onRemoveTab: (index: number) => void;
}

const QueryResponseGrid = (prop: IQueryResponseGridProp) => {
  const { data } = prop;
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    setTabIndex(0);
  }, [data]);

  const renderTab = useCallback(() => {
    if (isEmpty(data)) {
      return null;
    }

    const { results, q } = data[tabIndex];

    if (isReadResult(results[0])) {
      return (
        <>
          <div style={{ padding: "2px" }}>
            {(results[0].time * 1000).toFixed(2)}ms, [{q}]
          </div>
          <DataGrid
            style={{ height: "calc(100% - 80px)", flexGrow: 1 }}
            columns={results[0].columns.map((c) => ({ key: c, name: c }))}
            rows={results[0].values.map((v) => {
              return v.reduce((acc, cur, i) => {
                // @ts-ignore
                acc[results[0].columns[i]] = String(cur);
                return acc;
              }, {});
            })}
          />
        </>
      );
    }
    if (isWriteResult(results[0])) {
      return <div>{JSON.stringify(results[0])}</div>;
    }
    if (isErrorResult(results[0])) {
      return <div>{JSON.stringify(results[0])}</div>;
    }
    return null;
  }, [data, tabIndex]);

  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        borderTop: "6px solid #ddd",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {isEmpty(data) ? (
        <Stack justifyContent="center" alignItems="center" height="100%">
          Query results will be displayed here.
        </Stack>
      ) : (
        <Box height="100%">
          <Tabs
            variant="scrollable"
            value={tabIndex}
            onChange={(e, value) => setTabIndex(value)}
            scrollButtons="auto"
          >
            {data.map(({ q }, index) => {
              return (
                <Tab
                  label={
                    <span style={{ display: "flex", alignItems: "center" }}>
                      RESULT {data.length - index}
                      <IconButton
                        size="small"
                        style={{ marginLeft: "8px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          prop.onRemoveTab(index);
                          setTabIndex(0);
                        }}
                      >
                        <Close sx={{ fontSize: "16px" }} />
                      </IconButton>
                    </span>
                  }
                  key={index}
                  value={index}
                />
              );
            })}
          </Tabs>
          <Divider />
          {renderTab()}
        </Box>
      )}
    </div>
  );
};

export default QueryResponseGrid;
