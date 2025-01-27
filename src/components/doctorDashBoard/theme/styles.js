import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    brand: {
      100: "#dbedec",
      200: "#12c9bb",
      300: "#12c9bb",
      400: "#4ca8a1",
      500: "#12c9bb",
      600: "#18b9ab",
      700: "#031715",
      800: "#0f746b",
      900: "#128b80",
    },
    brandScheme: {
      100: "#dbedec",
      200: "#4ca8a1",
      300: "#4ca8a1",
      400: "#4ca8a1",
      500: "#12c9bb",
      600: "#18b9ab",
      700: "#031715",
      800: "#0f746b",
      900: "#031715",
    },
    brandTabs: {
      100: "#dbedec",
      200: "#12c9bb",
      300: "#12c9bb",
      400: "#12c9bb",
      500: "#12c9bb",
      600: "#18b9ab",
      700: "#031715",
      800: "#0f746b",
      900: "#031715",
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#fa9500",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#edf6f5",
      100: "#c9e4e2",
      200: "#a5d3d0",
      300: "#81c2bd",
      400: "#5db0aa",
      500: "#4ca8a1",
      600: "#3c8680",
      700: "#1B254B",
      800: "#111c44",
      900: "#0b1437",
    },
    gray: {
      100: "#FAFCFE",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};
