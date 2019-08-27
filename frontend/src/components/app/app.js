import './app.css';
import OpenSheetMusicDisplay from '../../lib/OpenSheetMusicDisplay';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {file: "MuzioClementi_SonatinaOpus36No1_Part2.xml"};
    }

    upload(file, path) {
        let formData = new FormData();
        formData.append("file", file);
        return axios.post(path, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
    }

    handleSM(file){
        this.setState(state => state.file = file.path);

        this.upload(file, 'http://127.0.0.1:5000/upload/sheetmusic').then(
            (response) => {
                this.keySigLower = response.data.keySigLower
                console.log(response);
            }
        ).catch(
            (reason) => {
                console.log(reason);
            }
        );
    }

    handleBT(file){
        this.setState(state => state.song = file.path);

        this.upload(file, 'http://127.0.0.1:5000/upload/backtrack').then(
            (response) => {
                this.setState({
                    startTime: 1000 * response.data.startTime,
                    wholeNoteTime: 60000 / response.data.bpm * this.keySigLower
                });
                console.log(response);
            }
        ).catch(
            (reason) => {
                console.log(reason);
            }
        );
    }

    render() {
        return (
            <div className="App">
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

                <OpenSheetMusicDisplay file={this.state.file} song={this.state.song} startTime={this.state.startTime} wholeNoteTime={this.state.wholeNoteTime} />
            </div>
        );
    }
}

export default App;
