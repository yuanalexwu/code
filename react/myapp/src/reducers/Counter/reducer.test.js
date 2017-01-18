import counter from './reducer';
import ActionTypes from './constrant';


describe('Counter reducer', () => {
    it('origin counter', () => {
        const beforeState = {num: 0};
        const afterState = {num: 0};
        expect(counter(beforeState, {type: ''})).toEqual(afterState);
    });
    it('increment counter', () => {
        let beforeState,
            afterState;
        beforeState = {num: 0};
        afterState = {num: 1};
        expect(counter(beforeState, {type: ActionTypes.COUNTER_INCREMENT})).toEqual(afterState);
        beforeState = {num: 1};
        afterState = {num: 2};
        expect(counter(beforeState, {type: ActionTypes.COUNTER_INCREMENT})).toEqual(afterState);
        beforeState = {num: undefined};
        afterState = {num: 1};
        expect(counter(beforeState, {type: ActionTypes.COUNTER_INCREMENT})).toEqual(afterState);
    });
    it('decrement counter', () => {
        let beforeState,
            afterState;
        beforeState = {num: 2};
        afterState = {num: 1};
        expect(counter(beforeState, {type: ActionTypes.COUNTER_DECREMENT})).toEqual(afterState);
        beforeState = {num: 0};
        afterState = {num: -1};
        expect(counter(beforeState, {type: ActionTypes.COUNTER_DECREMENT})).toEqual(afterState);
        beforeState = {num: null};
        afterState = {num: -1};
        expect(counter(beforeState, {type: ActionTypes.COUNTER_DECREMENT})).toEqual(afterState);
        beforeState = {num: undefined};
        afterState = {num: -1};
        expect(counter(beforeState, {type: ActionTypes.COUNTER_DECREMENT})).toEqual(afterState);
    });
    it('undefined state counter', () => {
        const beforeState = {num: undefined};
        const afterState = {num: undefined};
        expect(counter(beforeState, {type: ''})).toEqual(afterState);
    });
});