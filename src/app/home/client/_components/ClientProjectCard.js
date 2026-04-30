"use client";

import {
    Box,
    Paper,
    Stack,
    Typography,
    AvatarGroup,
    Avatar,
    CircularProgress,
} from "@mui/material";
import CustomButton from "@/app/_components/CustomButton";
import { useRouter } from "next/navigation";
import useProject from "@/app/_hooks/useProject";

export default function ProjectCard({ project, isSelected = false, onClick }) {
    const context = useProject(project.id);
    const router = useRouter();

    return (
        <Paper
            onClick={onClick}
            sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#f0f3ff",
                border: isSelected ? "3px solid #5B63FF" : "none",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                    boxShadow: 3,
                },
            }}
        >
            <Stack
                direction="row"
                sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 3,
                }}
            >
                {/* Project Name */}
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 16,
                        minWidth: 150,
                    }}
                >
                    {context?.overview?.project_name || "Project Name"}
                </Typography>

                {/* Team Members */}
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        gap: 1,
                        minWidth: 200,
                    }}
                >
                    <AvatarGroup
                        max={3}
                        sx={{
                            "& .MuiAvatarGroup-avatar": {
                                width: 32,
                                height: 32,
                            },
                        }}
                    >
                        {project.members.slice(0, 3).map((member, index) => (
                            <Avatar
                                key={index}
                                src={member.avatar}
                                alt={member.name}
                                sx={{ width: 32, height: 32 }}
                            />
                        ))}
                    </AvatarGroup>
                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                        {project.members.length} people
                    </Typography>
                </Stack>

                {/* Progress */}
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        gap: 1.5,
                        minWidth: 120,
                    }}
                >
                    <Box sx={{ position: "relative", width: 50, height: 50 }}>
                        <CircularProgress
                            variant="determinate"
                            value={project.progress}
                            size={50}
                            thickness={4}
                            sx={{ color: "#5B63FF" }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                                {project.progress}%
                            </Typography>
                        </Box>
                    </Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                        Progress
                    </Typography>
                </Stack>

                {/* Status */}
                <Stack sx={{ minWidth: 100, gap: 0.5 }}>
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                        Status
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                        {project.status}
                    </Typography>
                </Stack>

                {/* Started Date */}
                <Stack sx={{ minWidth: 130, gap: 0.5 }}>
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                        Started
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                        {project.startDate}
                    </Typography>
                </Stack>

                <Box>
                    <CustomButton
                        variant="outlined"
                        onClick={() =>
                            router.push(
                                "/dashboard/client?projectId=" + context?.id,
                            )
                        }
                    >
                        Dashboard
                    </CustomButton>
                </Box>
            </Stack>
        </Paper>
    );
}
