import React, { useEffect, useContext } from "react";
import Routing from "./Routing";
import { DataContex } from "./components/dataprovider/DataProvider";
import { Type } from "./utility/ActionType";
import { auth } from "./utility/firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContex);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <Routing />;
}

export default App;
