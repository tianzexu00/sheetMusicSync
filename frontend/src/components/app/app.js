import logo from '../../assets/images/logo.svg';
import './app.css';
import OpenSheetMusicDisplay from '../../lib/OpenSheetMusicDisplay'

import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { file: "MuzioClementi_SonatinaOpus36No1_Part2.xml"};
        this.upload = this.upload.bind(this);
    }

    handleClick(event) {
        const file = event.target.value;
        this.setState(state => state.file = file);
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
        
    }

    handleBT(file){
        this.upload(file, 'http://127.0.0.1:5000/uploadBT');
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

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">OpenSheetMusicDisplay in React</h1>
                </header>
                <select onChange={this.handleClick.bind(this)}>
                    <option value="MuzioClementi_SonatinaOpus36No1_Part2.xml">Muzio Clementi: Sonatina Opus 36 No1 Part2</option>
                    <option value="Beethoven_AnDieFerneGeliebte.xml">Beethoven: An Die FerneGeliebte</option>
                    <option value="koko_piano.xml">Kyousougiga: Koko</option>
                </select>
                <OpenSheetMusicDisplay file={this.state.file} ref="osmdRef"/>
            </div>
        );
    }
}

export default App;
