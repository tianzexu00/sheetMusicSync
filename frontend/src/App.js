import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OpenSheetMusicDisplay from './lib/OpenSheetMusicDisplay'
import Dropzone from 'react-dropzone'
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { file: "MuzioClementi_SonatinaOpus36No1_Part2.xml", play: false };
        this.upload = this.upload.bind(this);
    }

    handleClick(event) {
        const file = event.target.value;
        this.setState(state => state.file = file);
    }

    upload(file) {
        let formData = new FormData();
        formData.append("file", file);
        axios.post('http://127.0.0.1:5000/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                this.setState(state => state.play = true);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleFile(file){
        this.upload(file);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">OpenSheetMusicDisplay in React</h1>
                </header>
                <select onChange={this.handleClick.bind(this)}>
                    <option value="MuzioClementi_SonatinaOpus36No1_Part2.xml">Muzio Clementi: Sonatina Opus 36 No1 Part2</option>
                    <option value="Beethoven_AnDieFerneGeliebte.xml">Beethoven: An Die FerneGeliebte</option>
                    <option value="koko_piano.xml">Kyousougiga: Koko</option>
                </select>
                <OpenSheetMusicDisplay file={this.state.file} play={this.state.play}/>

                <Dropzone onDrop={acceptedFiles => this.handleFile(acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop backtrack</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        );
    }
}

export default App;
