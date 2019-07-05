import React, { Component } from 'react';
import { OpenSheetMusicDisplay as OSMD, Fraction } from 'opensheetmusicdisplay';

class OpenSheetMusicDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = { dataReady: false };
        this.osmd = undefined;
        this.divRef = React.createRef();

        this.lengthsLast = [];
    }

    setupOsmd() {
        const options = {
            autoResize: this.props.autoResize ? this.props.autoResize : true,
            drawTitle: this.props.drawTitle ? this.props.drawTitle : true,
        }
        this.osmd = new OSMD(this.divRef.current, options);
        this.osmd.load(this.props.file).then(() => {
            this.osmd.render();
            // this.play();
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.drawTitle !== prevProps.drawTitle) {
            this.setupOsmd();
        } else {
            this.osmd.load(this.props.file).then(() => {
                this.osmd.render();
                // this.play();
            });
        }

        if(this.props.play){
            this.play();
        }
    }

    // Called after render
    componentDidMount() {
        this.setupOsmd();
    }

    render() {
        return (<div ref={this.divRef} />);
    }



    getVoicesUnderCursor() {
        return this.osmd.cursor.Iterator.CurrentVisibleVoiceEntries().filter((voiceEntry) => !voiceEntry.isGrace)
    }

    getNotesUnderCursor() {
        const voiceEntries = this.getVoicesUnderCursor();
        const notes = [];
        voiceEntries.forEach(voiceEntry => {
            notes.push(...voiceEntry.Notes);
        });

        return notes;
    }

    getTimeout() {
        return new Promise(
            (resolve, reject) => {
                const lengths = this.getNotesUnderCursor().map((note) => note.length).concat(this.lengthsLast);
                const lengthShortest = lengths.reduce((prev, curr) => prev.lt(curr) ? prev : curr);
                this.lengthsLast = lengths.filter((length) => length > lengthShortest);
                this.lengthsLast = this.lengthsLast.map((length) => Fraction.minus(length, lengthShortest));
                const wholeNoteTime = 3000;
                const timeout = lengthShortest.realValue * wholeNoteTime;
                resolve(timeout);
            }
        )
    }

    cursorRNext() {
        this.getTimeout().then(
            (timeout) => {
                setTimeout(() => {
                    const cursor = this.osmd.cursor;
                    cursor.next();
                    this.cursorRNext(timeout);
                }, timeout);
            }
        )
    }

    play(startTime, bpm) {
        let cursor = this.osmd.cursor;
        cursor.show();
        this.cursorRNext();
    }
}

export default OpenSheetMusicDisplay;
