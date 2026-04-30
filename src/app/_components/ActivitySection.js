"use client";

import React from "react";
import {
    Box,
    Paper,
    Stack,
    Typography,
    Grid,
    Avatar,
    IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ActivitySection({
    activities,
    daysOfWeek,
    selectedDate,
    onSelectDate,
    title = "Activity",
    dateRange = "Nov 12 - 28",
}) {
    return (
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
                    {title}
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
                        {dateRange}
                    </Typography>
                    <IconButton size="small">
                        <ChevronRightIcon />
                    </IconButton>
                </Stack>
            </Stack>

            <Box
                sx={{
                    borderRadius: 5,
                    border: "1px solid",
                    borderColor: "grey.main",
                }}
            >
                {/* Days of Week */}
                <Grid
                    container
                    spacing={2}
                    sx={{
                        overflowX: "auto",
                        px: 5,
                        py: 2.5,
                        width: "100%",
                    }}
                >
                    {daysOfWeek.map((day, index) => (
                        <Grid key={index} size={1.714}>
                            <Box
                                onClick={() => onSelectDate(index)}
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
                                    sx={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                    }}
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
                        </Grid>
                    ))}
                </Grid>

                {/* Timeline Activities */}
                <Grid
                    container
                    spacing={2.5}
                    sx={{
                        backgroundColor: "#e8ecf5",
                        borderRadius: 3,
                        px: 5,
                        py: 2.5,
                        minHeight: 250,
                        display: "grid",
                        alignContent: "space-around",
                        overflowX: "auto",
                    }}
                >
                    {activities.map((activity, index) => (
                        <Grid
                            key={activity.id}
                            size={12}
                            sx={{
                                display: "flex",
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
                                elevation={1}
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
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Stack>
    );
}

export function useActivitySection() {
    const [selectedDate, setSelectedDate] = React.useState(2);

    const daysOfWeek = [
        { label: "Mon", day: 10 },
        { label: "Tue", day: 11 },
        { label: "Wed", day: 12 },
        { label: "Thu", day: 13 },
        { label: "Fri", day: 14 },
        { label: "Sat", day: 15 },
        { label: "Sun", day: 16 },
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

    return { selectedDate, setSelectedDate, daysOfWeek, activities };
}
