"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "../theme/theme";
import { Poppins } from "next/font/google";
import { SWRConfig } from "swr";
import { FeedbackProvider } from "./_providers/FeedbackProvider";
import { apiFetcher } from "./lib/api";

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
                <SWRConfig
                    value={{
                        fetcher: apiFetcher,
                        revalidateOnFocus: false,
                        revalidateOnReconnect: false,
                    }}
                >
                    <ThemeProvider theme={theme}>
                        <FeedbackProvider>
                            <CssBaseline />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100vh"
                                }}
                            >
                                {children}
                            </Box>
                        </FeedbackProvider>
                    </ThemeProvider>
                </SWRConfig>
            </body>
        </html>
    );
}
