"use client";

import CustomButton from "@/app/_components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { Box, Modal, Stack, Typography, Container, Paper } from "@mui/material";
import React from "react";
import ClientProjectForm from "./ClientProjectForm";
import ClientProjectCard from "./ClientProjectCard";
import { projects } from "@/app/lib/mockup";

export default function ClientProjectsPage() {
    const [isCreatingProject, setCreatingProject] = React.useState(false);
    const [selectedProjectId, setSelectedProjectId] = React.useState(null);

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
