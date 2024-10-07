// theme.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// 1. Define your color palette
const colors = {
      brand: {
            50: "#e3f9f5",
            100: "#c1e7e3",
            200: "#a3d5d1",
            300: "#7ec3bf",
            400: "#5bb1ad",
            500: "#3da09b", // Primary brand color
            600: "#2e7d80",
            700: "#1f5964",
            800: "#0f3748",
            900: "#00132c",
      },
      // You can override other color palettes or add new ones
      secondary: {
            50: "#fff5e5",
            100: "#ffe2b3",
            200: "#ffcf80",
            300: "#ffba4d",
            400: "#ffa61a",
            500: "#e69500", // Secondary color
            600: "#b37f00",
            700: "#806900",
            800: "#4d4300",
            900: "#1a1c00",
      },
};

// 2. Define other theme customizations if needed (optional)
const config: ThemeConfig = {
      initialColorMode: "light",
      useSystemColorMode: false,
};

// 3. Extend the theme
const customTheme = extendTheme({
      colors,
      config,
      fonts: {
            heading: `'Inter', sans-serif`,
            body: `'Inter', sans-serif`,
      },
      styles: {
            global: {
                  // Apply global styles
                  body: {
                        bg: "gray.50",
                        color: "#353535", // Set default text color here
                  },
                  // Optionally, target specific HTML elements for more control
                  "p, span, a, h1, h2, h3, h4, h5, h6, li, div, button": {
                        color: "#353535",
                  },
            },
      },
});

export default customTheme;
