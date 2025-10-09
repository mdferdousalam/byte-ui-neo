/**
 * AI-Powered Color System Generator
 * Automatically generates accessible color palettes with WCAG compliance
 */

class AIColorGenerator {
	constructor() {
		this.contrastRatios = {
			AA: 4.5,
			AAA: 7,
			'AA-large': 3,
			'AAA-large': 4.5,
		};
	}

	/**
	 * Generate a complete color palette from a base color
	 * @param {string} baseColor - Hex color string
	 * @param {Object} options - Configuration options
	 * @returns {Object} Complete color palette
	 */
	generatePalette(baseColor, options = {}) {
		const {
			accessibility = 'AA',
			harmony = 'complementary',
			steps = 11,
			includeSemantics = true,
		} = options;

		const palette = {
			primary: this.generateColorScale(baseColor, steps),
			secondary: null,
			accent: null,
			neutral: this.generateNeutralScale(),
			semantic: {},
		};

		// Generate harmonious colors
		if (harmony === 'complementary') {
			palette.secondary = this.generateColorScale(
				this.getComplementaryColor(baseColor),
				steps,
			);
		} else if (harmony === 'triadic') {
			const triadicColors = this.getTriadicColors(baseColor);
			palette.secondary = this.generateColorScale(triadicColors[0], steps);
			palette.accent = this.generateColorScale(triadicColors[1], steps);
		} else if (harmony === 'analogous') {
			const analogousColors = this.getAnalogousColors(baseColor);
			palette.secondary = this.generateColorScale(analogousColors[0], steps);
			palette.accent = this.generateColorScale(analogousColors[1], steps);
		}

		// Generate semantic colors
		if (includeSemantics) {
			palette.semantic = {
				success: this.generateColorScale('#10b981', steps),
				warning: this.generateColorScale('#f59e0b', steps),
				error: this.generateColorScale('#ef4444', steps),
				info: this.generateColorScale(baseColor, steps),
			};
		}

		// Ensure accessibility compliance
		return this.ensureAccessibility(palette, accessibility);
	}

	/**
	 * Generate a color scale from a base color
	 * @param {string} baseColor - Hex color string
	 * @param {number} steps - Number of color steps
	 * @returns {Object} Color scale object
	 */
	generateColorScale(baseColor, steps = 11) {
		const hsl = this.hexToHsl(baseColor);
		const scale = {};

		const stepNames = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

		for (let i = 0; i < steps; i++) {
			const stepName = stepNames[i];
			let lightness;

			if (i < 5) {
				// Lighter shades (50-400)
				lightness = 95 - i * 15;
			} else if (i === 5) {
				// Base color (500)
				lightness = hsl.l;
			} else {
				// Darker shades (600-950)
				lightness = hsl.l - (i - 5) * 10;
			}

			// Adjust saturation for better color harmony
			let saturation = hsl.s;
			if (lightness > 90) {
				saturation = Math.max(hsl.s * 0.3, 10); // Reduce saturation for very light colors
			} else if (lightness < 20) {
				saturation = Math.max(hsl.s * 0.7, 20); // Reduce saturation for very dark colors
			}

			scale[stepName] = this.hslToHex({
				h: hsl.h,
				s: Math.max(0, Math.min(100, saturation)),
				l: Math.max(0, Math.min(100, lightness)),
			});
		}

		return scale;
	}

	/**
	 * Generate neutral color scale
	 * @returns {Object} Neutral color scale
	 */
	generateNeutralScale() {
		const neutralBase = { h: 220, s: 14, l: 50 }; // Cool gray base
		const scale = {};
		const stepNames = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
		const lightnesses = [98, 96, 91, 83, 64, 50, 42, 33, 18, 9, 4];

		stepNames.forEach((step, i) => {
			scale[step] = this.hslToHex({
				h: neutralBase.h,
				s: neutralBase.s,
				l: lightnesses[i],
			});
		});

		return scale;
	}

	/**
	 * Get complementary color
	 * @param {string} hexColor - Base hex color
	 * @returns {string} Complementary hex color
	 */
	getComplementaryColor(hexColor) {
		const hsl = this.hexToHsl(hexColor);
		return this.hslToHex({
			h: (hsl.h + 180) % 360,
			s: hsl.s,
			l: hsl.l,
		});
	}

	/**
	 * Get triadic colors
	 * @param {string} hexColor - Base hex color
	 * @returns {Array} Array of triadic hex colors
	 */
	getTriadicColors(hexColor) {
		const hsl = this.hexToHsl(hexColor);
		return [
			this.hslToHex({ h: (hsl.h + 120) % 360, s: hsl.s, l: hsl.l }),
			this.hslToHex({ h: (hsl.h + 240) % 360, s: hsl.s, l: hsl.l }),
		];
	}

	/**
	 * Get analogous colors
	 * @param {string} hexColor - Base hex color
	 * @returns {Array} Array of analogous hex colors
	 */
	getAnalogousColors(hexColor) {
		const hsl = this.hexToHsl(hexColor);
		return [
			this.hslToHex({ h: (hsl.h + 30) % 360, s: hsl.s, l: hsl.l }),
			this.hslToHex({ h: (hsl.h - 30 + 360) % 360, s: hsl.s, l: hsl.l }),
		];
	}

