# AG Grid React Demo

This project is a **React app showcasing the power of AG Grid** — a feature-rich data grid library that efficiently handles large datasets with modern UI capabilities.

It demonstrates:

- Dynamic data loading
- Inline editing
- Row selection and deletion
- Adding new rows
- Tracking and saving changes
- Pagination
- Loading overlays
- Responsive design

---

## Features Demonstrated

### AG Grid Functionalities

- **Pagination**  
  Displays data in pages with configurable page size (20 rows per page in this demo).

- **Row Selection**  
  Users can select multiple rows for batch operations like deletion.

- **Inline Editing**  
  Users can edit cells directly in the grid. Changes are tracked until explicitly saved.

- **Add/Delete Rows**  
  - New users can be added with the input fields and "Add User" button.
  - Selected rows can be deleted using the "Delete Selected Rows" button.

- **Change Tracking & Save Button**  
  - A "Save Changes" button appears when there are unsaved edits.
  - On click, it logs the pending changes (simulating a save action to an API).

- **Loading Spinner**  
  Displays a loading spinner when data is being fetched.

- **Responsive & Styled Layout**  
  Uses a clean layout with styled inputs, buttons, and grid container.

---

## Technologies Used

- **React**
- **AG Grid Community Edition**
- **JavaScript Fetch API** (for data)
- **CSS** (basic styling)

---

## 📦 How to Run

1. **Clone the repository:**

  ```bash
  git clone https://github.com/yourusername/ag-grid-react-demo.git
  cd ag-grid-react-demo

2. **Install dependencies:**

  ```bash
   npm install

3. **Start the development server:**

  ```bash
   npm start

4. **Open the app in your browser:**

   [http://localhost:3000](http://localhost:3000)
