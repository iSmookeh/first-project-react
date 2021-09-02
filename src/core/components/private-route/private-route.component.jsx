import React from 'react';
import { Route, Redirect  } from "react-router-dom";
import { useSelector } from "react-redux";

const Component = ({ path, component}) => {
    const auth = useSelector(state => state.auth)   
    return (
        auth.isLogin === true? <Route path={path} component={component}/> : <Redirect to="/" /> 
    );
}

export default Component;
