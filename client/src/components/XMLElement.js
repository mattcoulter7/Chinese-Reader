import React from "react";
import { getObjectDepth,setObjectDepth } from "../Utils/ObjectDepth";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

export default class XMLElement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            expanded: true,
            jsonKey:props.jsonKey,
            jsonValue:props.jsonValue
        }
    }  
    onValueChange(e){
        this.setState({
            jsonValue:e.target.value
        });
        setObjectDepth(this.props.tree,...this.props.depth,this.props.jsonKey,e.target.value);
    }
    render() {
        let key = this.state.jsonKey;
        let value = this.state.jsonValue;
        let tree = this.props.tree;
        let depth = this.props.depth;

        let buff = [];

        // handle arrays
        if (Array.isArray(value)) {
            buff.push(
                ...value.map((t, i) => {
                    return <XMLElement  
                        key={`${depth.length}_${i}_array`} 
                        jsonKey={i} 
                        jsonValue={t} 
                        depth={key === "" ? depth : depth.concat(key)} 
                        tree={tree}>
                    </XMLElement>
                })
            );
        }

        // handle object
        else if (typeof value === "object") {
            buff.push(
                ...Object.entries(value).map((pair,i) => {
                    return <XMLElement 
                        key={`${depth.length}_${i}_json`} 
                        jsonKey={pair[0]} 
                        jsonValue={pair[1]} 
                        depth={key === "" ? depth : depth.concat(key)} 
                        tree={tree}>
                    </XMLElement>
                })
            );
        }

        // handle final value (string, number etc.)
        else {
            buff.push(
                <span className="value">
                    <input value={value} onChange={(e) => this.onValueChange(e)}/>
                </span>
            )
        }
        // render the buff
        return (
            <ul className="json">
                <li className="json"> 
                    <span className="key" onClick={() => {
                        this.setState({
                            expanded:!this.state.expanded
                        })
                    }}>{key}</span>
                    <span style={{
                        display:this.state.expanded ? "" : "none"
                    }}>
                        {
                            buff
                        }
                    </span>
                </li>
            </ul>
        )
    }
}