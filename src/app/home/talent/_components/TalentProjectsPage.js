"use client";

import CustomButton from "@/app/_components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import {
    Stack,
    Typography,
    Container,
    Paper,
    CircularProgress,
    Box,
    Grid,
} from "@mui/material";
import React from "react";
import TalentProjectCard from "./TalentProjectCard";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { getWorkspaceSession } from "@/app/lib/workspace-session";
import { projects } from "@/app/lib/mockup";

export default function TalentProjectsPage() {
    const [selectedProjectId, setSelectedProjectId] = React.useState(null);
    const { showInfo } = useFeedbackContext();

    const session = getWorkspaceSession();
    const projectId = session.project_id;

    // const { data: contextData, isLoading } = useSWR(
    //     projectId ? `/pm/projects/${projectId}/context` : null,
    //     (url) => apiFetcher(url),
    //     { revalidateOnFocus: false }
    // );

    // const { data: timelineData } = useSWR(
    //     projectId ? `/pm/projects/${projectId}/timeline` : null,
    //     (url) => apiFetcher(url),
    //     { revalidateOnFocus: false }
    // );

    // const projectOverview = contextData?.snapshot?.overview;
    // const timelineEntries = timelineData?.timeline?.entries || [];

    // const completedTasks = timelineEntries.filter(e => e.status === "completed").length;
    // const totalTasks = timelineEntries.length;
    // const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // const projects = projectOverview?.freelancers?.map((freelancer, index) => ({
    //     id: index + 1,
    //     name: `PM Sprint: ${projectOverview.project_name || "Project"}`,
    //     members: projectOverview.freelancers?.slice(0, 3).map((f, i) => ({
    //         name: f.name || `Member ${i + 1}`,
    //         avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${f.name || i}`,
    //     })) || [],
    //     progress: progress,
    //     status: progress >= 100 ? "Completed" : progress > 50 ? "On track" : "Needs update",
    //     startDate: projectOverview?.created_at
    //         ? `Started on ${new Date(projectOverview.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}`
    //         : "Create a project to get started",
    // })) || (isLoading ? [] : [{
    //     id: 1,
    //     name: "PM Sprint: No active project",
    //     members: [],
    //     progress: 0,
    //     status: "No project",
    //     startDate: "Create a project to get started",
    // }]);

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Paper elevation={0} sx={{ px: 5.5, py: 4, borderRadius: 5 }}>
                {/* Header */}
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                        Talent Projects
                    </Typography>
                    <CustomButton
                        startIcon={<AddIcon />}
                        onClick={() =>
                            showInfo(
                                "PM support requests will turn into a bootstrap or task-breakdown flow once the full handoff form is wired.",
                            )
                        }
                    >
                        Request PM support
                    </CustomButton>
                </Stack>
                <Typography sx={{ mb: 4, color: "text.secondary" }}>
                    View and manage your active projects. Track progress,
                    collaborate with team members, and request PM support when
                    needed.
                </Typography>

                {/* Projects List */}
                <Stack sx={{ gap: 2 }}>
                    {false ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                py: 4,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : projects.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                            <Typography sx={{ color: "text.secondary" }}>
                                No active projects. Create a project to get
                                started.
                            </Typography>
                        </Box>
                    ) : (
                        projects.map((project) => (
                            <TalentProjectCard
                                key={project.id}
                                project={project}
                                isSelected={selectedProjectId === project.id}
                                onClick={() => setSelectedProjectId(project.id)}
                            />
                        ))
                    )}
                </Stack>
            </Paper>
        </Container>
    );
}
