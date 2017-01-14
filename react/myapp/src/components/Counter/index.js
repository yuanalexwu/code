import React, { Component } from 'react';
import connectComponent from '../connectComponent';
import './style.css';


class Counter extends Component {
    handleIncrement = () => {
        const { counter } = this.props;
        let { num } = counter;
        const MAX_NUM = 5;
        if (num >= MAX_NUM) {
            console.log('too big');
            return false;
        }
        this.props.counterIncrement();
    };

    handleDecrement = () => {
        const { counter } = this.props;
        let { num } = counter;
        const MIN_NUM = 0;
        if (num <= MIN_NUM) {
            console.log('too small');
            return false;
        }
        this.props.counterDecrement();
    };

    render() {
        const { num } = this.props.counter;
        return (
            <div>
                <div>Counter: {num}</div>
                <button onClick={this.handleIncrement}>+</button>
                &nbsp;
                <button onClick={this.handleDecrement}>-</button>
            </div>
        );
    }
}


export default connectComponent(Counter);