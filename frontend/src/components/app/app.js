import './app.css';
import OpenSheetMusicDisplay from '../../lib/OpenSheetMusicDisplay';
import Uploads from '../uploads/uploads';

import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { file: "MuzioClementi_SonatinaOpus36No1_Part2.xml"};

    }

    handleClick(event) {
        const file = event.target.value;
        this.setState(state => state.file = file);
    }

    render() {
        return (
            <div className="App">
                <Uploads></Uploads>

                <select onChange={this.handleClick.bind(this)}>
                    <option value="MuzioClementi_SonatinaOpus36No1_Part2.xml">Muzio Clementi: Sonatina Opus 36 No1 Part2</option>
                    <option value="Beethoven_AnDieFerneGeliebte.xml">Beethoven: An Die FerneGeliebte</option>
                    <option value="koko_piano.xml">Kyousougiga: Koko</option>
                </select>
                <OpenSheetMusicDisplay file={this.state.file} />
            </div>
        );
    }
}

export default App;
