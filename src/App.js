import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ModuleRegistry, themeBalham } from "ag-grid-community";

// Register modules before using them
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const App = () => {
  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const [columnDefs] = useState([
    { field: "make", filter: true, editable: true },
    { field: "model", filter: true, editable: true },
    { field: "price", filter: true, editable: true },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600, margin: "auto", marginTop: "50px" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={2}
        theme={themeBalham}
      />
    </div>
  );
};

export default App;
