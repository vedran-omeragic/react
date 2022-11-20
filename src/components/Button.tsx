import React from 'react';

interface ButtonProps {
	onClick: any;
	children: React.ReactNode;
	disabled?: boolean;
}

const Button = (props: ButtonProps) => {
	const { onClick, children, disabled = false } = props;

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
