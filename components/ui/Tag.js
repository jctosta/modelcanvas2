import PropTypes from 'prop-types';
import classNames from '../../lib/classNames';

const VARIANT_MAPS = {
	PRIMARY: 'color-primary',
	SECONDARY: 'color-secondary',
	DARK: 'color-dark',
	DANGER: 'color-danger',
	INFO: 'color-info',
	WARNING: 'color-warning'
};

function Tag({ children, variant }) {

	return (
		<p className={classNames('px-2 py-1 my-1 rounded-md text-sm', variant)}>{children}</p>
	);

}

Tag.variant = VARIANT_MAPS;

Tag.propTypes = {
	children: PropTypes.node,
	variant: PropTypes.string.isRequired,
};

export default Tag;