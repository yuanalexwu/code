import React, {Component} from 'react';
import connectComponent from '../../connectComponent';
import actionTypes from '../../constrant';
import './style.css';


const AddTodo = connectComponent((props) => {
    let inputNode;
    const handleAdd = () => {
        let text = inputNode.value;
        text = text.trim();
        if (text === '') {
            console.log('empty');
            return false;
        }
        props.todoAdd(text);
        // 重置form的状态
        inputNode.value = '';
    };

    console.log('AddTodo');
    return (
        <div style={{textAlign: 'center'}}>
            <input placeholder="请输入待完成任务" ref={node => inputNode = node}/>
            <button onClick={handleAdd}>ADD TODO</button>
        </div>
    );
});


// todo list
const TodoList = connectComponent((props) => {
    const getVisibilityTodos = () => {
        const { todos, todosVisibility } = props;
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
                // eslint-disable-next-line
        };
    };
    const filteredTodos = getVisibilityTodos();
    console.log('TodoList', filteredTodos);

    const handleToggle = id => (event) => {
        props.todoToggle(id);
    };

    return (
        <ul>
        {
            filteredTodos.map(todo => 
                <li key={todo.id} onClick={handleToggle(todo.id)} className="todo_list_li">
                    <span
                        style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
                    >
                        {todo.text}
                    </span>
                </li>
            )
        }
        </ul>
    );
});


// filter link
const FilterLink = connectComponent((props) => {
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
    console.log('FilterLink');
    console.log('');

    return (
        <div style={{textAlign: 'center'}}>Show: 
            {getFilterLink(todosVisibility, actionTypes.TODO_SHOW_ALL, 'All')}
            {' '}
            {getFilterLink(todosVisibility, actionTypes.TODO_SHOW_ACTIVE, 'Active')}
            {' '}
            {getFilterLink(todosVisibility, actionTypes.TODO_SHOW_COMPLETED, 'Completed')}
        </div>
    );
});


class Todo extends Component {
    render() {
        console.log('Todo');
        return (
            <div>
                <h2 style={{textAlign: 'center'}}>TODO</h2>
                <AddTodo />
                <TodoList />
                <FilterLink />
            </div>
        );
    }
}


export default Todo;