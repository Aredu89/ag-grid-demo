import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register modules before using them
ModuleRegistry.registerModules([AllCommunityModule]);

const App = () => {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", username: "", email: "" });
  const [loading, setLoading] = useState(false);

  const [columnDefs] = useState([
    { field: "name", filter: true },
    { field: "username", filter: true },
    { field: "email", filter: true },
  ]);

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
  };

  const gridOptions = {
    rowSelection: { 
        mode: 'multiRow' 
    },
    pagination: true,
    paginationPageSize: 20,
  };

  const handleGridReady = (params) => {
    gridRef.current = params.api;
    setLoading(true);
  
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const multipliedData = [];
  
        for (let i = 0; i < 50; i++) {
          data.forEach((user, index) => {
            multipliedData.push({
              id: i * data.length + index + 1,
              name: user.name + " " + (i + 1),
              username: user.username + i,
              email: user.email.replace("@", `+${i}@`),
            });
          });
        }
        setTimeout(() => {
          setRowData(multipliedData);
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleDelete = () => {
    const selectedRows = gridRef.current.getSelectedRows();
    if (selectedRows.length === 0) return alert("No rows selected");

    gridRef.current.applyTransaction({ remove: selectedRows });
  };

  const handleAdd = () => {
    if (!newUser.name || !newUser.username || !newUser.email) {
      return alert("Please fill in all fields");
    }

    gridRef.current.applyTransaction({
      add: [{ name: newUser.name, username: newUser.username, email: newUser.email }],
    });

    setNewUser({ name: "", username: "", email: "" });
  };

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", boxSizing: "border-box", padding: 20, }}>
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          style={{ marginRight: 5 }}
        />
        <input
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          style={{ marginRight: 5 }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={{ marginRight: 5, width: 80 }}
        />
        <button onClick={handleAdd}>Add User</button>
      </div>

      <button onClick={handleDelete} style={{ marginBottom: 10, width: 150 }}>
        Delete Selected Rows
      </button>
      <div style={{ flex: 1 }}>
        <AgGridReact
          ref={gridRef}
          gridOptions={gridOptions}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={(event) => {
            console.log('Cell edited:', event.data);
          }}
          onGridReady={handleGridReady}
          overlayLoadingTemplate={
            '<span class="loading-spinner"></span>'
          }
          loading={loading}
        />
      </div>
    </div>
  );
};

export default App;
