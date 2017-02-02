import * as ActionTypes from './CommonActionTypes';


// 显示提示信息
export function commonUpdateSnackBar(snackBar) {
	return {
		type: ActionTypes.COMMON_UPDATE_SNACK_BAR,
		snackBar
	};
}


// 显示加载信息
export function commonUpdateLoading(showLoadingMask) {
	return {
		type: ActionTypes.COMMON_UPDATE_LOADING,
		showLoadingMask
	};
}

const commonAction = {
	commonUpdateSnackBar,
	commonUpdateLoading
};
export default commonAction;