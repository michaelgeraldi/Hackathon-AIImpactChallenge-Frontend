"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Reusable Icon Button Component
 *
 * Props:
 * - icon: React node (required)
 * - color: 'primary' | 'secondary' | 'default'
 * - size: 'small' | 'medium' | 'large'
 * - onClick: function
 * - loading: boolean
 * - disabled: boolean
 * - sx: custom styles
 */

export default function CustomIconButton({
    icon,
    color = "violet",
    size = "medium",
    onClick,
    loading = false,
    disabled = false,
    sx = {},
    ...props
}) {
    return (
        <IconButton
            color={color}
            size={size}
            onClick={onClick}
            disabled={disabled || loading}
            sx={{
                borderRadius: 999,
                transition: "all 0.2s ease",
                "&:hover": {
                    transform: "scale(1.1)",
                },
                backgroundColor: "grey.main",
                ...sx,
            }}
            {...props}
        >
            {loading ? <CircularProgress size={20} /> : icon}
        </IconButton>
    );
}
