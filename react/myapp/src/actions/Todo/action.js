import actionTypes from '../../constrant';


export function todoAdd(id, text) {
    return {
        type: actionTypes.TODO_ADD,
        id,
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