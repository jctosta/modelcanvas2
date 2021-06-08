import PropTypes from 'prop-types';
import classNames from '../../lib/classNames';

const VARIANT_MAPS = {
	PRIMARY: 'btn-primary',
	SECONDARY: 'btn-secondary',
	DARK: 'btn-dark',
	DANGER: 'btn-danger',
	WARNING: 'btn-warning',
	INFO: 'btn-info',
	TRANSPARENT: 'btn-transparent'
};

const SIZE_MAPS = {
	SMALL: 'btn-small',
	DEFAULT: 'btn-default',
	LARGE: 'btn-large',
	ICON_ONLY: 'btn-icon-only'
};

function Button({ children, variant, size, icon, onClick }) {

	let Icon = undefined;
	if (icon) {
		Icon = icon;
	}
	return (
		<button className={classNames('w-auto inline-flex items-center text-base leading-6 font-normal border border-transparent rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors duration-200', variant, size)} onClick={onClick}>
			{icon && <Icon className="h-5 w-5" />}
			<span>{children}</span>
		</button>
	);	
}

Button.variant = VARIANT_MAPS;
Button.size = SIZE_MAPS;

Button.propTypes = {
	children: PropTypes.node,
	variant: PropTypes.string.isRequired,
	size: PropTypes.string,
	icon: PropTypes.element,
	onClick: PropTypes.func,
};

Button.defaultProps = {
	size: SIZE_MAPS.DEFAULT,
};

export default Button;