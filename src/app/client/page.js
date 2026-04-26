"use client";

import * as React from "react";
import {
    Button,
    Typography,
    Container,
    Box,
    Card,
    Collapse,
    IconButton,
    Stack,
    Grid,
} from "@mui/material";
import CustomCard from "../_components/CustomCard";
import CustomButton from "../_components/CustomButton";
import CustomBarChart from "../_components/CustomBarChart";
import CustomDonutChart from "../_components/CustomDonutChart";
import { useNavigationBarContext } from "../_components/NavigationBar";

// Pages imports
import ClientOverviewPage from "./_components/ClientOverviewPage";
import ClientReportPage from "./_components/ClientReportPage";

// Icon imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import CustomChatCard from "../_components/CustomChatCard";

export default function ClientPage() {
    const { active, setActive } = useNavigationBarContext();

    if (active === "Overview") {
        return <ClientOverviewPage />;
    } else if (active === "Tracker") {
        return <div>Tracker Page</div>;
    } else if (active === "Report") {
        return <ClientReportPage />;
    } else if (active === "Messages") {
        return <div>Messages Page</div>;
    }
}

function CollapsibleTitle({
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

function StatisticsCard({ title, value, change }) {
    return (
        <Grid size={3}>
            <CustomCard
                sx={{
                    borderRadius: 5,
                    textAlign: "center",
                }}
                elevation={0}
            >
                <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
                <Typography sx={{ fontSize: 40, fontWeight: 600 }}>
                    {value}
                </Typography>
            </CustomCard>
        </Grid>
    );
}
