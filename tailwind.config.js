/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // Clash Display for display and headings, Satoshi for text and UI.
      // Fallbacks carry metric overrides, see src/fonts.css
      fontFamily: {
        display: [
          '"Clash Display"',
          '"Clash Display Fallback"',
          "system-ui",
          "sans-serif",
        ],
        sans: ["Satoshi", '"Satoshi Fallback"', "system-ui", "sans-serif"],
      },
      // Type scale from DESIGN.md section 2
      fontSize: {
        "display-xl": [
          "clamp(3.75rem, 5vw + 1.5rem, 4.5rem)",
          {
            lineHeight: "0.95",
            letterSpacing: "-0.03em",
            fontWeight: "700",
          },
        ],
        "display-lg": [
          "2.6rem",
          { lineHeight: "1", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        h2: [
          "1.875rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        h3: [
          "1rem",
          { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        body: ["0.9375rem", { lineHeight: "1.65", letterSpacing: "0" }],
        small: [
          "0.8125rem",
          { lineHeight: "1.45", letterSpacing: "0", fontWeight: "500" },
        ],
        eyebrow: [
          "0.6875rem",
          { lineHeight: "1.2", letterSpacing: "0.16em", fontWeight: "700" },
        ],
        meta: [
          "0.75rem",
          { lineHeight: "1.3", letterSpacing: "0.01em", fontWeight: "500" },
        ],
      },
      // Colour tokens from DESIGN.md section 3
      colors: {
        ink: {
          950: "#030302",
          900: "#0a0a09",
          850: "#111110",
          800: "#1a1a18",
          700: "#2a2a27",
        },
        fg: {
          hi: "#f5f4f0",
          mid: "rgba(245,244,240,0.72)",
          low: "rgba(245,244,240,0.58)",
        },
        pahelo: "#FFDF2B",
        "pahelo-deep": "#E8C51F",
        danger: "#F2555A",
        success: "#5FD08A",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      // Warm ink tinted shadows, never pure black
      boxShadow: {
        card: "0 12px 32px -14px rgba(3,3,2,0.72)",
        pop: "0 28px 64px -24px rgba(3,3,2,0.8)",
        focus: "0 0 0 2px #030302, 0 0 0 4px rgba(255,223,43,0.9)",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "320ms",
        reveal: "520ms",
      },
      transitionTimingFunction: {
        enter: "cubic-bezier(0.22, 1, 0.36, 1)",
        state: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      zIndex: {
        player: "40",
        nav: "50",
        sheet: "60",
        toast: "70",
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      aspectRatio: {
        poster: "1 / 1.5",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
