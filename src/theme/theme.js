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
            input: "#F6F6F6",
        },
        text: {
            primary: "#271D4E", // main font color
            secondary: "#6B6B8D", // lighter/subtitle color
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
