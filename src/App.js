import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import "./App.css";

// Register modules before using them
ModuleRegistry.registerModules([AllCommunityModule]);

const App = () => {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", username: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState({ added: [], updated: [], deleted: [] });
  const hasChanges = changes.added.length || changes.updated.length || changes.deleted.length;

  const [columnDefs] = useState([
    { field: "name", filter: true, editable: true },
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
    setChanges((prev) => ({
      ...prev,
      deleted: [...prev.deleted, ...selectedRows],
    }));
  };

  const handleAdd = () => {
    if (!newUser.name || !newUser.username || !newUser.email) {
      return alert("Please fill in all fields");
    }

    gridRef.current.applyTransaction({
      add: [newUser],
    });

    setChanges((prev) => ({
      ...prev,
      added: [...prev.added, newUser],
    }));
    setNewUser({ name: "", username: "", email: "" });

  };

  const handleExport = () => {
    gridRef.current.exportDataAsCsv();
  };

  const handleCellValueChanged = (event) => {
    setChanges((prev) => ({
      ...prev,
      updated: [...prev.updated.filter(item => item.id !== event.data.id), event.data],
    }));
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", changes);
    setChanges({ added: [], updated: [], deleted: [] });
  };

  return (
    <div className="main-container">
      <div className="add-user-container">
        <div className="input-container">
          <input
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="email-input"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <button className="add-user-button" onClick={handleAdd}>Add User</button>
      </div>

      <div className="buttons-container">
        <div className="delete-save-container">
          <button className="delete-button" onClick={handleDelete}>
            Delete Selected Rows
          </button>
          {hasChanges > 0 && (
            <button className="save-button" onClick={handleSaveChanges}>
              Save Changes
            </button>
          )}
        </div>
        <button className="export-csv-button" onClick={handleExport}>
          Export CSV
        </button>
      </div>

      <div className="grid-container">
        <AgGridReact
          ref={gridRef}
          gridOptions={gridOptions}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={handleCellValueChanged}
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
