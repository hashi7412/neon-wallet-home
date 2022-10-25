import React from 'react'

interface DialogProps {
	children?: any
	onClose: Function,
	w?: string | number
}

const Dialog = ({children, onClose, w}: DialogProps) => {
	return (
		<div className="modal">
			<div className="modal-overlay"></div>
			<div className="modal-container" style={{width: w}}>
				<div style={{ textAlign: 'right' }}>
					<span className="modal-close" onClick={() => onClose()}>&times;</span>
				</div>
				{children}
			</div>
		</div>
	)
}

export default Dialog