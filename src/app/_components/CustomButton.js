"use client";

import * as React from "react";
import Button from "@mui/material/Button";

/**
 * Reusable Button Component
 *
 * Props:
 * - children: button text/content
 * - variant: 'contained' | 'outlined' | 'text'
 * - color: 'primary' | 'secondary'
 * - size: 'small' | 'medium' | 'large'
 * - onClick: function
 * - fullWidth: boolean
 */

export default function CustomButton({
    children,
    variant = "contained",
    color = "primary",
    size = "medium",
    fullWidth = false,
    onClick,
    sx = {},
    ...props
}) {
    return (
        <Button
            variant={variant}
            color={color}
            size={size}
            fullWidth={fullWidth}
            onClick={onClick}
            sx={{
                borderRadius: 2,
                textTransform: "none", // prevent uppercase
                fontWeight: 600,
                px: 4,
                py: 1,
                transition: "all 0.2s ease",
                "&:hover": {
                    transform: "scale(1.1)",
                },
                ...sx, // allow overrides
            }}
            {...props}
        >
            {children}
        </Button>
    );
}
