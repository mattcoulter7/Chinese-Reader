import React from "react";
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import PlecoUploader from '../components/Pleco/PlecoUploader'
import XMLEditor from "../components/XMLEditor";
import InputOutput from "../components/InputOutput";

import {ConvertToXML,flip} from '../Utils/QCardGenerator'

import Main from "../layouts/Main";

export default () => {
    const [cookies, setCookie, removeCookie] = useCookies(['AuthToken']);

    if (!cookies.AuthToken) { // TODO change to check if user is valid
        return <Navigate to='/login' />;
    }

    return (
        <Main>
            <PlecoUploader />
            <InputOutput downloadFileName={`Flashcard Import ${new Date().getTime().toString().substring(0,10)}`} downloadFormat="xml" buttons={[
                {
                    name:"Generate Q Card XML",
                    func:(io) => ConvertToXML(io.state.input,' - ').then((result) => io.setState({output:result}))
                },
                {
                    name:"Flip",
                    func:(io) => io.setState({output:flip(io.state.input,' - ')})
                }
            ]}>
                <input type="checkbox" />
            </InputOutput>
            <XMLEditor />
        </Main>
    );
}