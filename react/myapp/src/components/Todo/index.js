import React, {Component} from 'react';
import connectComponent from '../connectComponent';


class Todo extends Component {
    render() {
        const { todos } = this.props;
        console.log(todos);
        return (
            <div>
            TODO
            </div>
        );
    }
}


export default connectComponent(Todo);