import PropTypes from 'prop-types';
import classNames from '../../lib/classNames';

function NavbarItem({ children }) {
	return (
		<div className={classNames('flex-none p-4 w-1/4')}>
			<div className={classNames('flex flex-row')}>
				{children}
			</div>
		</div>
	);
}

NavbarItem.propTypes = {
	children: PropTypes.node,
};

export default NavbarItem;