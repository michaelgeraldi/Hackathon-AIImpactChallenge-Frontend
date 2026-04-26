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
import CustomCard from "../../_components/CustomCard";
import CustomButton from "../../_components/CustomButton";
import CustomBarChart from "../../_components/CustomBarChart";
import CustomDonutChart from "../../_components/CustomDonutChart";
import CustomChatCard from "../../_components/CustomChatCard";

// Icon imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

export default function ClientOverviewPage() {
    return (
        <Box>
            <CollapsibleTitle
                title="Project name"
                subtitle="Project description"
                defaultExpanded={false}
            >
                <Typography>
                    This is the hidden content that appears when expanded.
                </Typography>
            </CollapsibleTitle>

            <Stack sx={{ mt: 3 }} direction="row" spacing={2.5}>
                {/* Statistics Cards */}
                <Grid container spacing={2.5} sx={{ flex: 1 }}>
                    <StatisticsCard title="Team Members" value="67" />
                    <StatisticsCard title="Tasks Completed" value="67%" />
                    <StatisticsCard title="Under Review" value="67" />
                    <StatisticsCard title="Overdue Tasks" value="67" />
                </Grid>

                {/* Buttons */}
                <Stack
                    spacing={2}
                    sx={{
                        mt: 3,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CustomButton startIcon={<AddIcon />} fullWidth>
                        Add New Worker
                    </CustomButton>
                    <CustomButton startIcon={<AddIcon />} fullWidth>
                        Add New Task
                    </CustomButton>
                </Stack>
            </Stack>

            <Grid container sx={{ mt: 2.5 }} spacing={2.5}>
                <Grid size={3}>
                    <CustomCard title="Tracker Detail">
                        <Box sx={{ mt: 1.5 }}>
                            <CustomBarChart />
                        </Box>
                    </CustomCard>
                    <CustomCard title="Tracker Detail" sx={{ mt: 2.5 }}>
                        <Box sx={{ mt: 1.5 }}>
                            <CustomDonutChart />
                        </Box>
                    </CustomCard>
                </Grid>
                <Grid size={4.5}>
                    <CustomCard title="Activity" sx={{ height: "100%" }} />
                </Grid>
                <Grid size={4.5}>
                    <CustomChatCard />
                </Grid>
            </Grid>
        </Box>
    );
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
