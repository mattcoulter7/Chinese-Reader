import React from "react";

import UserFlashCardDAO from '../../DAOs/UserFlashCardDAO';


const PlecoFileToSchema = (file) => {

}

export default class PlecoUploader extends React.Component {
    onUpload(event){
        console.log(event)
        var file = event.target.files[0];
        if (!file) return;

        var cards = PlecoFileToSchema(file);


    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.onUpload}></input>
            </div>
        );
    }
}