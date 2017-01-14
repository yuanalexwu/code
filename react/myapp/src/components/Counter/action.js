import ActionTypes from './constrant';


export function counterIncrement() {
    return {type: ActionTypes.COUNTER_INCREMENT};
}

export function counterDecrement () {
    return {type: ActionTypes.COUNTER_DECREMENT};
}


const counterAction = {
    counterIncrement,
    counterDecrement
};


export default counterAction;