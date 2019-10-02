import React, { Component } from 'react';
import './Timer.css'
import TimerLengthControl from './TimerLengthControl'

class Timer extends Component {

    state = {
        breakLength: {
            titleID: 'break-label',
            minID: 'break-decrement',
            addID: 'break-increment',
            lengthID: 'break-length',
            title: 'Break Length',
        },
        sessionLength: {
            titleID: 'session-label',
            minID: 'session-decrement',
            addID: 'session-increment',
            lengthID: 'session-length',
            title: 'Session Length',
        },
        brkLength: 5,
        seshLength: 25,
        timerState: 'stopped',
        timerType: 'Session',
        timer: 1500,
        intervalID: '',
        alarmColor: { color: 'white' }
    };


    setBrkLength = (e) => {
        this.lengthControl(
            'brkLength',
            e.currentTarget.value,
            this.state.brkLength,
            'Session'
        )
    }

    lengthControl = (
        stateToChange,
        sign,
        currentLength,
        timerType // not yet clear on what this is
    ) => {
        if(this.state.timerType == timerType){
            if(sign == '-' && currentLength !=1){
                this.setState({[stateToChange]: currentLength - 1});
            }else if(sign == '+' && currentLength != 60){
                this.setState({[stateToChange]: currentLength + 1})
            } 
        }
    }





    render() {
        return (
            <div className="Timer">
                <div className="main_title">Pomodoro Clock</div>
                <section>
                    <TimerLengthControl 
                        props={this.state.breakLength}  
                        currentTime= {this.state.brkLength}
                        clicked={this.setBrkLength}/>
                    <TimerLengthControl 
                        props={this.state.sessionLength} 
                        currentTime= {this.state.seshLength}
                        />
                </section>
                <div className='timer'>
                    <div className='timer__wrapper'>
                        <div id='timer__label'>{this.state.timerType}</div>
                        <div id='time__left'>{this.state.seshLength}</div>
                    </div>
                </div>
                <div className='timer__control'>
                        <i className="fa fa-play"></i>
                        <i className="fa fa-pause"></i>
                        <i className="fa fa-repeat" aria-hidden="true"></i>
                </div>
                <div className='author'>
                    Designed and coded by
                    <a href='#'> Obodo David</a>
                </div>
                <audio id='beep' src=''> </audio>
            </div>
        );
    }
}

export default Timer;
