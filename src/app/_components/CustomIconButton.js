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
 * - iconSize: number (icon font size in pixels, e.g., 16, 20, 24)
 * - bgColor: string (background color, e.g., 'grey.main', 'primary.main')
 * - onClick: function
 * - loading: boolean
 * - disabled: boolean
 * - sx: custom styles
 */

export default function CustomIconButton({
    icon,
    color = "violet",
    size = "medium",
    iconSize,
    bgColor = "grey.main",
    onClick,
    loading = false,
    disabled = false,
    sx = {},
    ...props
}) {
    // Clone the icon and apply fontSize if iconSize is provided
    const iconWithSize = iconSize
        ? React.cloneElement(icon, {
              sx: { fontSize: iconSize, ...icon.props?.sx },
          })
        : icon;
        
    return (
        <IconButton
            color={color}
            size={size}
            onClick={onClick}
            disabled={disabled || loading}
            sx={{
                borderRadius: 999,
                transition: "all 0.2s ease",
                backgroundColor: bgColor,
                "&:hover": {
                    transform: "scale(1.1)",
                    backgroundColor: bgColor,
                    opacity: 0.8,
                },
                ...sx,
            }}
            {...props}
        >
            {loading ? <CircularProgress size={20} /> : iconWithSize}
        </IconButton>
    );
}
