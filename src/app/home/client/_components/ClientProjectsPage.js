"use client";

import CustomButton from "@/app/_components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { Box, Modal, Stack, Typography, Container, Paper } from "@mui/material";
import React from "react";
import ProjectForm from "../../../dashboard/client/_components/ProjectForm";
import ProjectCard from "./ProjectCard";

export default function ClientProjectsPage() {
    const [isCreatingProject, setCreatingProject] = React.useState(false);
    const [selectedProjectId, setSelectedProjectId] = React.useState(null);

    // Mock data - replace with API call
    const projects = [
        {
            id: 1,
            name: "Project Name",
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
            status: "On Track",
            startDate: "Started on 29 Apr",
        },
        {
            id: 2,
            name: "Project Name",
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
            status: "On Track",
            startDate: "Started on 29 Apr",
        },
        {
            id: 3,
            name: "Project Name",
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
            status: "On Track",
            startDate: "Started on 29 Apr",
        },
        {
            id: 4,
            name: "Project Name",
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
            status: "On Track",
            startDate: "Started on 29 Apr",
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
                        Projects
                    </Typography>
                    <CustomButton
                        startIcon={<AddIcon />}
                        onClick={() => setCreatingProject(true)}
                    >
                        Create new project
                    </CustomButton>
                </Stack>
                
                {/* Projects List */}
                <Stack sx={{ gap: 2 }}>
                    {projects.map((project) => (
                        <ProjectCard
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
                <ProjectForm onClose={() => setCreatingProject(false)} />
            </Modal>
        </Container>
    );
}
