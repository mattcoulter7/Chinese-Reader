import React from "react";

export default class DefinitionTester extends React.Component {
    state = {
        input:""
    }

    definitionMatch(){
        return this.props.word.definition.toLowerCase().match(this.state.input.toLowerCase());
    }

    render() {
        var className = "form-control";
        if (this.state.input) {
            if (this.definitionMatch()) {
                className += " is-valid"
            } else {
                className += " is-invalid"
            }
        }
        return (
            <div>
                <div style={{
                    margin: "0.5rem"
                }}>
                    <input type="text" className={className} placeholder='Definition' required onChange={(event) => {
                        this.setState({
                            input: event.target.value
                        })
                    }}>
                    </input>
                </div>
            </div>
        );
    }
}