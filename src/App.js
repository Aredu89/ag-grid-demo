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
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price", filter: true, editable: params => params.data.price < 50000, },
  ]);

  return (
    <div style={{ height: 400, width: 610, margin: "auto", marginTop: "50px" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={(event) => {
          console.log('Cell edited:', event.data);
        }}
      />
    </div>
  );
};

export default App;
