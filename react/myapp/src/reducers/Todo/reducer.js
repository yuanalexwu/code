import ActionTypes from '../../constrant';


// single todo reducer
const todo = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.TODO_ADD:
        {
            const { id, text } = action;
            return {
                id,
                text,
                completed: false
            };
        }
        case ActionTypes.TODO_TOGGLE:
        {
            return {...state, ...{completed: !state.completed}};
        }
        default:
            return state;
    }
};


// todos reducer
const todos = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.TODO_ADD:
        {
            return [...state, todo(undefined, action)];
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



// set visibility
export function todosVisibility(state = ActionTypes.TODO_SHOW_ALL, action) {
    switch(action.type) {
        case ActionTypes.TODO_SET_VISIBILITY:{
            const { visibility } = action;
            return visibility;
        }
        default: {
            return state;
        }
    }
}


export default todos;