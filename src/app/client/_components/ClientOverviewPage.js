"use client";

import {
    Box,
    Collapse,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import * as React from "react";
import CustomBarChart from "../../_components/CustomBarChart";
import CustomButton from "../../_components/CustomButton";
import CustomCard from "../../_components/CustomCard";
import CustomChatCard from "../../_components/CustomChatCard";
import CustomDonutChart from "../../_components/CustomDonutChart";
import CollapsibleTitle from "../../_components/CollapsibleTitle";

// Icon imports
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ActivitySection, {
    useActivitySection,
} from "../../_components/ActivitySection";

export default function ClientOverviewPage() {
    const activitySectionHook = useActivitySection();

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
                    <CustomCard sx={{ height: "100%" }}>
                        <ActivitySection {...activitySectionHook} />
                    </CustomCard>
                </Grid>
                <Grid size={4.5}>
                    <CustomChatCard />
                </Grid>
            </Grid>
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
