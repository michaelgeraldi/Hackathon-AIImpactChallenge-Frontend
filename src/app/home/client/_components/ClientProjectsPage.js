"use client";

import CustomButton from "@/app/_components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Stack, Typography, Container, Paper } from "@mui/material";
import React from "react";
import ClientProjectForm from "./ClientProjectForm";
import ClientProjectCard from "./ClientProjectCard";
import useSWR from "swr";

export default function ClientProjectsPage() {
    const { data: backendHealth } = useSWR("/pm/health");
    const [isCreatingProject, setCreatingProject] = React.useState(false);
    const [selectedProjectId, setSelectedProjectId] = React.useState(null);

    const projects = [
        {
            id: 1,
            name: "PM Workspace: Mobile banking refresh",
            members: [
                {
                    name: "Member 1",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
                },
                {
                    name: "Member 2",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
                },
                {
                    name: "Member 3",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
                },
            ],
            progress: 75,
            status: "Weekly update ready",
            startDate: "Started on 29 Apr",
        },
        {
            id: 2,
            name: "PM Workspace: Growth landing page",
            members: [
                {
                    name: "Member 1",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
                },
                {
                    name: "Member 2",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
                },
                {
                    name: "Member 3",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
                },
            ],
            progress: 75,
            status: "Awaiting review",
            startDate: "Started on 24 Apr",
        },
        {
            id: 3,
            name: "PM Workspace: Support automation",
            members: [
                {
                    name: "Member 1",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
                },
                {
                    name: "Member 2",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
                },
                {
                    name: "Member 3",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
                },
            ],
            progress: 75,
            status: "On track",
            startDate: "Started on 18 Apr",
        },
    ];

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Paper elevation={0} sx={{ px: 5.5, py: 4, borderRadius: 5 }}>
                {/* Header */}
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 4,
                    }}
                >
                    <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                        PM workspaces
                    </Typography>
                    <CustomButton
                        startIcon={<AddIcon />}
                        onClick={() => setCreatingProject(true)}
                    >
                        Bootstrap PM workspace
                    </CustomButton>
                </Stack>
                <Typography sx={{ mb: 4, color: "text.secondary" }}>
                    PM turns your approved brief into timelines, task
                    breakdowns, work checks, and report-ready updates. Secretary
                    keeps every conversation summarized around the same project.
                </Typography>
                <Typography
                    sx={{ mb: 4, fontSize: 13, color: "text.secondary" }}
                >
                    Backend status:{" "}
                    {backendHealth?.status === "ok"
                        ? "Operational"
                        : "Not Operational" || "checking PM service..."}
                </Typography>

                {/* Projects List */}
                <Stack sx={{ gap: 2 }}>
                    {projects.map((project) => (
                        <ClientProjectCard
                            key={project.id}
                            project={project}
                            isSelected={selectedProjectId === project.id}
                            onClick={() => setSelectedProjectId(project.id)}
                        />
                    ))}
                </Stack>
            </Paper>

            {/* Create Project Modal */}
            <Modal
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                open={isCreatingProject}
                onClose={() => setCreatingProject(false)}
            >
                <ClientProjectForm onClose={() => setCreatingProject(false)} />
            </Modal>
        </Container>
    );
}
