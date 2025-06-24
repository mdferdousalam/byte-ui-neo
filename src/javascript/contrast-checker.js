/**
 * Converts a hex color to an RGB object.
 * @param {string} hex - The hex color string (e.g., "#RRGGBB" or "#RGB").
 * @returns {object|null} An object {r, g, b} or null if invalid.
 */
function hexToRgb(hex) {
	let r = 0,
		g = 0,
		b = 0;

	// Handle 3-digit hex
	if (hex.length === 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	}
	// Handle 6-digit hex
	else if (hex.length === 7) {
		r = parseInt(hex.substring(1, 3), 16);
		g = parseInt(hex.substring(3, 5), 16);
		b = parseInt(hex.substring(5, 7), 16);
	} else {
		return null; // Invalid hex format
	}
	return { r, g, b };
}

/**
 * Converts an RGB object to relative luminance.
 * @param {object} rgb - An object {r, g, b}.
 * @returns {number} The relative luminance value.
 */
function getRelativeLuminance({ r, g, b }) {
	const RsRGB = r / 255;
	const GsRGB = g / 255;
	const BsRGB = b / 255;

	const R =
		RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
	const G =
		GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
	const B =
		BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

	return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates the contrast ratio between two colors (luminances).
 * @param {number} L1 - Luminance of the lighter color.
 * @param {number} L2 - Luminance of the darker color.
 * @returns {number} The contrast ratio.
 */
function getContrastRatio(L1, L2) {
	const lighter = Math.max(L1, L2);
	const darker = Math.min(L1, L2);
	return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Adjusts text color based on background luminance to ensure WCAG contrast.
 * @param {string} backgroundColor - The background color (hex, rgb, or color name).
 * @param {string} originalTextColor - The original text color (hex, rgb, or color name).
 * @param {number} threshold - The minimum WCAG contrast ratio (default 4.5).
 * @returns {string} The adjusted text color (either black or white), or original if sufficient.
 */
function adjustTextColorForContrast(
	backgroundColor,
	originalTextColor,
	threshold = 4.5,
) {
	// Attempt to convert colors to RGB. This example only supports hex.
	// For full support (rgb, rgba, named colors), a more robust color parsing library is needed.
	// For now, let's assume direct hex values are passed for background and original text.
	let bgRgb = hexToRgb(backgroundColor);
	if (!bgRgb) {
		console.warn(
			`[Contrast Checker] Could not parse background color: ${backgroundColor}. Skipping contrast check.`,
		);
		return originalTextColor; // Return original if background is unparseable
	}

	const bgLuminance = getRelativeLuminance(bgRgb);

	// Calculate luminance for black and white text
	const blackLuminance = getRelativeLuminance({ r: 0, g: 0, b: 0 }); // Black
	const whiteLuminance = getRelativeLuminance({ r: 255, g: 255, b: 255 }); // White

	const contrastWithBlack = getContrastRatio(bgLuminance, blackLuminance);
	const contrastWithWhite = getContrastRatio(bgLuminance, whiteLuminance);

	// Determine which color (black or white) offers better contrast
	// Prioritize white if both are sufficient, or if white provides significantly better contrast
	if (
		contrastWithWhite >= threshold ||
		(contrastWithWhite > contrastWithBlack && contrastWithBlack < threshold)
	) {
		return '#ffffff'; // Use white
	} else if (
		contrastWithBlack >= threshold ||
		(contrastWithBlack > contrastWithWhite && contrastWithWhite < threshold)
	) {
		return '#000000'; // Use black
	} else {
		// If neither black nor white meets the threshold, this background is problematic.
		// For demonstration, we'll return the color with better contrast, but a real app
		// might force a different background or alert the user.
		return contrastWithWhite > contrastWithBlack ? '#ffffff' : '#000000';
	}
}

// Example Usage (for demonstration, won't run directly on page unless called)
// You might use this in a component or script that applies styles.
// For instance, you could dynamically set --hikma-text-color-base for certain elements.

// console.log("Adjusted text color for primary button:", adjustTextColorForContrast('#007bff', '#ffffff'));
// console.log("Adjusted text color for dark background:", adjustTextColorForContrast('#343a40', '#ffffff'));
// console.log("Adjusted text color for light background:", adjustTextColorForContrast('#f8f9fa', '#212529'));

// Note: To fully integrate this, you'd need to:
// 1. Get actual background colors of elements at runtime.
// 2. Apply the adjusted text color. This might involve setting inline styles or adding a class.
//    For example, you could have a `js-auto-contrast` class, and a script loops through
//    elements with this class, calculates, and applies the color.
// At the end of contrast-checker.js
window.HikmaUI = {
	adjustTextColorForContrast,
	hexToRgb,
	getRelativeLuminance,
	getContrastRatio,
};

// Keep your exports if needed for other modules
export {
	adjustTextColorForContrast,
	hexToRgb,
	getRelativeLuminance,
	getContrastRatio,
};
