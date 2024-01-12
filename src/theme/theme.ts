import { blue, pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: blue,
    secondary: {
      main: "#0096c7",
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#023e8a",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: "#00b4d8",
        },
      },
    },
  },
});

// interface PaletteOptions {
//   primary?: PaletteColorOptions;
//   secondary?: PaletteColorOptions;
//   error?: PaletteColorOptions;
//   warning?: PaletteColorOptions;
//   info?: PaletteColorOptions;
//   success?: PaletteColorOptions;
//   mode?: PaletteMode;
//   tonalOffset?: PaletteTonalOffset;
//   contrastThreshold?: number;
//   common?: Partial<CommonColors>;
//   grey?: ColorPartial;
//   text?: Partial<TypeText>;
//   divider?: string;
//   action?: Partial<TypeAction>;
//   background?: Partial<TypeBackground>;
//   getContrastText?: (background: string) => string;
// }
