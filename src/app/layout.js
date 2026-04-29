"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "../theme/theme";
import { Poppins } from "next/font/google";
import { SWRConfig } from "swr";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"], // choose what you need
    display: "swap",
});

export default function RootLayout({ children }) {
    const fetcher = (url) => {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`;

        return fetch(fullUrl).then((res) => {
            if (!res.ok) throw new Error("API Error");
            return res.json();
        });
    };

    return (
        <html lang="en" style={{ height: "fit-content", overflowY: "auto" }}>
            <body
                className={poppins.className}
                style={{ margin: 0, padding: 0 }}
            >
                <SWRConfig
                    value={{
                        fetcher: fetcher,
                        revalidateOnFocus: false,
                        revalidateOnReconnect: false,
                    }}
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
                </SWRConfig>
            </body>
        </html>
    );
}
