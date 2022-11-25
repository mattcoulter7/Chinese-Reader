import React from "react";
import * as XML from 'fast-xml-parser'

import UserFlashCardDAO from '../DAOs/UserFlashCardDAO';
import download from "../Utils/FileDownloader";


export default class InputOutput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            output: "",
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <label>Input Text</label>
                        <textarea value={this.state.input} className="form-control" rows={20} onChange={(e) => this.setState({
                            input:e.target.value
                        })} />
                    </div>
                    <div className="col" style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexWrap: 'nowrap',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                            {
                                this.props.buttons.map((caller) => {
                                    return (
                                        <>
                                            <button className="btn btn-primary btn-med" onClick={() => caller.func(this)} style={{
                                                margin:"0.2rem"
                                            }}>{caller.name}</button>
                                            {caller.children}
                                        </>
                                    )
                                })
                            }
                            {
                                this.children
                            }
                            <button className="btn btn-secondary btn-med" onClick={() => download(`${this.props.downloadFileName}.${this.props.downloadFormat}`,this.state.output)} style={{
                                margin:"0.2rem"
                            }}>Download</button>
                    </div>
                    <div className="col-5">
                        <label>Output Text</label>
                        <textarea value={this.state.output} readOnly className="form-control" rows={20} onChange={(e) => this.onInputChange(e)} />
                    </div>
                </div>
            </div>
        );
    }
}