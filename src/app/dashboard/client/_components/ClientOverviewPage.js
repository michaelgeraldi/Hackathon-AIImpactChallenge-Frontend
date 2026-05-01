"use client";

import React from "react";
import { Box, Grid, Modal, Stack, Typography, CircularProgress } from "@mui/material";
import CollapsibleTitle from "../../../_components/CollapsibleTitle";
import CustomBarChart from "../../../_components/CustomBarChart";
import CustomButton from "../../../_components/CustomButton";
import CustomCard from "../../../_components/CustomCard";
import CustomChatCard from "../../../_components/CustomChatCard";
import CustomDonutChart from "../../../_components/CustomDonutChart";

import AddIcon from "@mui/icons-material/Add";
import ActivitySection, {
    useActivitySection,
} from "../../../_components/ActivitySection";
import ClientProjectForm from "../../../home/client/_components/ClientProjectForm";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { getWorkspaceSession } from "@/app/lib/workspace-session";

export default function ClientOverviewPage({ data }) {
    const [isCreatingProject, setCreatingProject] = React.useState(false);
    const activitySectionHook = useActivitySection();
    const { showInfo } = useFeedbackContext();

    const session = getWorkspaceSession();
    const projectId = session.project_id;

    const { data: contextData, isLoading: contextLoading } = useSWR(
        projectId ? `/pm/projects/${projectId}/context` : null,
        (url) => apiFetcher(url),
        { revalidateOnFocus: false }
    );

    const { data: timelineData, isLoading: timelineLoading } = useSWR(
        projectId ? `/pm/projects/${projectId}/timeline` : null,
        (url) => apiFetcher(url),
        { revalidateOnFocus: false }
    );

    const { data: eventsData } = useSWR(
        projectId ? `/pm/projects/${projectId}/events` : null,
        (url) => apiFetcher(url),
        { revalidateOnFocus: false }
    );

    const projectOverview = contextData?.snapshot?.overview;
    const timelineEntries = timelineData?.timeline?.entries || [];
    const events = eventsData?.events || [];

    const matchedTalent = projectOverview?.freelancers?.length || 0;
    const completedTasks = timelineEntries.filter(e => e.status === "completed").length;
    const totalTasks = timelineEntries.length;
    const tasksClosed = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const workCheckerQueue = events.filter(e => e.event_type === "work_check" && !e.resolved).length;
    const secretaryNotes = contextData?.snapshot?.recent_entries?.length || 0;

    return (
        <Box>
            <CollapsibleTitle
                title="PM delivery overview"
                subtitle="Timeline, task breakdowns, work checker, and reporting in one place"
                defaultExpanded={false}
            >
                <Typography>
                    PM keeps the project moving, while Secretary turns every
                    checkpoint into notes, summaries, and follow-ups.
                </Typography>
            </CollapsibleTitle>

            <Stack sx={{ mt: 3 }} direction="row" spacing={2.5}>
                {/* Statistics Cards */}
                <Grid container spacing={2.5} sx={{ flex: 1 }}>
                    <StatisticsCard title="Matched Talent" value="08" />
                    <StatisticsCard title="PM Tasks Closed" value="67%" />
                    <StatisticsCard title="Work Checker Queue" value="11" />
                    <StatisticsCard title="Secretary Notes" value="14" />
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
                    <CustomButton
                        startIcon={<AddIcon />}
                        fullWidth
                        onClick={() =>
                            showInfo(
                                "Use the Talent Acquisition workspace to add and shortlist more matched talent for this PM delivery flow.",
                            )
                        }
                    >
                        Add matched talent
                    </CustomButton>
                    <CustomButton
                        startIcon={<AddIcon />}
                        fullWidth
                        onClick={() => setCreatingProject(true)}
                    >
                        Create PM task
                    </CustomButton>
                </Stack>
            </Stack>

            <Grid container sx={{ mt: 2.5 }} spacing={2.5}>
                <Grid size={3}>
                    <CustomCard title="PM timeline">
                        <Box sx={{ mt: 1.5 }}>
                            <CustomBarChart />
                        </Box>
                    </CustomCard>
                    <CustomCard title="PM work checker" sx={{ mt: 2.5 }}>
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
                    <CustomChatCard title="Secretary chat summary" />
                </Grid>
            </Grid>

            <Modal
                open={isCreatingProject}
                onClose={() => setCreatingProject(false)}
            >
                <ClientProjectForm onClose={() => setCreatingProject(false)} />
            </Modal>
        </Box>
    );
}

function StatisticsCard({ title, value }) {
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
