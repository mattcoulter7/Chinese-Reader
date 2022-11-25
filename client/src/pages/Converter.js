import React from "react";
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import PlecoUploader from '../components/Pleco/PlecoUploader'
import XMLEditor from "../components/XMLEditor";
import InputOutput from "../components/InputOutput";

import {Convert,ContentTypes} from '../Utils/ChineseConverters'

import Main from "../layouts/Main";

export default () => {
    const [cookies, setCookie, removeCookie] = useCookies(['AuthToken']);

    //if (!cookies.AuthToken) { // TODO change to check if user is valid
    //    return <Navigate to='/login' />;
    //}

    return (
        <Main>
            <InputOutput downloadFormat="txt" buttons={[
                {
                    name:"Simplified To Pinyin",
                    func:(io) => {
                        io.setState({output:"Loading..."});
                        Convert(io.state.input,ContentTypes.SIMPLIFIED,ContentTypes.PINYIN,5).then((result) => io.setState({output:result}));
                    }
                },
                {
                    name:"Simplified To Traditional",
                    func:(io) => {
                        io.setState({output:"Loading..."});
                        Convert(io.state.input,ContentTypes.SIMPLIFIED,ContentTypes.TRADITIONAL,5).then((result) => io.setState({output:result}));
                    }
                },
                {
                    name:"Traditional To Pinyin",
                    func:(io) => {
                        io.setState({output:"Loading..."});
                        Convert(io.state.input,ContentTypes.TRADITIONAL,ContentTypes.PINYIN,5).then((result) => io.setState({output:result}));
                    }
                },
                {
                    name:"Traditional To Simplified",
                    func:(io) => {
                        io.setState({output:"Loading..."});
                        Convert(io.state.input,ContentTypes.TRADITIONAL,ContentTypes.SIMPLIFIED,5).then((result) => io.setState({output:result}));
                    }
                },
                {
                    name:"Pinyin To Simplified",
                    func:(io) => {
                        io.setState({output:"Loading..."});
                        Convert(io.state.input,ContentTypes.PINYIN,ContentTypes.SIMPLIFIED,12).then((result) => io.setState({output:result}));
                    }
                },
                {
                    name:"Pinyin To Traditional",
                    func:(io) => {
                        io.setState({output:"Loading..."});
                        Convert(io.state.input,ContentTypes.PINYIN,ContentTypes.TRADITIONAL,12).then((result) => io.setState({output:result}));
                    }
                },
                {
                    name:"Simplified To Definition",
                    func:(io) => {
                        io.setState({output:"Loading..."});
                        Convert(io.state.input,ContentTypes.SIMPLIFIED,ContentTypes.DEFINITION,5).then((result) => io.setState({output:result}));
                    }
                }
            ]}/>
        </Main>
    );
}