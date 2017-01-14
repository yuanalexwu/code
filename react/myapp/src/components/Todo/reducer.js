import ActionTypes from './constrant';


// todos reducer
const todos = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.TODO_ADD:
        {
            const { todo: newTodo } = action;
            return [...state, todo(newTodo, action)];
        }
        case ActionTypes.TODO_TOGGLE:
        {
            const { id } = action;
            return state.map(
                currentTodo => currentTodo.id === id ?
                todo(currentTodo, action) :
                currentTodo
                );
        }
        case ActionTypes.TODO_REMOVE:
        {
            const { id } = action;
            return state.filter( todo => !todo.id === id);
        }
        default:
            return state;
    }
};

// single todo reducer
const todo = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.TODO_ADD:
        {
            return state;
        }
        case ActionTypes.TODO_TOGGLE:
        {
            return {...state, ...{completed: !state.completed}};
        }
        default:
            return state;
    }
};


// todos filter
const visibilityFilter = (state = ActionTypes.TODO_SHOW_ALL, action) => {
    switch(action.type) {
        case ActionTypes.TODO_SET_VISIBILITY:
            return action.filter;
        default:
            return state;
    }
};


export default todos;