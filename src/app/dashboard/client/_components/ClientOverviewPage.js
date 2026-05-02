"use client";

import React from "react";
import { Box, Grid, Modal, Stack, Typography, Select, MenuItem, CircularProgress } from "@mui/material";
import CustomBarChart from "../../../_components/CustomBarChart";
import CustomButton from "../../../_components/CustomButton";
import CustomCard from "../../../_components/CustomCard";
import CustomChatCard from "../../../_components/CustomChatCard";
import CustomDonutChart from "../../../_components/CustomDonutChart";

import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ActivitySection, {
    useActivitySection,
} from "../../../_components/ActivitySection";
import ClientProjectForm from "../../../home/client/_components/ClientProjectForm";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { getWorkspaceSession, getProjectList, setActiveProject } from "@/app/lib/workspace-session";

export default function ClientOverviewPage({ data }) {
    const [isCreatingProject, setCreatingProject] = React.useState(false);
    const [isGeneratingTasks, setGeneratingTasks] = React.useState(false);
    const [isGeneratingTimeline, setGeneratingTimeline] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);
    const activitySectionHook = useActivitySection();
    const { showInfo, showSuccess, showError } = useFeedbackContext();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const session = getWorkspaceSession();
    const projects = getProjectList();
    let projectId = session.project_id;
    const currentProjectName = session.project_name || "Select Project";

    React.useEffect(() => {
        if (mounted && !projectId && projects.length > 0) {
            setActiveProject(projects[0].project_id);
        }
    }, [mounted, projects, projectId]);

    if (!mounted) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    const { data: contextData, isLoading: contextLoading, mutate: mutateContext } = useSWR(
        projectId ? `/pm/projects/${projectId}/context` : null,
        (url) => apiFetcher(url),
        { revalidateOnFocus: false }
    );

    const { data: timelineData, isLoading: timelineLoading, mutate: mutateTimeline } = useSWR(
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

    React.useEffect(() => {
        if (projectId && contextData) {
            mutateContext();
            mutateTimeline();
        }
    }, [projectId, mutateContext, mutateTimeline]);

    const generateTaskBreakdown = async () => {
        if (!projectId || !projectOverview) {
            showInfo("Please create a project first.");
            return;
        }

        setGeneratingTasks(true);
        try {
            await apiFetcher("/pm/task-breakdown", {
                method: "POST",
                body: {
                    project_id: projectId,
                    delivery_goal: projectOverview.description || "Complete project delivery",
                    source_material: projectOverview.scope || "",
                    freelancer_focus: projectOverview.freelancers?.map(f => f.role) || [],
                },
            });
            showSuccess("Task breakdown generated successfully!");
            mutateTimeline();
        } catch (error) {
            showError(error.message || "Failed to generate task breakdown.");
        } finally {
            setGeneratingTasks(false);
        }
    };

    const generateTimeline = async () => {
        if (!projectId) {
            showInfo("Please create a project first.");
            return;
        }

        setGeneratingTimeline(true);
        try {
            await apiFetcher("/pm/timeline/generate", {
                method: "POST",
                body: {
                    project_id: projectId,
                    start_date: new Date().toISOString(),
                },
            });
            showSuccess("Timeline generated successfully!");
            mutateTimeline();
        } catch (error) {
            showError(error.message || "Failed to generate timeline.");
        } finally {
            setGeneratingTimeline(false);
        }
    };

    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2 }}>
                <Select
                    value={projectId || ""}
                    onChange={(e) => setActiveProject(e.target.value)}
                    size="small"
                    sx={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: 'text.primary',
                        '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                        '.MuiSelect-select': { py: 0.5, pr: 0.5 },
                    }}
                    disableUnderline
                    IconComponent={ArrowDropDownIcon}
                >
                    {projects.map((project) => (
                        <MenuItem key={project.project_id} value={project.project_id} sx={{ fontSize: 20, fontWeight: 600 }}>
                            {project.project_name}
                        </MenuItem>
                    ))}
                </Select>
            </Stack>

            <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 1 }}>
                Overview • Dashboard
            </Typography>

            <Box sx={{ borderBottom: '2px solid', borderColor: 'divider', mb: 3 }} />

            {!projectId ? (
                <Box sx={{ mt: 4, textAlign: "center" }}>
                    <Typography sx={{ mb: 3, color: "text.secondary" }}>
                        No project yet. Create your first project to get started!
                    </Typography>
                    <CustomButton
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={() => setCreatingProject(true)}
                    >
                        Create New Project
                    </CustomButton>
                </Box>
            ) : (
                <>
                    <Stack sx={{ mt: 3 }} direction="row" spacing={2.5}>
                        <Grid container spacing={2.5} sx={{ flex: 1 }}>
                            <StatisticsCard title="Team Members" value={matchedTalent.toString().padStart(2, "0")} />
                            <StatisticsCard title="Tasks Done" value={`${tasksClosed}%`} />
                            <StatisticsCard title="Pending Review" value={workCheckerQueue.toString().padStart(2, "0")} />
                            <StatisticsCard title="Meeting Notes" value={secretaryNotes.toString().padStart(2, "0")} />
                        </Grid>

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
                                onClick={generateTaskBreakdown}
                                loading={isGeneratingTasks}
                            >
                                Create Tasks from Brief
                            </CustomButton>
                            <CustomButton
                                startIcon={<AddIcon />}
                                fullWidth
                                onClick={generateTimeline}
                                loading={isGeneratingTimeline}
                            >
                                Create Schedule
                            </CustomButton>
                            <CustomButton
                                variant="outlined"
                                fullWidth
                                onClick={() => setCreatingProject(true)}
                            >
                                New Project
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
                </>
            )}

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
