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
    },
});

export default theme;
