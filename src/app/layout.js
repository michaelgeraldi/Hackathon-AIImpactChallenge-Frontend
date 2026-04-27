"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "../theme/theme";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"], // choose what you need
    display: "swap",
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" style={{ height: "fit-content", overflowY: "auto" }}>
            <body
                className={poppins.className}
                style={{ margin: 0, padding: 0 }}
            >
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box
                        sx={{
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {children}
                    </Box>
                </ThemeProvider>
            </body>
        </html>
    );
}
