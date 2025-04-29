import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register modules before using them
ModuleRegistry.registerModules([AllCommunityModule]);

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
    <div style={{ height: 400, width: 610, margin: "auto", marginTop: "50px" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default App;
