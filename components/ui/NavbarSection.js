import PropTypes from 'prop-types';
import classNames from '../../lib/classNames';

const SIZE_MAPS = {
	QUARTER: 'w-1/4',
	HALF: 'w-2/4',
	THIRD: 'w-3/4',
	FULL: 'w-full'
};

const POSITION_MAPS = {
	CENTER: 'flex-grow text-center',
	DEFAULT: 'flex-none'	
};

const DIRECTION_MAPS = {
	REVERSE: 'flex flex-row-reverse',
	DEFAULT: 'flex flex-row',
	CENTER: '',
};

function NavbarSection({ children, size, position, direction }) {
	return (
		<div className={classNames(position, size)}>
			<div className={classNames(direction)}>
				{children}
			</div>
		</div>
	);
}

NavbarSection.size = SIZE_MAPS;
NavbarSection.position = POSITION_MAPS;
NavbarSection.direction = DIRECTION_MAPS;

NavbarSection.defaultProps = {
	size: SIZE_MAPS.QUARTER,
	position: POSITION_MAPS.DEFAULT,
	direction: DIRECTION_MAPS.DEFAULT,
};

NavbarSection.propTypes = {
	children: PropTypes.node,
	size: PropTypes.string,
	position: PropTypes.string,
	direction: PropTypes.string,
};

export default NavbarSection;