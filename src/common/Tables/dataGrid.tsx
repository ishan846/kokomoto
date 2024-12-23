import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

interface AppProps {
  rows: any;
  columns: GridColDef[];
}

const DataGridTable: React.FC<AppProps> = ({ rows, columns }) => {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default DataGridTable;
