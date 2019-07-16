import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios';

class Uploads extends Component {
    constructor(props){
        super(props);
        this.upload = this.upload.bind(this);
    }

    upload(file, path) {
        let formData = new FormData();
        formData.append("file", file);
        axios.post(path, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSM(file){
        this.upload(file, 'http://127.0.0.1:5000/upload/sheetmusic');
    }

    handleBT(file){
        this.upload(file, 'http://127.0.0.1:5000/upload/backtrack');
    }

    render() {
        return (
            <div>
                <Dropzone onDrop={acceptedFiles => this.handleSM(acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>SHEET MUSIC</p>
                            </div>
                        </section>
                    )}
                </Dropzone>

                <Dropzone onDrop={acceptedFiles => this.handleBT(acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>BACKING TRACK</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        );
    }
}

export default Uploads;
