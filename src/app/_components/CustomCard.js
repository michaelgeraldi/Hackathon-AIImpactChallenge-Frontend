"use client";

import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

/**
 * Reusable Card Component
 *
 * Props:
 * - title: string
 * - subtitle: string (optional)
 * - children: ReactNode
 * - actions: ReactNode (optional, e.g. buttons)
 * - sx: custom styles
 */

export default function CustomCard({
    title,
    subtitle,
    children,
    actions,
    sx = {},
    ...props
}) {
    return (
        <Card
            elevation={1}
            sx={{
                borderRadius: 3,
                backgroundColor: "background.paper",
                // boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                ...sx,
            }}
            {...props}
        >
            <CardContent sx={{ p: 3 }}>
                {/* Header */}
                {(title || subtitle) && (
                    <Box mb={2}>
                        {title && (
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {title}
                            </Typography>
                        )}

                        {subtitle && (
                            <Typography variant="body2" color="text.secondary">
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                )}

                {/* Content */}
                <Box>{children}</Box>

                {/* Actions */}
                {actions && <Box mt={2}>{actions}</Box>}
            </CardContent>
        </Card>
    );
}
