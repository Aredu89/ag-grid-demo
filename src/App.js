import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register modules before using them
ModuleRegistry.registerModules([AllCommunityModule]);

const App = () => {
  const gridRef = useRef(null);
  const [newCar, setNewCar] = useState({ make: "", model: "", price: "" });

  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const [columnDefs] = useState([
    { checkboxSelection: true, headerCheckboxSelection: true, minWidth: 50, width: 50, flex: 0 },
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price", filter: true, editable: params => params.data.price < 50000, },
  ]);

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
  };

  const handleDelete = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length === 0) return alert("No rows selected");

    gridRef.current.api.applyTransaction({ remove: selectedRows });
  };

  const handleAdd = () => {
    if (!newCar.make || !newCar.model || !newCar.price) {
      return alert("Please fill in all fields");
    }

    const priceNumber = Number(newCar.price);
    if (isNaN(priceNumber)) {
      return alert("Price must be a number");
    }

    gridRef.current.api.applyTransaction({
      add: [{ make: newCar.make, model: newCar.model, price: priceNumber }],
    });

    setNewCar({ make: "", model: "", price: "" });
  };

  return (
    <div style={{ height: 400, width: 800, margin: "auto", marginTop: "50px" }}>
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Make"
          value={newCar.make}
          onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
          style={{ marginRight: 5 }}
        />
        <input
          placeholder="Model"
          value={newCar.model}
          onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
          style={{ marginRight: 5 }}
        />
        <input
          type="number"
          placeholder="Price"
          value={newCar.price}
          onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
          style={{ marginRight: 5, width: 80 }}
        />
        <button onClick={handleAdd}>Add Car</button>
      </div>

      <button onClick={handleDelete} style={{ marginBottom: 10 }}>
        Delete Selected Rows
      </button>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onCellValueChanged={(event) => {
          console.log('Cell edited:', event.data);
        }}
        rowSelection="multiple"
      />
    </div>
  );
};

export default App;
