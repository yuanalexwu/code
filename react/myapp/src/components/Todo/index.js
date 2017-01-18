import React, {Component} from 'react';
import connectComponent from '../../connectComponent';
import actionTypes from '../../constrant';


// filter link
const VisibleFilter = (props) => {
    const { todosVisibility } = props;
    const handleChange = (visibility) => {
        return (e) => {
            props.todoChangeVisibility(visibility);
        };
    };

    const getFilterLink = (todosVisibility, visibility, text) => {
        return todosVisibility !== visibility ?
            <a href='#' onClick={handleChange(visibility)}>{text}</a> :
            text
    };

    return (
        <div>Show: 
            {getFilterLink(todosVisibility, actionTypes.TODO_SHOW_ALL, 'All')}
            {' '}
            {getFilterLink(todosVisibility, actionTypes.TODO_SHOW_ACTIVE, 'Active')}
            {' '}
            {getFilterLink(todosVisibility, actionTypes.TODO_SHOW_COMPLETED, 'Completed')}
        </div>
    );
};


let todoId = 0;
class Todo extends Component {

    handleToggle = (id) => {
        return (event) => {
            this.props.todoToggle(id);
        };
    };

    handleAdd = () => {
        let text = this.input.value;
        text = text.trim();
        if (text === '') {
            console.log('empty');
            return false;
        }
        this.props.todoAdd(todoId++ , text);
        // 重置form的状态
        this.input.value = '';
    };

    getVisibilityTodos = () => {
        const { todos, todosVisibility } = this.props;
        switch(todosVisibility) {
            case actionTypes.TODO_SHOW_ALL: {
                return todos;
            }
            case actionTypes.TODO_SHOW_ACTIVE: {
                return todos.filter( t => !t.completed);
            }
            case actionTypes.TODO_SHOW_COMPLETED: {
                return todos.filter( t => t.completed);
            }
            default:
                return todos;
        };
    };
    


    render() {
        const { todos } = this.props;
        const visibleTodos = this.getVisibilityTodos(todos);
        console.log(visibleTodos);
        return (
            <div>
                <h2>TODO</h2>
                <input placeholder="请输入待完成任务" ref={input => this.input = input}/>
                <button onClick={this.handleAdd}>ADD TODO</button>
                <ul>
                {
                    visibleTodos.map( todo =>
                        <li key={todo.id} onClick={this.handleToggle(todo.id)}>
                            <span
                                style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
                            >
                                {todo.text}
                            </span>
                        </li>
                    )
                }
                </ul>
                <VisibleFilter {...this.props}/>
            </div>
        );
    }
}


export default connectComponent(Todo);