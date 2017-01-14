import React from 'react';


const Info = (user, {message}) => {
	const handleChange = prop => {
		return e => {
			const { value } = e.target;
			user[ prop ] = value;
		};
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(user);
		console.log(this.context);
	};

	return (
		<form>
			<div className="inputWrapper">
				<input type="text" onChange={handleChange('name')} value={user.name} placeholder="请输入姓名"/>
				<select onChange={handleChange('order')} value={user.order}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
				</select>
				<button type="submit" onClick={handleSubmit}>Click me</button>
			</div>
		</form>
	);
};
Info.contextTypes = {
	store: React.PropTypes.string
};
Info.propTypes = {
    user: React.PropTypes.object.isRequired
}


export default Info;