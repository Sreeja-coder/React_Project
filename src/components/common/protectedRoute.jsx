import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import { getCurrentUser } from './../../services/authServices';

const ProtectedRoute = ({path,component:Component,render,...rest}) => {
    return (  
    <Route 
    {...rest}
    path={path}
     render={
         props =>{
            // console.log(props) this has history of the past page the user was on and can be used to re-direct the user there
            if(!getCurrentUser()) return <Redirect to={{pathname:"/login",state:{from:props.location}}}/>
            return Component?<Component {...props} />:render(props)
 }}/>
     );
};
 
export default ProtectedRoute;