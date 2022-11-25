import React from "react";

import CustomIFrame from '../components/CustomIFrame'
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import Main from "../layouts/Main";

export default () => {
    const [cookies, setCookie, removeCookie] = useCookies(['AuthToken']);

    if (!cookies.AuthToken) { // TODO change to check if user is valid
        return <Navigate to='/login' />;
    }

    return (
        <Main>
            <CustomIFrame default="http://192.168.0.102:50505" />
        </Main>
    );
}