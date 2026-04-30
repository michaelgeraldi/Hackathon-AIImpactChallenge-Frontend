"use client";

import {
    Box,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
    TextField,
    InputAdornment,
    Divider,
    Button,
    CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";

export default function TalentHomePage() {
    const [searchRole, setSearchRole] = React.useState("");
    const router = useRouter();
    const { showError } = useFeedbackContext();

    const { data: searchData, error: searchError, isLoading } = useSWR(
        searchRole ? ["/talent/profiles/search", searchRole] : null,
        ([url, role]) =>
            apiFetcher(url, {
                method: "POST",
                body: {
                    skills: role ? [role] : [],
                    available_only: true,
                    limit: 20,
                },
            }),
        { revalidateOnFocus: false, dedupingInterval: 5000 }
    );

    const profiles = searchData?.profiles || [];
    const isEmpty = !isLoading && profiles.length === 0 && !searchError;

    const mockProjects = [
        { id: 1, title: "Fintech onboarding squad", candidatesApplied: 12, completedMatchmaking: 5, createdAt: "2026-04-18", createdBy: "Talent Acquisition", roles: ["Frontend Engineer", "QA Analyst"] },
        { id: 2, title: "Marketplace redesign pod", candidatesApplied: 9, completedMatchmaking: 4, createdAt: "2026-04-20", createdBy: "Talent Acquisition", roles: ["Product Designer", "Frontend Engineer"] },
        { id: 3, title: "Ops automation launch", candidatesApplied: 7, completedMatchmaking: 3, createdAt: "2026-04-24", createdBy: "Talent Acquisition", roles: ["Automation Engineer", "Project Coordinator"] },
    ];

    const projects = profiles.length > 0 
        ? profiles.map((profile, index) => ({
            id: profile.profile_id || index,
            title: profile.headline || profile.full_name || "Talent Profile",
            candidatesApplied: profile.skills?.length || 0,
            completedMatchmaking: profile.is_available ? 1 : 0,
            createdAt: profile.created_at?.split("T")[0] || new Date().toISOString().split("T")[0],
            createdBy: "Talent Acquisition",
            roles: profile.skills?.map((s) => s.name).slice(0, 2) || ["Available"],
        }))
        : mockProjects;

    if (searchError) {
        console.error("Failed to fetch profiles:", searchError);
    }

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
                            Talent Acquisition board
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: "#666" }}>
                            Review the roles Talent Acquisition is matching for
                            you. Once you join a squad, PM takes over updates,
                            timelines, and task breakdowns while Secretary keeps
                            meetings and follow-ups summarized.
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
                                Open matches
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
                            {isLoading ? (
                                <Grid size={{ xs: 12 }}>
                                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                                        <CircularProgress />
                                    </Box>
                                </Grid>
                            ) : projects.length === 0 ? (
                                <Grid size={{ xs: 12 }}>
                                    <Box sx={{ textAlign: "center", py: 4 }}>
                                        <Typography sx={{ color: "text.secondary" }}>
                                            No profiles found. Try adjusting your search criteria.
                                        </Typography>
                                    </Box>
                                </Grid>
                            ) : (
                                projects.map((project) => (
                                    <Grid
                                        key={project.id}
                                        size={{ xs: 12, sm: 6, md: 4 }}
                                    >
                                        <ProjectCard
                                            project={project}
                                            onViewPmHandoff={() =>
                                                router.push("/dashboard/talent")
                                            }
                                        />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}

// Project card component
function ProjectCard({ project, onViewPmHandoff }) {
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
                        {project.roles?.[0] || "Frontend Engineer"}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "#666" }}>
                        {project.title}
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
                        {project.candidatesApplied}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 300 }}>
                        Candidates applied
                    </Typography>
                </Box>
                <Divider
                    orientation="vertical"
                    sx={{ color: "primary.main" }}
                    flexItem
                />
                <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontSize: 17, fontWeight: 500 }}>
                        {project.completedMatchmaking}
                    </Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 300 }}>
                        Matchmaking completed
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
                    Managed by <b>{project.createdBy}</b>
                </Typography>
                <Button
                    sx={{ color: "text.primary" }}
                    endIcon={<ChevronRight />}
                    onClick={onViewPmHandoff}
                >
                    View PM handoff
                </Button>
            </Stack>
        </Paper>
    );
}
