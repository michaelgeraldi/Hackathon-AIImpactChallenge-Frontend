"use client";

import { Box, Collapse, Grid, IconButton, Typography } from "@mui/material";
import * as React from "react";
import CustomCard from "../../_components/CustomCard";
import { useNavigationBarContext } from "../../_components/NavigationBar";
import useSWR from "swr";

// Pages imports
import ClientOverviewPage from "./_components/ClientOverviewPage";
import ClientReportPage from "./_components/ClientReportPage";

// Icon imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClientMessagesPage from "./_components/ClientMessagesPage";
import ClientTrackerPage from "./_components/ClientTrackerPage";

export default function ClientPage() {
    const { active, setActive } = useNavigationBarContext();

    const { data, error, isLoading } = useSWR("/pm/health");

    React.useEffect(() => {
        console.debug("Health Check: ", { data, error, isLoading });
    }, [data, error, isLoading]);

    if (active === "Overview") {
        return <ClientOverviewPage />;
    } else if (active === "Tracker") {
        return <ClientTrackerPage />;
    } else if (active === "Report") {
        return <ClientReportPage />;
    } else if (active === "Messages") {
        return <ClientMessagesPage />;
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
