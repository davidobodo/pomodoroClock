import React, { Component } from 'react'

class Control extends Component {



    render() {
        return (
            <div className='length-control'>
                <div id={this.props.props.titleID} className='lengthHeader'>{this.props.props.title}</div>
                <button onClick={this.props.clicked} value='-'>
                    <i className="fa fa-arrow-down btn-level"></i>
                </button>
                <div id={this.props.props.lengthID} className='lengthNumber btn-level'>{this.props.currentTime}</div>
                <button onClick={this.props.clicked} value='+'>
                    <i className="fa fa-arrow-up"></i>
                </button>
            </div>
        )

    }
}

export default Control