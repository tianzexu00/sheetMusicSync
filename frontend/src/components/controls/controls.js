import React, { Component } from 'react';
import { Button, PlayerIcon } from 'react-player-controls';

class Controls extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const PlayButton = props => <Button {...props}><PlayerIcon.Play width={32} height={32} style={{ marginRight: 32 }}/></Button>
        const PauseButton = props => <Button {...props}><PlayerIcon.Pause width={32} height={32} style={{ marginRight: 32 }}/></Button>

        return (
            <div>
                <PlayButton onClick={this.props.play.bind(this)}></PlayButton>
                <PauseButton onClick={this.props.pause.bind(this)}></PauseButton>
            </div>
        );
    }
}

export default Controls;
