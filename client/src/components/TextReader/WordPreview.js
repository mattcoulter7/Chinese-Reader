import React from "react";
import DefinitionTester from "./DefinitionTester";
import PinyinTester from "./PinyinTester";

export default class WordPreview extends React.Component {
    render() {
        return (
            <div className="col shadow p-3 mb-5 bg-white rounded text-center" style={{
                margin: "0 0.5rem 0 0.5rem",
            }}>
                <div>
                    <h3>{this.props.word.simplified}</h3>
                </div>
                <PinyinTester word={this.props.word}></PinyinTester>
                <DefinitionTester word={this.props.word}></DefinitionTester>
            </div>
        );
    }
}