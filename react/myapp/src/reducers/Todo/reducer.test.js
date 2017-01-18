import todos from './reducer';
import ActionTypes from './constrant';


describe('Todo reducer', () => {
    it('origin todo', () => {
        const beforeState = [];
        const afterState = [];
        expect(todos(beforeState, {type: ''})).toEqual(afterState);
    });
    it('add todo', () => {
        const beforeState = [];
        const todo = {id: 0, text: 'Learn Redux', completed: false}
        const afterState = [todo];
        expect(todos(beforeState, {type: ActionTypes.TODO_ADD, todo})).toEqual(afterState);
    });
    it('removes todo', () => {
        let before,
            after;
        before = [{id: 0, text: 'Learn Redux', completed: false}];
        after = [];
        expect(todos(before, {type: ActionTypes.TODO_REMOVE, id: 0})).toEqual(after);
        before = [];
        after = [];
        expect(todos(before, {type: ActionTypes.TODO_REMOVE, id: 0})).toEqual(after);
    });
    it('toggle todo', () => {
        const before = [
            {id: 0, text: 'Learn Redux', completed: false},
            {id: 1, text: 'Go Shopping', completed: false},
            ];
        const after = [
            {id: 0, text: 'Learn Redux', completed: false},
            {id: 1, text: 'Go Shopping', completed: true},
            ];
        expect(todos(before, {type: ActionTypes.TODO_TOGGLE, id: 1})).toEqual(after);
    });
});
