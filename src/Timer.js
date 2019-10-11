import React, { Component } from 'react';
import './Timer.css'
import TimerLengthControl from './TimerLengthControl'
import { clearTimeout } from 'timers';


const  accurateInterval = function (fn, time){
    var cancel, nextAt, timeout, wrapper;
    timeout = null;
    nextAt = new Date().getTime() + time;
    wrapper = function () {
        //get original time each time the function is called
        nextAt += time;
        //so that the function becomes recursive
        timeout = setTimeout(wrapper, nextAt - new Date().getTime())
        
        return fn()
    };
    cancel = function () {
        return window.clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt- new Date().getTime());
    return{
        cancel: cancel
    }
}


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

    setSeshLength = (e) => {
        this.lengthControl(
            'seshLength',
            e.currentTarget.value,
            this.state.seshLength,
            'Break'
        )
    }

    lengthControl = (
        stateToChange,
        sign,
        currentLength, //currentLength of the state to change
        timerType
    ) => {
        //tackles break length
        if(this.state.timerType == timerType){
            if(sign == '-' && currentLength != 1){
                this.setState({[stateToChange]: currentLength - 1});
            }else if(sign == '+' && currentLength != 60){
                this.setState({[stateToChange]: currentLength + 1})
            } 
        } else{//tackles session length
            if(sign == '-' && currentLength != 1){
                this.setState({
                    [stateToChange]: currentLength - 1,
                    timer: currentLength * 60 - 60 //for active session
                })
            } else if(sign = '+' && currentLength != 60){
                this.setState({
                    [stateToChange]: currentLength + 1,
                    timer: currentLength * 60 + 60
                })
            }
        } 
    }

    activeSession = () => {
        let minutes = Math.floor(this.state.timer / 60 ); // convert to minutes
        let seconds = this.state.timer - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds; //so that two digits are always present
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    }

    play = () => {
        if(this.state.timerState == 'stopped'){
            this.beginCountDown();
            this.setState({timerState: 'running'})
        }
    }

    



    beginCountDown = () => {
        this.setState({
            intervalID: accurateInterval(() => {
                this.decrementTimer();
            }, 1000)
        })
    }

   

    decrementTimer = () => {
        this.setState({ timer: this.state.timer - 1})
    }

    pause = () => {
        if(this.state.timerState == 'running'){
            this.setState({timerState: 'stopped'});
            this.state.intervalID && this.state.intervalID.cancel()//i dont understand you
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
                        clicked={this.setSeshLength}/>
                </section>
                <div className='timer'>
                    <div className='timer__wrapper'>
                        <div id='timer__label'>{this.state.timerType}</div>
                        <div id='time__left'>{this.activeSession()}</div>
                    </div>
                </div>
                <div className='timer__control'>
                        <i className="fa fa-play" onClick = {this.play}></i>
                        <i className="fa fa-pause" onClick = {this.pause}></i>
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
