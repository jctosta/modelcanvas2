import PropTypes from 'prop-types';
import classNames from '../../lib/classNames';
import Button from './Button';
import { XIcon, ReplyIcon } from '@heroicons/react/solid';

const VARIANT_MAPS = {
	PRIMARY: 'color-primary',
	SECONDARY: 'color-secondary',
	DARK: 'color-dark',
	DANGER: 'color-danger',
	INFO: 'color-info',
	WARNING: 'color-warning'
};

function Toast({ children, variant, onClose, onUndo }) {

	return (
		<div className={classNames('mx-4 px-4 py-2 my-1 rounded-md text-sm w-full', variant)}>
			<div className="flex flex-row content-center">
				<div className="flex-grow self-center">
					<p>{children}</p>
				</div>
				<div className="flex-none">
					{onUndo && <Button variant={Button.variant.TRANSPARENT} size={Button.size.SMALL} icon={ReplyIcon} onClick={onUndo}>Undo</Button>}
					<Button variant={Button.variant.TRANSPARENT} size={Button.size.ICON_ONLY} icon={XIcon} onClick={onClose} />
				</div>
			</div>
			
		</div>
	);

}

Toast.variant = VARIANT_MAPS;

Toast.propTypes = {
	children: PropTypes.node,
	variant: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	onUndo: PropTypes.func,
};

export default Toast;