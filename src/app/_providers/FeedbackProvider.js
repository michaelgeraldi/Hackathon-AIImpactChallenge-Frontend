"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
    const [feedback, setFeedback] = useState({
        open: false,
        type: "info",
        title: "",
        message: "",
        autoHideDuration: null,
    });

    const showSuccess = useCallback(
        (message, title = "Success", autoHideDuration = 3000) => {
            setFeedback({
                open: true,
                type: "success",
                title,
                message,
                autoHideDuration,
            });
        },
        [],
    );

    const showError = useCallback(
        (message, title = "Error", autoHideDuration = 5000) => {
            setFeedback({
                open: true,
                type: "error",
                title,
                message,
                autoHideDuration,
            });
        },
        [],
    );

    const showWarning = useCallback(
        (message, title = "Warning", autoHideDuration = 4000) => {
            setFeedback({
                open: true,
                type: "warning",
                title,
                message,
                autoHideDuration,
            });
        },
        [],
    );

    const showInfo = useCallback(
        (message, title = "Info", autoHideDuration = 3000) => {
            setFeedback({
                open: true,
                type: "info",
                title,
                message,
                autoHideDuration,
            });
        },
        [],
    );

    const closeFeedback = useCallback(() => {
        setFeedback((prev) => ({
            ...prev,
            open: false,
        }));
    }, []);

    const value = {
        feedback,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        closeFeedback,
    };

    return (
        <FeedbackContext.Provider value={value}>
            {children}
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={feedback.open}
                autoHideDuration={feedback.autoHideDuration}
                onClose={closeFeedback}
            >
                <Alert
                    onClose={closeFeedback}
                    severity={feedback.type}
                    sx={{ width: "100%" }}
                >
                    <strong>{feedback.title}</strong> {feedback.message}
                </Alert>
            </Snackbar>
        </FeedbackContext.Provider>
    );
}

/**
 * Hook to use feedback context
 * @returns {object} Object containing feedback state and control functions
 */
export function useFeedbackContext() {
    const context = useContext(FeedbackContext);
    if (!context) {
        throw new Error(
            "useFeedbackContext must be used within FeedbackProvider",
        );
    }
    return context;
}
