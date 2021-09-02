import React, { useState, useCallback, useEffect } from "react";
import api from "core/services/api";

import "./single-user-panel.styles.scss";

const Component = () => {
  const [singleUser, setSingleUser] = useState([]);

 
  const onGetSingleUserCallback = useCallback(async () => {
    const response = await api.get("users/2");
    console.log(response);
    setSingleUser(response.data.data);
  }, [api]);

  useEffect(() => {
    onGetSingleUserCallback();
  }, [onGetSingleUserCallback]);

  return (
    <div>
        
    </div>
  );
};

export default Component;
