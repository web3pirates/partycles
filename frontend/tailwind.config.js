/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "xs-h": { raw: "(max-height: 500px)" },
      "2xs-h": { raw: "(max-height: 400px)" },
    },
    extend: {
      flexBasis: {
        "fit-content": "fit-content",
      },
      boxShadow: {
        uni: "0px 40px 120px 0px hsla(328,97%,53%,0.12)",
      },
      screens: {
        "3xl": "1600px",
      },
      gridTemplateColumns: {
        18: "repeat(18, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-17": "span 17 / span 17",
        "span-18": "span 18 / span 18",
      },
      colors: {
        gold: "#CFAF6D",
        silver: "#C0C0C0",
        bronze: "#CD7F32",
        custom: {
          gray: {
            900: "rgb(249 250 251 / <alpha-value>)",
            800: "rgb(236 242 251 / <alpha-value>)",
            700: "rgb(249 250 251 / <alpha-value>)",
            600: "rgb(201 219 242 / <alpha-value>)",
            500: "rgb(85 94 116 / <alpha-value>)",
            400: "rgb(85 94 116 / <alpha-value>)",
            300: "rgb(85 94 116 / <alpha-value>)",
            200: "rgb(31 41 56 / <alpha-value>)",
            100: "rgb(9 14 20 / <alpha-value>)",
            uni: "rgb(13 17 28 / <alpha-value>)",
            uniborder: "rgb(92 102 132 / <alpha-value>)",
          },
          yellow: {
            900: "rgb(253 246 178 / <alpha-value>)",
            400: "rgb(142 75 16 / <alpha-value>)",
          },
        },
        color: {
          text: {
            0: "rgb(232 241 255 / <alpha-value>)",
            1: "rgb(7 16 28 / <alpha-value>)",
            2: "rgb(81 101 126 / <alpha-value>)",
            22: "rgb(var(--text-2-rev) / <alpha-value>)",
            3: "rgb(115 171 255 / <alpha-value>)",
            a: "rgb(141 144 153 / <alpha-value>)",
            b: "rgb(248 37 24 / <alpha-value>)",
          },
          additionalElement: "rgb(202 211 220 / <alpha-value>)",
          additionalElement2: "#242E4D",
          disabled: "rgb(var(--disabled) / <alpha-value>)",
          icon: {
            a: "rgb(var(--icon-a) / <alpha-value>)",
            b: "rgb(var(--icon-b) / <alpha-value>)",
            c: "rgb(var(--icon-c) / <alpha-value>)",
          },
        },
        principal: {
          blue: "#00001E",
          lightgray: "#E8EEF9",
          grayblue: "#39537b",
          gray: "#BFC1C6",
          black: "#1f2334",
          text: "#5C6F81",
        },
        bright: {
          blue: "#1988F7",
          green: "#32C66D",
          red: "#F82518",
          yellow: "#E3A008",
          purple: "#8001FF",
        },
        pastel: {
          green: "#8CB745",
          orange: "#D9A270",
        },
        shade: {
          0: "#E8F1FF",
          1: "#7A90B8",
          2: "#AFCAF4",
          3: "#FF5A1F",
        },
        dark: {
          card: "#0f1d45",
          card2: "#0C1840",
          cardblue: "#111432",
          bg: "#040722",
        },
        twitter: "#1d9bf0",
        buttonHover: "#69B4FF",
        elements: "#0A3576",
        elementsHover: "#15437D",
        light: {
          bg: "#E6EBF1",
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        custom: "3px 3px 8px 0px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
