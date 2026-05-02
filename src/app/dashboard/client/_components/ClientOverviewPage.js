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
    const [mounted, setMounted] = React.useState(false);
    const [isCreatingProject, setCreatingProject] = React.useState(false);
    const [isGeneratingTasks, setGeneratingTasks] = React.useState(false);
    const [isGeneratingTimeline, setGeneratingTimeline] = React.useState(false);

    const { showInfo, showSuccess, showError } = useFeedbackContext();
    const activitySectionHook = useActivitySection();
    const session = getWorkspaceSession();
    const projects = getProjectList();
    let projectId = session.project_id;

    const contextKey = projectId ? `/pm/projects/${projectId}/context` : "/pm/projects/placeholder/context";
    const timelineKey = projectId ? `/pm/projects/${projectId}/timeline` : "/pm/projects/placeholder/timeline";
    const eventsKey = projectId ? `/pm/projects/${projectId}/events` : "/pm/projects/placeholder/events";

    const { data: contextData, isLoading: contextLoading, mutate: mutateContext } = useSWR(
        contextKey,
        (url) => url.includes("placeholder") ? Promise.resolve(null) : apiFetcher(url),
        { revalidateOnFocus: false, dedupingInterval: 0 }
    );

    const { data: timelineData, isLoading: timelineLoading, mutate: mutateTimeline } = useSWR(
        timelineKey,
        (url) => url.includes("placeholder") ? Promise.resolve(null) : apiFetcher(url),
        { revalidateOnFocus: false, dedupingInterval: 0 }
    );

    const { data: eventsData } = useSWR(
        eventsKey,
        (url) => url.includes("placeholder") ? Promise.resolve(null) : apiFetcher(url),
        { revalidateOnFocus: false, dedupingInterval: 0 }
    );

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        if (mounted && !projectId && projects.length > 0) {
            setActiveProject(projects[0].project_id);
        }
    }, [mounted, projects, projectId]);

    React.useEffect(() => {
        if (projectId && contextData) {
            mutateContext();
            mutateTimeline();
        }
    }, [projectId, mutateContext, mutateTimeline]);

    if (!mounted) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    const currentProjectName = session.project_name || "Select Project";
    const projectOverview = contextData?.snapshot?.overview;
    const timelineEntries = timelineData?.timeline?.entries || [];
    const events = eventsData?.events || [];

    const matchedTalent = projectOverview?.freelancers?.length || 0;
    const completedTasks = timelineEntries.filter(e => e.status === "completed").length;
    const totalTasks = timelineEntries.length;
    const tasksClosed = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const workCheckerQueue = events.filter(e => e.event_type === "work_check" && !e.resolved).length;
    const secretaryNotes = contextData?.snapshot?.recent_entries?.length || 0;

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
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={0.5} mb={2}>
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

            <Stack direction="row" spacing={2} sx={{ mb: 3, justifyContent: "flex-end" }}>
                <CustomButton startIcon={<AddIcon />} onClick={generateTaskBreakdown} loading={isGeneratingTasks}>Create Tasks from Brief</CustomButton>
                <CustomButton startIcon={<AddIcon />} onClick={generateTimeline} loading={isGeneratingTimeline}>Create Schedule</CustomButton>
                <CustomButton variant="outlined" onClick={() => setCreatingProject(true)}>New Project</CustomButton>
            </Stack>

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
                    <Grid container spacing={2.5} sx={{ mt: 1 }}>
                        <Grid size={3}>
                            <Box sx={{ backgroundColor: "background.paper", p: 3, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
                                <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>Team Members</Typography>
                                <Typography sx={{ fontSize: 28, fontWeight: 700 }}>{matchedTalent.toString().padStart(2, "0")}</Typography>
                            </Box>
                        </Grid>
                        <Grid size={3}>
                            <Box sx={{ backgroundColor: "background.paper", p: 3, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
                                <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>Tasks Done</Typography>
                                <Typography sx={{ fontSize: 28, fontWeight: 700 }}>{tasksClosed}%</Typography>
                            </Box>
                        </Grid>
                        <Grid size={3}>
                            <Box sx={{ backgroundColor: "background.paper", p: 3, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
                                <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>Pending Review</Typography>
                                <Typography sx={{ fontSize: 28, fontWeight: 700 }}>{workCheckerQueue.toString().padStart(2, "0")}</Typography>
                            </Box>
                        </Grid>
                        <Grid size={3}>
                            <Box sx={{ backgroundColor: "background.paper", p: 3, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
                                <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>Meeting Notes</Typography>
                                <Typography sx={{ fontSize: 28, fontWeight: 700 }}>{secretaryNotes.toString().padStart(2, "0")}</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2.5} sx={{ mt: 2.5 }}>
                        <Grid size={3}>
                            <CustomCard title="PM timeline">
                                <Box sx={{ mt: 1.5 }}><CustomBarChart /></Box>
                            </CustomCard>
                            <CustomCard title="PM work checker" sx={{ mt: 2.5 }}>
                                <Box sx={{ mt: 1.5 }}><CustomDonutChart /></Box>
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

            <Modal open={isCreatingProject} onClose={() => setCreatingProject(false)}>
                <ClientProjectForm onClose={() => setCreatingProject(false)} />
            </Modal>
        </Box>
    );
}