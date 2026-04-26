"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/theme";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider theme={theme}>
                    {/* Normalize CSS across browsers */}
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
