import ActionTypes from '../../constrant';


const counter = (state = {}, action) => {
    let { num = 0 } = state;
    let new_state;
    switch (action.type) {
        case ActionTypes.COUNTER_INCREMENT: 
            num++;
            new_state = {...state, ...{num}};
            return new_state;
        case ActionTypes.COUNTER_DECREMENT:
            num--;
            new_state = {...state, ...{num}};
            return new_state;
        default:
            return state;
    }
}


export default counter;