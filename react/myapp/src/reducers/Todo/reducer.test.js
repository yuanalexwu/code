import todos, { todosVisibility } from './reducer';
import actionTypes from '../../constrant';


describe('Todo reducer', () => {
    it('origin todo', () => {
        const beforeState = [];
        const afterState = [];
        expect(todos(beforeState, {type: ''})).toEqual(afterState);
    });
    it('add todo', () => {
        const beforeState = [];
        const todo = {id: 0, text: 'Learn Redux', completed: false}
        const { id, text }= todo;
        const afterState = [todo];
        expect(todos(beforeState, {type: actionTypes.TODO_ADD, id, text})).toEqual(afterState);
    });
    it('removes todo', () => {
        let before,
            after;
        before = [{id: 0, text: 'Learn Redux', completed: false}];
        after = [];
        expect(todos(before, {type: actionTypes.TODO_REMOVE, id: 0})).toEqual(after);
        before = [];
        after = [];
        expect(todos(before, {type: actionTypes.TODO_REMOVE, id: 0})).toEqual(after);
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
        expect(todos(before, {type: actionTypes.TODO_TOGGLE, id: 1})).toEqual(after);
    });
});



describe('todosVisibility reducer', () => {
    it('update todos visibility', () => {
        const before = actionTypes.TODO_SHOW_ALL;
        const action = {type: actionTypes.TODO_SET_VISIBILITY, visibility: actionTypes.TODO_SHOW_ACTIVE};
        const after = actionTypes.TODO_SHOW_ACTIVE;
        expect(todosVisibility(before, action)).toBe(after);
    });
});