import React from "react";
import $ from 'jquery';

import WordPreview from "./WordPreview";


function arrayToRows(array, colCount) {
    return array.reduce((prev, curr, i) => {
        let rowIndex = Math.floor(i / colCount);
        prev[rowIndex] = (prev[rowIndex] || []).concat(curr);
        return prev;
    }, []);
}

export default class SentencePreview extends React.Component {
    state={
        active:""
    }
    renderRowTab(row, index) {
        var rowText = row.map(word => word.simplified).join("");
        var rowId = `#line-${index}`;
        var className = "list-group-item list-group-item-action"
        if (this.state.active.endsWith(rowId)){
            className += " active"
        }
        return <a className={className} href={rowId} onClick={(event) => {
            this.setState({
                active:event.target.href
            })
        }}>{rowText}</a>
    }
    renderRowContent(row, index) {
        var rowId = `line-${index}`;
        return <div id={rowId} className="row">
            {row.map((word, index) => {
                return <WordPreview key={`${word._id}_${index}`} word={word}></WordPreview>
            })}
        </div>
    }

    render() {
        var rows = arrayToRows(this.props.sentence, 4);
        return (
            <div className="shadow-none p-3 mb-5 bg-light rounded">
                <div className="row" style={{
                    height: "80vh",
                }}>
                    <div className="col-3" style={{
                        height: "inherit",
                        overflow:"auto"
                    }}>
                        <div id="list-example" className="list-group">
                            {
                                rows.map((row, i) => this.renderRowTab(row, i))
                            }
                        </div>
                    </div>
                    <div className="col-9" style={{
                        height: "inherit",
                        overflow:"auto"
                    }}>
                        <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-content">
                            {
                                rows.map((row, i) => this.renderRowContent(row, i))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}