// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "../../App";
// //import { DataProvider } from "./components/dataprovider/DataProvider";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <DataProvider>
//       <App />
//     </DataProvider>
//   </React.StrictMode>,
// );

// src/components/dataprovider/DataProvider.jsx

import React, { createContext, useReducer } from "react";
import { initialState, Reducer } from "../../utility/Reducer";

export const DataContex = createContext();

export const DataProvider = ({ children }) => {
  return (
    <DataContex.Provider value={useReducer(Reducer, initialState)}>
      {children}
    </DataContex.Provider>
  );
};
