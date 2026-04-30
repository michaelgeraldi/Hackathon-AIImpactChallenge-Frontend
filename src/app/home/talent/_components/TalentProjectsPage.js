"use client";

import { Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import TalentProjectCard from "./TalentProjectCard";
import { projects } from "@/app/lib/mockup";

export default function TalentProjectsPage() {
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
