import React from "react";

export default class PinyinTester extends React.Component {
    state = {}
    render() {
        return (
            <div>
                {
                    this.props.word.pinyinArray.map((pinyin, index) => this.renderInput(pinyin, index))
                }
            </div>
        );
    }

    renderInput(pinyin, index) {
        var character = this.props.word.simplifiedArray[index];
        var className = "form-control";
        if (this.state[character]){
            if (this.state[character].toLowerCase() == pinyin.toLowerCase()){
                className += " is-valid"
            } else {
                className += " is-invalid"
            }
        }
        return (
            <div style={{
                margin: "0.5rem"
            }}>
                <input type="text" className={className} placeholder={character} required onChange={(event) => {
                    this.setState({
                        [character]:event.target.value
                    })
                }}>
                </input>
            </div>)
    }
}