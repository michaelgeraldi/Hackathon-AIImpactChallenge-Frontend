"use client";

import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useActivitySection } from "../../../_components/ActivitySection";
import CollapsibleTitle from "../../../_components/CollapsibleTitle";
import CustomButton from "../../../_components/CustomButton";
import CustomCard from "../../../_components/CustomCard";
import CustomChatCard from "../../../_components/CustomChatCard";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { getWorkspaceSession } from "@/app/lib/workspace-session";

import AddIcon from "@mui/icons-material/Add";

export default function TalentOverviewPage({ data }) {
    const activitySectionHook = useActivitySection();
    const { showSuccess } = useFeedbackContext();

    const tasks = [
        {title: "Ship hero section polish", progress: 75},
        {title: "Break navigation fixes into reviewable subtasks", progress: 75},
        {title: "Prepare PM update for work checker", progress: 75},
        {title: "Review Secretary summary before client reply", progress: 75},
    ];

    return (
        <Box>
            <Stack
                direction="row"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
                <CollapsibleTitle
                    title="PM delivery cockpit"
                    subtitle="Task breakdowns, progress updates, and Secretary-supported communication"
                    defaultExpanded={false}
                >
                    <Typography>
                        PM organizes the work into clear tasks. Secretary turns
                        meetings and chat threads into concise summaries you can
                        act on quickly.
                    </Typography>
                </CollapsibleTitle>
                <CustomButton
                    startIcon={<AddIcon />}
                    onClick={() =>
                        showSuccess(
                            "Submitted to PM work checker. The next step is scope review and feedback from the checker queue.",
                        )
                    }
                >
                    Submit to PM work checker
                </CustomButton>
            </Stack>

            <Grid container sx={{ mt: 2.5 }} spacing={2.5}>
                <Grid size={4}>
                    {/* Executive Summary */}
                    <CustomCard title="PM weekly focus">
                        <Typography sx={{ mt: 1 }}>
                            Your PM has prioritized the current sprint around
                            finishing the homepage, checking quality, and
                            packaging a clean progress update for the client.
                        </Typography>
                    </CustomCard>

                    {/* Tasks List */}
                    <CustomCard title="PM task breakdown" sx={{ mt: 2.5 }}>
                        <Stack sx={{ mt: 1.5, gap: 2 }}>
                            {false ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        py: 2,
                                    }}
                                >
                                    <CircularProgress size={24} />
                                </Box>
                            ) : tasks.length === 0 ? (
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        textAlign: "center",
                                    }}
                                >
                                    No tasks yet. Tasks will appear after PM
                                    creates a task breakdown.
                                </Typography>
                            ) : (
                                tasks.map((task) => (
                                    <TaskListItem
                                        key={task.id}
                                        title={task.title}
                                        progress={task.progress}
                                    />
                                ))
                            )}
                        </Stack>
                    </CustomCard>
                </Grid>
                <Grid size={8}>
                    <CustomChatCard title="Secretary chat summary" />
                </Grid>
            </Grid>
        </Box>
    );
}

function TaskListItem({ title, progress }) {
    return (
        <Stack
            direction="row"
            sx={{
                alignItems: "center",
                gap: 2,
            }}
        >
            {/* Circular Progress */}
            <Box
                sx={{
                    position: "relative",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={60}
                    thickness={4}
                    sx={{
                        color: "primary.main",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "violet.main",
                        }}
                    >
                        {progress}%
                    </Typography>
                </Box>
            </Box>

            {/* Task Title */}
            <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                {title}
            </Typography>
        </Stack>
    );
}

const DEFAULT_TASKS = [
    {
        id: 1,
        title: "Ship hero section polish",
        progress: 75,
    },
    {
        id: 2,
        title: "Break navigation fixes into reviewable subtasks",
        progress: 75,
    },
    {
        id: 3,
        title: "Prepare PM update for work checker",
        progress: 75,
    },
    {
        id: 4,
        title: "Review Secretary summary before client reply",
        progress: 75,
    },
];
