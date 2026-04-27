"use client";

import React, { useState } from "react";
import {
    Box,
    Stack,
    Typography,
    Tabs,
    Tab,
    Paper,
    Avatar,
    AvatarGroup,
    IconButton,
    Chip,
    Card,
    CardContent,
    LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ClientTrackerPage() {
    const [selectedDate, setSelectedDate] = useState(2);

    const daysOfWeek = [
        { label: "Mon", day: 10 },
        { label: "Tue", day: 11 },
        { label: "Wed", day: 12 },
        { label: "Thu", day: 13 },
        { label: "Fri", day: 14 },
        { label: "Fri", day: 14 },
        { label: "Fri", day: 14 },
        { label: "Fri", day: 14 },
        { label: "Fri", day: 14 },
    ];

    const activities = [
        {
            id: 1,
            title: "Wireframe Setup",
            date: "12 Nov, Wed",
            progress: 75,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
        },
        {
            id: 2,
            title: "Wireframe Setup",
            date: "13 Nov, Thu",
            progress: 75,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
        },
        {
            id: 3,
            title: "Wireframe Setup",
            date: "14 Nov, Fri",
            progress: 75,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
        },
        {
            id: 4,
            title: "Wireframe Setup",
            date: "14 Nov, Fri",
            progress: 75,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
        },
    ];

    const kanbanColumns = [
        {
            id: "todo",
            title: "To Do",
            color: "#5B63FF",
            count: 4,
            tasks: [
                {
                    id: 1,
                    category: "UX Design",
                    title: "Web UI Kit Automation",
                    assignee: "Abdul",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abdul",
                    comments: 65,
                    attachments: 70,
                },
            ],
        },
        {
            id: "inprogress",
            title: "In Progress",
            color: "#FFC107",
            count: 4,
            tasks: [
                {
                    id: 1,
                    category: "UX Design",
                    title: "Web UI Kit Automation",
                    assignee: "Abdul",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abdul",
                    comments: 65,
                    attachments: 70,
                },
            ],
        },
        {
            id: "review",
            title: "Under Review",
            color: "#FF7A59",
            count: 4,
            tasks: [
                {
                    id: 1,
                    category: "UX Design",
                    title: "Web UI Kit Automation",
                    assignee: "Abdul",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abdul",
                    comments: 65,
                    attachments: 70,
                },
            ],
        },
        {
            id: "completed",
            title: "Completed",
            color: "#52C77B",
            count: 4,
            tasks: [
                {
                    id: 1,
                    category: "UX Design",
                    title: "Web UI Kit Automation",
                    assignee: "Abdul",
                    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=abdul",
                    comments: 65,
                    attachments: 70,
                },
            ],
        },
    ];

    return (
        <Box sx={{ minHeight: "100vh" }}>
            {/* Activity Section */}
            <Paper
                elevation={0}
                sx={{
                    px: 4.5,
                    py: 2.5,
                    borderRadius: 5,
                    mb: 4,
                    backgroundColor: "white",
                }}
            >
                <Stack sx={{ gap: 3 }}>
                    {/* Date Navigation */}
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                            Activity
                        </Typography>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                gap: 2,
                                borderRadius: 999,
                                backgroundColor: "background.input",
                            }}
                        >
                            <IconButton size="small">
                                <ChevronLeftIcon />
                            </IconButton>
                            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                                Nov 12 - 28
                            </Typography>
                            <IconButton size="small">
                                <ChevronRightIcon />
                            </IconButton>
                        </Stack>
                    </Stack>

                    {/* Days of Week */}
                    <Stack
                        direction="row"
                        sx={{ gap: 2, overflowX: "auto", pb: 2 }}
                    >
                        {daysOfWeek.map((day, index) => (
                            <Box
                                key={index}
                                onClick={() => setSelectedDate(index)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 50,
                                    height: 70,
                                    borderRadius: 3,
                                    cursor: "pointer",
                                    backgroundColor:
                                        selectedDate === index
                                            ? "#2c1e5c"
                                            : "transparent",
                                    color:
                                        selectedDate === index
                                            ? "white"
                                            : "text.primary",
                                    transition: "all 0.2s",
                                    "&:hover": {
                                        backgroundColor:
                                            selectedDate === index
                                                ? "#2c1e5c"
                                                : "#f0f0f0",
                                    },
                                    flexShrink: 0,
                                }}
                            >
                                <Typography
                                    sx={{ fontSize: 12, fontWeight: 500 }}
                                >
                                    {day.label}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        mt: 0.5,
                                    }}
                                >
                                    {day.day}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>

                    {/* Timeline Activities */}
                    <Box
                        sx={{
                            backgroundColor: "#e8ecf5",
                            borderRadius: 3,
                            p: 3,
                            minHeight: 250,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                        }}
                    >
                        {activities.map((activity, index) => (
                            <Stack
                                key={activity.id}
                                direction="row"
                                sx={{
                                    alignItems: "center",
                                    gap: 2,
                                    marginLeft: `${index * 100}px`,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 60,
                                        height: 60,
                                        borderRadius: "50%",
                                        backgroundColor: "white",
                                        border: "3px solid #5B63FF",
                                        fontSize: 12,
                                        fontWeight: 600,
                                    }}
                                >
                                    {activity.progress}%
                                </Box>

                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        backgroundColor: "white",
                                        minWidth: 250,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                            }}
                                        >
                                            {activity.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: 12,
                                                color: "text.secondary",
                                                mt: 0.5,
                                            }}
                                        >
                                            {activity.date}
                                        </Typography>
                                    </Box>
                                    <Avatar
                                        src={activity.avatar}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                </Paper>
                            </Stack>
                        ))}
                    </Box>
                </Stack>
            </Paper>

            {/* Kanban Board */}
            <Stack direction="row" sx={{ gap: 2, overflowX: "auto" }}>
                {kanbanColumns.map((column) => (
                    <Box
                        key={column.id}
                        sx={{
                            flex: "0 0 auto",
                            width: 280,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {/* Column Header */}
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                gap: 1,
                                backgroundColor: "white",
                                p: 2,
                                borderRadius: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: column.color,
                                    color: "white",
                                    py: 0.75,
                                    px: 1.5,
                                    borderRadius: 2,
                                    fontSize: 13,
                                    fontWeight: 600,
                                }}
                            >
                                {column.title}
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "#FF4444",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: 24,
                                    height: 24,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 12,
                                    fontWeight: 600,
                                }}
                            >
                                {column.count}
                            </Box>
                            <Stack
                                direction="row"
                                sx={{ ml: "auto", gap: 0.5 }}
                            >
                                <IconButton size="small">
                                    <AddIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                                <IconButton size="small">
                                    <MoreHorizIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </Stack>
                        </Stack>

                        {/* Task Cards */}
                        {column.tasks.map((task) => (
                            <Card
                                key={task.id}
                                elevation={0}
                                sx={{
                                    backgroundColor: "white",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: 2,
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Stack sx={{ gap: 1.5 }}>
                                        <Chip
                                            label={task.category}
                                            size="small"
                                            sx={{
                                                backgroundColor: "#e8e8ff",
                                                color: "#5B63FF",
                                                fontSize: 11,
                                                fontWeight: 500,
                                                width: "fit-content",
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 14,
                                            }}
                                        >
                                            {task.title}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                sx={{
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <Avatar
                                                    src={task.avatar}
                                                    sx={{
                                                        width: 28,
                                                        height: 28,
                                                    }}
                                                />
                                                <Typography
                                                    sx={{ fontSize: 12 }}
                                                >
                                                    {task.assignee}
                                                </Typography>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                sx={{
                                                    gap: 1.5,
                                                    fontSize: 12,
                                                    color: "text.secondary",
                                                }}
                                            >
                                                <Stack
                                                    direction="row"
                                                    sx={{
                                                        alignItems: "center",
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <Box sx={{ fontSize: 14 }}>
                                                        💬
                                                    </Box>
                                                    {task.comments}
                                                </Stack>
                                                <Stack
                                                    direction="row"
                                                    sx={{
                                                        alignItems: "center",
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <Box sx={{ fontSize: 14 }}>
                                                        📎
                                                    </Box>
                                                    {task.attachments}
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
