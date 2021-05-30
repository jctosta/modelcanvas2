import PropTypes from 'prop-types';

export default function Button({ children, category, onClick, size, type }) {

	let color = undefined;

	switch (category) {
	case 'primary':
		color = 'btn-primary';
		break;
	case 'secondary':
		color = 'btn-secondary';
		break;
	case 'dark':
		color = 'btn-dark';
		break;
	default:
		color = 'btn-secondary';
		break;
	}

	let sizeClasses = undefined;

	switch (size) {
	case 'sm':
		sizeClasses = '';
		break;
	case 'md':
		sizeClasses = '';
		break;
	case 'lg':
		sizeClasses = '';
		break;
	default:
		sizeClasses = '';
		break;
	}

	return (
		<button 			
			type={type}
			className={`w-auto flex-none text-base leading-6 font-normal py-2 px-6 border border-transparent rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors duration-200 ${color}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node,
	category: PropTypes.oneOf(['primary', 'secondary', 'warning', 'danger', 'info', 'link', 'text', 'dark']),
	onClick: PropTypes.func,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

