"use client";

import {
    Box,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
    Avatar,
    TextField,
    InputAdornment,
    Divider,
    Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomButton from "@/app/_components/CustomButton";
import React from "react";
import { ChevronRight } from "@mui/icons-material";

export default function TalentHomePage() {
    const [searchRole, setSearchRole] = React.useState("");

    const projects = [
        {
            id: 1,
            title: "Project A",
            candidatesAppiled: 55,
            completedInterview: 18,
            createdAt: "2024-05-01",
            createdBy: "John Doe",
            roles: ["UX Designer", "Frontend Developer"],
        },
        {
            id: 2,
            title: "Project A",
            candidatesAppiled: 55,
            completedInterview: 18,
            createdAt: "2024-05-01",
            createdBy: "John Doe",
            roles: ["UX Designer", "Frontend Developer"],
        },
        {
            id: 3,
            title: "Project A",
            candidatesAppiled: 55,
            completedInterview: 18,
            createdAt: "2024-05-01",
            createdBy: "John Doe",
            roles: ["UX Designer", "Frontend Developer"],
        },
    ];

    return (
        <Box sx={{ backgroundColor: "#f5f5f5", py: 4 }}>
            <Container maxWidth="xl">
                <Stack sx={{ gap: 4 }}>
                    {/* Project Insights Section */}
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            backgroundColor: "#fff",
                        }}
                    >
                        <Typography
                            sx={{ fontSize: 20, fontWeight: 700, mb: 2 }}
                        >
                            Project Insights
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: "#666" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum
                        </Typography>
                    </Paper>

                    {/* Build your team Section */}
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            backgroundColor: "#fff",
                        }}
                    >
                        {/* Section header with title and search */}
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 3,
                            }}
                        >
                            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                                Build your team
                            </Typography>
                            <TextField
                                placeholder="Search Role"
                                value={searchRole}
                                onChange={(e) => setSearchRole(e.target.value)}
                                size="small"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon
                                                    sx={{ color: "#999" }}
                                                />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={{
                                    width: 280,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        backgroundColor: "#f5f5f5",
                                    },
                                }}
                            />
                        </Stack>

                        {/* Team members grid */}
                        <Grid container spacing={3}>
                            {projects.map((project) => (
                                <Grid
                                    key={project.id}
                                    size={{ xs: 12, sm: 6, md: 4 }}
                                >
                                    <ProjectCard project={project} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}

// Project card component
function ProjectCard({ project }) {
    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#e8ecff",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {/* Header with avatar, name, and experience */}
            <Stack direction="row" sx={{ alignItems: "flex-start", gap: 2 }}>
                <Stack sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                        {project.role?.[0] || "UX Designer"}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "#666" }}>
                        2 weeks ago
                    </Typography>
                </Stack>
            </Stack>

            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 2,
                    px: 3,
                    py: 2,
                    gap: 4,
                }}
            >
                <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontSize: 17, fontWeight: 500 }}>
                        55
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 300 }}>
                        Candidates Applied
                    </Typography>
                </Box>
                <Divider
                    orientation="vertical"
                    sx={{ color: "primary.main" }}
                    flexItem
                />
                <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontSize: 17, fontWeight: 500 }}>
                        18
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 300 }}>
                        Candidates Interviewed
                    </Typography>
                </Box>
            </Stack>

            {/* Action buttons */}
            <Stack
                direction="row"
                sx={{
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography sx={{ fontSize: 12, fontWeight: 13 }}>
                    Created by <b>Abdul</b>
                </Typography>
                <Button
                    sx={{ color: "text.primary" }}
                    endIcon={<ChevronRight />}
                >
                    View Details
                </Button>
            </Stack>
        </Paper>
    );
}
