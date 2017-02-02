/**
 * Created by jack on 2016/11/10.
 */
import React, {Component, PropTypes} from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';


class AddressUserSelection extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		/* 显示或者隐藏组件 */
		hide: PropTypes.bool.isRequired,
		/* 用户可选则的地址列表 */
		addressList: PropTypes.array.isRequired,
		/* 用户选择的地址信息 */
		selectedAddress: PropTypes.object.isRequired,
		/* 更新组件信息 */
		handleUpdateProps: PropTypes.func.isRequired,
	};

	static defaultProps = {
		hide: false,
		addressList: [],
		selectedAddress: {},
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (Immutable.fromJS(nextProps).equals(Immutable.fromJS(this.props))) {
			return false;
		}
		return true;
	}

	renderSelection = (addressList) => {
		let address_list = addressList.map((address) => {
			return <MenuItem key={address.Id} value={address.name} primaryText={address.name}/>
		});

		const default_item = <MenuItem key="-1" value="请选择自提点" primaryText="请选择自提点"/>;
		return _.concat(default_item, address_list);
	};

	/**
	 * 获取选择地址的名字
	 * @param addressName
	 * @returns {{addressName: *, showAppendName: boolean}}
	 */
	parseAddressName = (addressName) => {
		const defaultSelectionAddressName = '请选择自提点';
		const { addressList } = this.props;
		let showAppendName = false; // 是否显示送货上门详细用户地址
		let selectionAddressName; // 自提点select的值

		if (addressName == defaultSelectionAddressName) {
			selectionAddressName = defaultSelectionAddressName;
			return { selectionAddressName, showAppendName };
		}

		let selectionAddressDeliver; // 送货上门选项
		let selectionAddress;
		for (let i = 0; i < addressList.length; i++) {
			selectionAddress = addressList[ i ];
			if (addressName == selectionAddress.name) {
				if (selectionAddressName == undefined) {
					selectionAddressName = addressName;
					// 送货上门商品显示详细地址
					if (selectionAddress.ship_free != '0') {
						showAppendName = true;
					}
				}
			}
			if (selectionAddress.ship_free != '0') {
				if (selectionAddressDeliver == undefined) {
					selectionAddressDeliver = selectionAddress;
				}
			}
		}

		// 不在默认地址中
		if (selectionAddressName == undefined) {
			if (selectionAddressDeliver == undefined) {
				selectionAddressName = defaultSelectionAddressName;
			} else {
				selectionAddressName = selectionAddressDeliver.name;
				showAppendName = true;
			}
		}
		return { selectionAddressName, showAppendName };
	};

	handleChangeAddressDetail = (type, event, value) => {
		value = _.trim(value);
		const data = {};
		data[ type ] = value;
		this.props.handleUpdateProps(data);
		// store.dispatch(addressUserAction.addressUserUpdateSelectedAddress(data));
	};

	handleChangeAddress = (event, idx, value) => {
		value = _.trim(value);
		this.props.handleUpdateProps({ consignee_address: value });
		// store.dispatch(addressUserAction.addressUserUpdateSelectedAddress({ consignee_address: value }));
	};

	render() {
		let { hide, addressList, selectedAddress } = this.props;
		let { consignee_name='', consignee_mobile='', consignee_address='' } = selectedAddress;
		let ComponentStyle = {};
		if (hide) {
			ComponentStyle.display = 'none';
		}

		const renderSelectionHtml = this.renderSelection(addressList);
		const parsedObj = this.parseAddressName(consignee_address);
		let selectionAddressName;
		let addressDetailStyle = { width: '100%' };
		selectionAddressName = parsedObj.selectionAddressName;
		if (!parsedObj.showAppendName) {
			addressDetailStyle.display = 'none';
		}
		if (consignee_address.split('送货上门').length >= 2) {
			consignee_address = '';
		}

		return (
			<div style={ComponentStyle}>
				<TextField hintText="收货人" style={{width: '100%'}}
						   value={consignee_name} onChange={this.handleChangeAddressDetail.bind(this, 'consignee_name')}/>
				<TextField hintText="联系电话" style={{width: '100%'}}
						   value={consignee_mobile} onChange={this.handleChangeAddressDetail.bind(this, 'consignee_mobile')}/>
				<SelectField fullWidth={true} value={selectionAddressName} onChange={this.handleChangeAddress}>
					{renderSelectionHtml}
				</SelectField>
				<TextField hintText="详细地址" style={addressDetailStyle}
						   value={consignee_address} onChange={this.handleChangeAddressDetail.bind(this, 'consignee_address')}/>
			</div>
		);
	}
}


export default AddressUserSelection;
