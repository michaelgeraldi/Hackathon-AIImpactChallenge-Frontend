import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export default function TasksList({ tasks = DEFAULT_TASKS }) {
    return (
        <Stack sx={{ gap: 2 }}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    title={task.title}
                    progress={task.progress}
                />
            ))}
        </Stack>
    );
}

function TaskItem({ title, progress }) {
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
                        color: "violet.main",
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
