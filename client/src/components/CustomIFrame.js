import React from "react";

export default class PlecoUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.default
        }
    }
    render() {
        return (
            <div>
                <div>
                    <label className="form-label" htmlFor="serverEmail">Server URL</label>
                    <input type="url" id="serverEmail" className="form-control form-control-lg" value={this.state.url} placeholder={this.props.default} onChange={(event) => {
                        this.setState({
                            url: event.target.value
                        })
                    }} />
                </div>
                <iframe style={
                    { 
                        width: "100%", 
                        height: "400px",
                    }
                } src={this.state.url} title={this.props.title}></iframe>
            </div>
        );
    }
}