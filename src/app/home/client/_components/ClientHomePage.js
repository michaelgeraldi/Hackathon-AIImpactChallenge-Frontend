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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomButton from "@/app/_components/CustomButton";
import React from "react";

export default function ClientHomePage() {
    const [searchRole, setSearchRole] = React.useState("");

    // Mock team members data
    const teamMembers = [
        {
            id: 1,
            name: "Abdul",
            role: "UX Designer",
            experience: "3+ years exp.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abdul",
            description:
                "Dedicated to bridging the gap between user empathy and business strategy through the creation of intuitive, data-driven digital experiences.",
        },
        {
            id: 2,
            name: "Abdul",
            role: "UX Designer",
            experience: "3+ years exp.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abdul2",
            description:
                "Dedicated to bridging the gap between user empathy and business strategy through the creation of intuitive, data-driven digital experiences.",
        },
        {
            id: 3,
            name: "Abdul",
            role: "UX Designer",
            experience: "3+ years exp.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abdul3",
            description:
                "Dedicated to bridging the gap between user empathy and business strategy through the creation of intuitive, data-driven digital experiences.",
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
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon
                                                sx={{ color: "#999" }}
                                            />
                                        </InputAdornment>
                                    ),
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
                            {teamMembers.map((member) => (
                                <Grid
                                    key={member.id}
                                    size={{ xs: 12, sm: 6, md: 4 }}
                                >
                                    <TeamMemberCard member={member} />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}

// Team member card component
function TeamMemberCard({ member }) {
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
                <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ width: 56, height: 56 }}
                />
                <Stack sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                        {member.name}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "#666" }}>
                        {member.role}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "#999" }}>
                        {member.experience}
                    </Typography>
                </Stack>
            </Stack>

            {/* Description */}
            <Typography sx={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
                {member.description}
            </Typography>

            {/* Action buttons */}
            <Stack
                direction="row"
                sx={{ gap: 2, justifyContent: "space-between" }}
            >
                <CustomButton variant="outlined" sx={{ flex: 1 }}>
                    View CV
                </CustomButton>
                <CustomButton variant="outlined" sx={{ flex: 1 }}>
                    Message
                </CustomButton>
            </Stack>
        </Paper>
    );
}
