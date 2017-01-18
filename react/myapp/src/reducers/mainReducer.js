import counter from './Counter/reducer';
import todos, {todosVisibility} from './Todo/reducer';


const mainReducer = {
    counter,
    todos,
    todosVisibility,
};


export default mainReducer;