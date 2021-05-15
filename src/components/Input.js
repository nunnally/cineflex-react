import React from 'react';

const Input = ({ label, placeholder, data }) => {
	return (
		<div className='data-input'>
			<label>{label}</label>
			<input
				placeholder={placeholder}
				value={data[0]}
				onChange={(e) => data[1](e.target.value)}
			></input>
		</div>
	);
};

export default Input;