import ActionTypes from '../../constrant';


export function counterIncrement() {
    return {type: ActionTypes.COUNTER_INCREMENT};
}

export function counterDecrement () {
    return {type: ActionTypes.COUNTER_DECREMENT};
}


const counterActions = {
    counterIncrement,
    counterDecrement
};


export default counterActions;