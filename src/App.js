import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register modules before using them
ModuleRegistry.registerModules([AllCommunityModule]);

const App = () => {
  const gridRef = useRef(null);

  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const [columnDefs] = useState([
    { checkboxSelection: true, headerCheckboxSelection: true, width: 50 },
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price", filter: true, editable: params => params.data.price < 50000, },
  ]);

  const handleDelete = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length === 0) return alert("No rows selected");

    gridRef.current.api.applyTransaction({ remove: selectedRows });
  };

  return (
    <div style={{ height: 400, width: 660, margin: "auto", marginTop: "50px" }}>
      <button onClick={handleDelete} style={{ marginBottom: 10 }}>
        Delete Selected Rows
      </button>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={(event) => {
          console.log('Cell edited:', event.data);
        }}
        rowSelection="multiple"
      />
    </div>
  );
};

export default App;
