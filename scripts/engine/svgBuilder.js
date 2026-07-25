/**
 * Creative Mind OS - SVG Vector Graphics Engine Core (`svgBuilder.js`)
 * High-precision, zero-dependency Node.js SVG builder.
 * Design System: Ultra-Premium AI Landing Page (Apple / Vercel aesthetics).
 * Focus on deep charcoals, minimalist whitespace, and 1px borders.
 */

class SVGBuilder {
  constructor(width = 1440, height = 900, viewBox = null) {
    this.width = width;
    this.height = height;
    this.viewBox = viewBox || `0 0 ${width} ${height}`;
    this.defs = [];
    this.styles = [];
    this.elements = [];

    // The bulletproof modern UI typography stack (GitHub safe)
    this.fontUI = `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
    
    // Core definition for the ultra-premium aesthetic
    this.addDef(`
      <linearGradient id="premium-border" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.08)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>
    `);
    
    this.addDef(`
      <linearGradient id="card-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(20,20,24,0.7)" />
        <stop offset="100%" stop-color="rgba(10,10,12,0.9)" />
      </linearGradient>
    `);
    
    // Deep minimalist background (charcoal/midnight)
    this.addRect({ x: 0, y: 0, width: this.width, height: this.height, fill: "#030305" });
  }

  addStyle(css) {
    this.styles.push(css);
    return this;
  }

  addDef(defString) {
    this.defs.push(defString);
    return this;
  }

  /**
   * Adds an ultra-premium subtle glass card with a 1px delicate gradient border.
   */
  addPremiumCard(x, y, w, h, rx = 16) {
    // Fill background
    this.addRect({ x, y, width: w, height: h, fill: "url(#card-bg)", rx });
    
    // 1px Border
    this.addRect({ x, y, width: w, height: h, fill: "none", stroke: "url(#premium-border)", "stroke-width": 1, rx });
    
    return this;
  }

  _attrsToString(attrs) {
    if (!attrs) return "";
    return Object.entries(attrs)
      .filter(([_, val]) => val !== undefined && val !== null)
      .map(([key, val]) => `${key}="${val}"`)
      .join(" ");
  }

  addRect(attrs) {
    this.elements.push(`<rect ${this._attrsToString(attrs)} />`);
    return this;
  }

  addCircle(attrs) {
    this.elements.push(`<circle ${this._attrsToString(attrs)} />`);
    return this;
  }

  addLine(attrs) {
    this.elements.push(`<line ${this._attrsToString(attrs)} />`);
    return this;
  }

  addPath(attrs) {
    this.elements.push(`<path ${this._attrsToString(attrs)} />`);
    return this;
  }

  addText(text, attrs) {
    this.elements.push(`<text ${this._attrsToString(attrs)}>${text}</text>`);
    return this;
  }

  addGroup(contentString, attrs = {}) {
    const attrStr = this._attrsToString(attrs);
    this.elements.push(`<g ${attrStr}>${contentString}</g>`);
    return this;
  }

  addRaw(svgString) {
    this.elements.push(svgString);
    return this;
  }

  toString() {
    const defsBlock =
      this.defs.length > 0 || this.styles.length > 0
        ? `  <defs>\n` +
          (this.styles.length > 0
            ? `    <style>\n${this.styles.join("\n")}\n    </style>\n`
            : "") +
          this.defs.map((d) => `    ${d}`).join("\n") +
          `\n  </defs>`
        : "";

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${this.viewBox}" width="${this.width}" height="${this.height}" fill="none">
${defsBlock}
  ${this.elements.join("\n  ")}
</svg>`;
  }
}

module.exports = SVGBuilder;
