import React from "react";
import { Box, Typography, Collapse } from "@mui/material"; 
import IconButton from "@mui/material/IconButton";

// Icon imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CollapsibleTitle({
    title,
    subtitle,
    children,
    defaultExpanded = false,
}) {
    const [expanded, setExpanded] = React.useState(defaultExpanded);

    return (
        <Box>
            {/* Header */}
            <Box
                onClick={() => setExpanded(!expanded)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    cursor: "pointer",
                }}
            >
                {/* Title */}
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 36,
                    }}
                >
                    {title}
                </Typography>

                {/* Chevron */}
                <IconButton
                    size="small"
                    sx={{
                        transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease",
                    }}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </Box>

            <Box>
                {subtitle && (
                    <Typography
                        sx={{
                            fontWeight: 300,
                            fontSize: 20,
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {/* Collapsible Content */}
            <Collapse in={expanded} sx={{ mt: 2 }}>
                <Box sx={{ pt: 0 }}>{children}</Box>
            </Collapse>
        </Box>
    );
}