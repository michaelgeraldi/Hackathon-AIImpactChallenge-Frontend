"use client";

import { Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TalentProjectCard from "./TalentProjectCard";

export default function TalentProjectsPage() {
    const [selectedProjectId, setSelectedProjectId] = React.useState(null);

    // Mock data - replace with API call
    const projects = [
        {
            id: "715d3855-2c6c-4abc-9a92-44400a939798",
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
                </Stack>

                {/* Projects List */}
                <Stack sx={{ gap: 2 }}>
                    {projects.map((project) => (
                        <TalentProjectCard
                            key={project.id}
                            projectId={project.id}
                            project={project}
                            isSelected={selectedProjectId === project.id}
                            onClick={() => setSelectedProjectId(project.id)}
                        />
                    ))}
                </Stack>
            </Paper>
        </Container>
    );
}
