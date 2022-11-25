import React from "react";
import SentencePreview from "./SentencePreview";

function findBiggerWord(text, words) {
    var match = null;

    // find biggest match first
    var i = 5; //longest possible word
    while (!match) {
        if (i == 0) break;
        var testMatch = text.substring(0, i);
        match = words.filter(w => w.simplified == testMatch)[0];
        i--;
    }

    return match;
}

function paragraphToWords(paragraph, words) {
    var broken = [];
    var remainder = paragraph;

    while (remainder.length > 0) {
        var word = findBiggerWord(remainder, words);
        if (!word) {
            remainder = remainder.substring(1)
            continue;
        }
        broken.push(word);
        remainder = remainder.substring(word.simplified.length)
    }

    return broken;
}

export default class TextReader extends React.Component {
    state = {
        body: "",
        words: null,
        broken: []
    };

    componentDidMount() {
        Window.WordDAO.select().then((words) => {
            this.setState({
                words: words
            })
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="form-group">
                        <label>Chinese Paragraph</label>
                        <textarea onChange={(event) => {
                            this.setState({
                                body: event.target.value
                            })
                        }} className="form-control blockquote" rows="3">
                        </textarea>
                    </div>
                    <button className="btn btn-primary" onClick={(event) => {
                        if (this.state.words) {
                            this.setState({
                                broken: paragraphToWords(this.state.body, this.state.words)
                            })
                        }
                    }}>Start</button>
                </div>
                <SentencePreview sentence={this.state.broken}></SentencePreview>
            </div>
        )
    }
}