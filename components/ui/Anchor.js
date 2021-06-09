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

const TARGET_MAPS = {
	SELF: '',
	BLANK: '_blank',
};

function Anchor({ children, variant, size, target, download, icon, href }) {
	let Icon = undefined;
	if (icon) {
		Icon = icon;
	}
	return (
		<a href={href} target={target} download={download} className={classNames('w-auto inline-flex items-center text-base leading-6 font-normal border border-transparent rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors duration-200', variant, size)}>
			{icon && <Icon className="h-5 w-5" />}
			<span>{children}</span>
		</a>
	);
}

Anchor.variant = VARIANT_MAPS;
Anchor.size = SIZE_MAPS;
Anchor.target = TARGET_MAPS;

Anchor.propTypes = {
	children: PropTypes.node,
	variant: PropTypes.string.isRequired,
	size: PropTypes.string,
	target: PropTypes.string,
	icon: PropTypes.element,
	href: PropTypes.string,
	download: PropTypes.string,
};

Anchor.defaultProps = {
	size: SIZE_MAPS.DEFAULT,
	target: TARGET_MAPS.SELF,
};

export default Anchor;