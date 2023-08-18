import React from "react";
import "./Modal.css";
const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="modal-container">
			<div className="modal-content">{children}</div>
			<div className="modal-button-container">
				<button className="modal-button" onClick={onClose}>
					확인
				</button>
			</div>
		</div>
	);
};

export default Modal;
