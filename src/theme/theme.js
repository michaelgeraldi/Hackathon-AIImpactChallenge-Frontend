"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
    palette: {
        primary: {
            main: "#4352E5",
        },
        secondary: {
            main: "#E7E9FC",
        },
        tertiary: {
            main: "#271D4E",
        },
        violet: {
            main: "#271D4E",
        },
        grey: {
            main: "#F5F5F5",
        },
        background: {
            default: "#F3F4F7",
            paper: "#FFFFFF",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 600,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    transition: "all 0.2s ease",
                },
            },
        },
    },
});

export default theme;
