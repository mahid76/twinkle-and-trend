// src/components/layout/DisableRightClick.jsx
import { useEffect } from "react";

const DisableRightClick = () => {
	useEffect(() => {
		// Disable right click ONLY on images
		const handleContextMenu = (e) => {
			if (e.target.tagName === "IMG") {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		// Disable drag on images
		const handleDragStart = (e) => {
			if (e.target.tagName === "IMG") {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		// Disable drag drop on images
		const handleDrag = (e) => {
			if (e.target.tagName === "IMG") {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		// Disable selection on images
		const handleSelectStart = (e) => {
			if (e.target.tagName === "IMG") {
				e.preventDefault();
			}
		};

		// Add event listeners
		document.addEventListener("contextmenu", handleContextMenu);
		document.addEventListener("dragstart", handleDragStart);
		document.addEventListener("drag", handleDrag);
		document.addEventListener("selectstart", handleSelectStart);

		// Remove event listeners on unmount
		return () => {
			document.removeEventListener("contextmenu", handleContextMenu);
			document.removeEventListener("dragstart", handleDragStart);
			document.removeEventListener("drag", handleDrag);
			document.removeEventListener("selectstart", handleSelectStart);
		};
	}, []);

	return null;
};

export default DisableRightClick;