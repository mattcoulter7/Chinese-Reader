import React from "react";
import XMLElement from "./XMLElement"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import * as XML from 'fast-xml-parser'

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export default class XMLEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xmlString: props.xmlString || ""
        }
        this.xmlParser = new XML.XMLParser({});
        this.xmlBuilder = new XML.XMLBuilder({});
    }
    onFileChange(e) {
        let file = e.target.files[0];

        let reader = new FileReader();

        reader.onload = () => {
            
            this.setState({
                xmlString: reader.result,
                xmlTree: this.xmlParser.parse(reader.result)
            })
        };

        reader.onerror = () => {
            console.log(reader.error);
        };

        reader.readAsText(file);
    }
    render() {
        return (
            <>
                <input type="file" onChange={(e) => this.onFileChange(e)} />
                <button onClick={() => { 
                    download(
                        "export.xml",
                        this.xmlBuilder.build(this.state.xmlTree)
                    )
                }}>Download</button>
                <XMLElement jsonKey={""} jsonValue={this.state.xmlTree} depth={[]} tree={this.state.xmlTree}></XMLElement>
            </>
        );
    }
}