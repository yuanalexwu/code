import counterActions from './Counter/action';
import todoActions from './Todo/action';


const mainAction = {
    ...counterActions,
    ...todoActions
};


export default mainAction;