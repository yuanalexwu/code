import actionTypes from '../../constrant';


let todoId = 0;
export function todoAdd(text) {
    todoId++;
    return {
        type: actionTypes.TODO_ADD,
        id: todoId, 
        text
    };
}

export function todoToggle(id) {
    return {
        type: actionTypes.TODO_TOGGLE,
        id
    };
}

export function todoChangeVisibility(visibility) {
    return {
        type: actionTypes.TODO_SET_VISIBILITY,
        visibility
    };
}


const todoActions = {
    todoAdd,
    todoToggle,
    todoChangeVisibility,
};
export default todoActions