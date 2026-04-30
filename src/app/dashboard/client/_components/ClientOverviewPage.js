"use client";

import React from "react";
import { Box, Grid, Modal, Stack, Typography } from "@mui/material";
import CollapsibleTitle from "../../../_components/CollapsibleTitle";
import CustomBarChart from "../../../_components/CustomBarChart";
import CustomButton from "../../../_components/CustomButton";
import CustomCard from "../../../_components/CustomCard";
import CustomChatCard from "../../../_components/CustomChatCard";
import CustomDonutChart from "../../../_components/CustomDonutChart";

// Icon imports
import AddIcon from "@mui/icons-material/Add";
import ActivitySection, {
    useActivitySection,
} from "../../../_components/ActivitySection";
import ClientProjectForm from "../../../home/client/_components/ClientProjectForm";

export default function ClientOverviewPage({ data }) {
    const [isCreatingProject, setCreatingProject] = React.useState(false);
    const activitySectionHook = useActivitySection();

    return (
        <Box>
            <CollapsibleTitle
                title={data?.project_name || "Project Name"}
                subtitle={data?.description || "Project Description"}
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
                        Add New Talent
                    </CustomButton>
                    <CustomButton
                        startIcon={<AddIcon />}
                        fullWidth
                        onClick={() => setCreatingProject(true)}
                    >
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

            <Modal
                open={isCreatingProject}
                onClose={() => setCreatingProject(false)}
            >
                <ClientProjectForm />
            </Modal>
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
