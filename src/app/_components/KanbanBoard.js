import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

// Icon imports
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function KanbanBoard({ columns }) {
    return (
        <Paper elevation={1} sx={{ borderRadius: 5 }}>
            <Stack
                direction="row"
                sx={{
                    gap: 2,
                    px: 5.5,
                    py: 4,
                    overflowX: "auto",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {columns.map((column) => (
                    <Box
                        key={column.id}
                        sx={{
                            width: 280,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                            flex: 1,
                        }}
                    >
                        {/* Column Header */}
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                gap: 1,
                                borderBottom: "",
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
                                                    <Box
                                                        sx={{
                                                            fontSize: 14,
                                                        }}
                                                    >
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
                                                    <Box
                                                        sx={{
                                                            fontSize: 14,
                                                        }}
                                                    >
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
        </Paper>
    );
}
