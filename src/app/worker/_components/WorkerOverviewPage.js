"use client";

import {
    Box,
    Collapse,
    Grid,
    IconButton,
    Stack,
    Typography,
    CircularProgress,
} from "@mui/material";
import * as React from "react";
import CustomBarChart from "../../_components/CustomBarChart";
import CustomButton from "../../_components/CustomButton";
import CustomCard from "../../_components/CustomCard";
import CustomChatCard from "../../_components/CustomChatCard";
import CustomDonutChart from "../../_components/CustomDonutChart";
import CollapsibleTitle from "../../_components/CollapsibleTitle";
import ActivitySection, {
    useActivitySection,
} from "../../_components/ActivitySection";

// Icon imports
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function WorkerOverviewPage() {
    const activitySectionHook = useActivitySection();

    return (
        <Box>
            <Stack
                direction="row"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
                <CollapsibleTitle
                    title="Project name"
                    subtitle="Project description"
                    defaultExpanded={false}
                >
                    <Typography>
                        This is the hidden content that appears when expanded.
                    </Typography>
                </CollapsibleTitle>
                <CustomButton startIcon={<AddIcon />}>
                    Submit Your Work
                </CustomButton>
            </Stack>

            <Grid container sx={{ mt: 2.5 }} spacing={2.5}>
                <Grid size={4}>
                    {/* Executive Summary */}
                    <CustomCard title="Executive Summary">
                        <Typography sx={{ mt: 1 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </Typography>
                    </CustomCard>

                    {/* Tasks List */}
                    <CustomCard title="Tasks List" sx={{ mt: 2.5 }}>
                        <Stack sx={{ mt: 1.5, gap: 2 }}>
                            {DEFAULT_TASKS.map((task) => (
                                <TaskListItem 
                                    key={task.id}
                                    title={task.title}
                                    progress={task.progress}
                                />
                            ))}
                        </Stack>
                    </CustomCard>
                </Grid>
                <Grid size={8}>
                    <CustomChatCard title="Messages" />
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
        title: "Design layout mockups",
        progress: 75,
    },
    {
        id: 2,
        title: "Defining User Experience (UX) Goals and Personas",
        progress: 75,
    },
    {
        id: 3,
        title: "Designing UI Wireframes",
        progress: 75,
    },
    {
        id: 4,
        title: "Building Prototypes",
        progress: 75,
    },
];
