"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const ProgressIndicatorContext = createContext();

export function ProgressIndicatorProvider({ children }) {
    const [progress, setProgress] = useState({
        visible: false,
        label: "",
    });

    const startProgress = useCallback((label = "Loading...") => {
        setProgress({
            visible: true,
            label,
        });
    }, []);

    const completeProgress = useCallback(() => {
        setTimeout(() => {
            setProgress({
                visible: false,
                label: "",
            });
        }, 300);
    }, []);

    const hideProgress = useCallback(() => {
        setProgress({
            visible: false,
            label: "",
        });
    }, []);

    const value = {
        progress,
        startProgress,
        completeProgress,
        hideProgress,
    };

    return (
        <ProgressIndicatorContext.Provider value={value}>
            {children}

            {progress.visible && (
                <Box
                    sx={{
                        position: "fixed",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        zIndex: 1300,
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <CircularProgress size={48} />
                    
                    {progress.label && (
                        <Typography variant="body2" color="white">
                            {progress.label}
                        </Typography>
                    )}
                </Box>
            )}
        </ProgressIndicatorContext.Provider>
    );
}

export function useProgressIndicator() {
    const context = useContext(ProgressIndicatorContext);
    if (!context) {
        throw new Error(
            "useProgressIndicator must be used within ProgressIndicatorProvider",
        );
    }
    return context;
}