	/**
	 * Ensure accessibility compliance for the entire palette
	 * @param {Object} palette - Color palette object
	 * @param {string} level - Accessibility level (AA, AAA)
	 * @returns {Object} Accessibility-compliant palette
	 */
	ensureAccessibility(palette, level = 'AA') {
		const requiredRatio = this.contrastRatios[level];

		// Check and adjust each color scale
		Object.keys(palette).forEach((scaleKey) => {
			if (typeof palette[scaleKey] === 'object' && palette[scaleKey] !== null) {
				palette[scaleKey] = this.adjustScaleForAccessibility(
					palette[scaleKey],
					requiredRatio,
				);
			}
		});

		return palette;
	}

	/**
	 * Adjust color scale for accessibility compliance
	 * @param {Object} scale - Color scale object
	 * @param {number} requiredRatio - Required contrast ratio
	 * @returns {Object} Adjusted color scale
	 */
	adjustScaleForAccessibility(scale, requiredRatio) {
		const adjustedScale = { ...scale };

		// Test against white and black backgrounds
		Object.keys(adjustedScale).forEach((step) => {
			const color = adjustedScale[step];
			const contrastWithWhite = this.getContrastRatio(color, '#ffffff');
			const contrastWithBlack = this.getContrastRatio(color, '#000000');

			// If neither meets the requirement, adjust the color
			if (
				contrastWithWhite < requiredRatio &&
				contrastWithBlack < requiredRatio
			) {
				adjustedScale[step] = this.adjustColorForContrast(
					color,
					'#ffffff',
					requiredRatio,
				);
			}
		});

		return adjustedScale;
	}

	/**
	 * Calculate contrast ratio between two colors
	 * @param {string} color1 - First hex color
	 * @param {string} color2 - Second hex color
	 * @returns {number} Contrast ratio
	 */
	getContrastRatio(color1, color2) {
		const lum1 = this.getLuminance(color1);
		const lum2 = this.getLuminance(color2);
		const brightest = Math.max(lum1, lum2);
		const darkest = Math.min(lum1, lum2);
		return (brightest + 0.05) / (darkest + 0.05);
	}

	/**
	 * Get relative luminance of a color
	 * @param {string} hexColor - Hex color string
	 * @returns {number} Relative luminance
	 */
	getLuminance(hexColor) {
		const rgb = this.hexToRgb(hexColor);
		const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
			c = c / 255;
			return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	}

	/**
	 * Adjust color to meet contrast requirements
	 * @param {string} color - Hex color to adjust
	 * @param {string} background - Background hex color
	 * @param {number} targetRatio - Target contrast ratio
	 * @returns {string} Adjusted hex color
	 */
	adjustColorForContrast(color, background, targetRatio) {
		const hsl = this.hexToHsl(color);
		let adjustedHsl = { ...hsl };

		// Try adjusting lightness first
		for (let l = 0; l <= 100; l += 5) {
			adjustedHsl.l = l;
			const testColor = this.hslToHex(adjustedHsl);
			if (this.getContrastRatio(testColor, background) >= targetRatio) {
				return testColor;
			}
		}

		// If lightness adjustment isn't enough, try reducing saturation
		for (let s = hsl.s; s >= 0; s -= 10) {
			adjustedHsl.s = s;
			for (let l = 0; l <= 100; l += 5) {
				adjustedHsl.l = l;
				const testColor = this.hslToHex(adjustedHsl);
				if (this.getContrastRatio(testColor, background) >= targetRatio) {
					return testColor;
				}
			}
		}

		// Fallback to black or white
		return this.getContrastRatio('#000000', background) >
			this.getContrastRatio('#ffffff', background)
			? '#000000'
			: '#ffffff';
	}

	// Color conversion utilities
	hexToRgb(hex) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
			  }
			: null;
	}

	hexToHsl(hex) {
		const rgb = this.hexToRgb(hex);
		if (!rgb) return null;

		const r = rgb.r / 255;
		const g = rgb.g / 255;
		const b = rgb.b / 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h,
			s,
			l = (max + min) / 2;

		if (max === min) {
			h = s = 0;
		} else {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return {
			h: Math.round(h * 360),
			s: Math.round(s * 100),
			l: Math.round(l * 100),
		};
	}

	hslToHex(hsl) {
		const h = hsl.h / 360;
		const s = hsl.s / 100;
		const l = hsl.l / 100;

		const hue2rgb = (p, q, t) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		let r, g, b;

		if (s === 0) {
			r = g = b = l;
		} else {
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			r = hue2rgb(p, q, h + 1 / 3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1 / 3);
		}

		const toHex = (c) => {
			const hex = Math.round(c * 255).toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		};

		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	}

	/**
	 * Generate CSS custom properties from palette
	 * @param {Object} palette - Generated color palette
	 * @returns {string} CSS custom properties
	 */
	generateCSSVariables(palette) {
		let css = ':root {\n';

		Object.keys(palette).forEach((scaleKey) => {
			if (typeof palette[scaleKey] === 'object' && palette[scaleKey] !== null) {
				Object.keys(palette[scaleKey]).forEach((step) => {
					css += `  --byte-${scaleKey}-${step}: ${palette[scaleKey][step]};\n`;
				});
			}
		});

		css += '}';
		return css;
	}
}

// Export for use in other modules
export default AIColorGenerator;

// Global instance for immediate use
window.AIColorGenerator = AIColorGenerator;
