import * as ActionTypes from './CommonActionTypes';


function common(state = {}, action = {}) {
	switch (action.type) {
		// 提示信息
		case ActionTypes.COMMON_UPDATE_SNACK_BAR:
			state.snackBar = { ...state.snackBar, ...action.snackBar };
			return { ...state };

		// 显示加载
		case ActionTypes.COMMON_UPDATE_LOADING:
			var { showLoadingMask } = action;
			state.showLoadingMask = showLoadingMask;
			return { ...state };

		default:
			return state;
	}
}


export default common;