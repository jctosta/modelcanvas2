import PropTypes from 'prop-types';
import classNames from '../../lib/classNames';

function Navbar({ children }) {
	return (
		<nav className={classNames('flex-none fixed w-full z-10')}>
			<div className={classNames('flex flex-row items-center bg-sepia-50 dark:bg-steel-800 w-full border-b-2 border-gray-900 border-opacity-10 bg-opacity-80 h-14')}>
				{children}
			</div>
		</nav>
	);
}

Navbar.propTypes = {
	children: PropTypes.node,
};

export default Navbar;