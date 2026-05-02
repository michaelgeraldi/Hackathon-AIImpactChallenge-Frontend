"use client";

import React from "react";
import { Box, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from "@mui/material";
import CustomCard from "@/app/_components/CustomCard";
import CustomButton from "@/app/_components/CustomButton";
import KanbanBoard from "@/app/_components/KanbanBoard";
import WorkSubmissionForm from "./WorkSubmissionForm";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { getWorkspaceSession } from "@/app/lib/workspace-session";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";

export default function WorkerTrackerPage() {
    const { showInfo, showSuccess, showError } = useFeedbackContext();
    const [mounted, setMounted] = React.useState(false);

    const session = getWorkspaceSession();
    const projectId = session.project_id;

    const [selectedTask, setSelectedTask] = React.useState(null);
    const [showSubmissionForm, setShowSubmissionForm] = React.useState(false);
    const [showStartConfirm, setShowStartConfirm] = React.useState(false);
    const [startingTask, setStartingTask] = React.useState(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const { data: timelineData, isLoading, mutate } = useSWR(
        projectId ? `/pm/projects/${projectId}/timeline` : null,
        (url) => apiFetcher(url),
        { revalidateOnFocus: false }
    );

    const timelineEntries = timelineData?.timeline?.entries || [];

    const getStatusColumn = (status) => {
        switch (status) {
            case "not_started": return "todo";
            case "in_progress": return "inprogress";
            case "completed": return "completed";
            case "blocked": return "review";
            default: return "todo";
        }
    };

    const handleStartTask = async () => {
        if (!projectId || !startingTask) return;
        
        console.log("Starting task:", startingTask);
        console.log("Project ID:", projectId);
        
        try {
            const response = await apiFetcher(`/pm/projects/${projectId}/tasks/${startingTask.id}/status`, {
                method: "POST",
                body: {
                    status: "in_progress",
                    notes: "Started working on task",
                },
            });
            
            console.log("Response:", response);
            showSuccess(`Started working on "${startingTask.title}"`);
            mutate();
            setShowStartConfirm(false);
            setStartingTask(null);
        } catch (error) {
            console.error("Error starting task:", error);
            showError(error.message || "Failed to start task. Check console for details.");
        }
    };

    const handleTaskClick = (task, columnId) => {
        console.log("Task clicked:", task, "column:", columnId);
        
        if (columnId === "todo") {
            setStartingTask(task);
            setShowStartConfirm(true);
        } else if (columnId === "inprogress") {
            setSelectedTask(task);
            setShowSubmissionForm(true);
        } else if (columnId === "completed") {
            showInfo("This task is already completed");
        } else if (columnId === "review") {
            showInfo("This task is under review by PM");
        }
    };

    const columnsMap = {
        todo: { id: "todo", title: "To Do", color: "#5B63FF", tasks: [] },
        inprogress: { id: "inprogress", title: "In Progress", color: "#FFC107", tasks: [] },
        review: { id: "review", title: "Under Review", color: "#FF7A59", tasks: [] },
        completed: { id: "completed", title: "Completed", color: "#52C77B", tasks: [] },
    };

    timelineEntries.forEach((entry) => {
        const columnId = getStatusColumn(entry.status);
        if (columnsMap[columnId]) {
            columnsMap[columnId].tasks.push({
                id: entry.entry_id,
                category: entry.entry_type === "milestone" ? "PM Milestone" : entry.entry_type === "task" ? "PM Task" : "Deadline",
                title: entry.title,
                assignee: entry.assigned_to || "Unassigned",
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.assigned_to || "unassigned"}`,
                comments: 0,
                attachments: 0,
            });
        }
    });

    const kanbanColumns = Object.values(columnsMap).map(col => ({
        ...col,
        count: col.tasks.length,
    }));

return (
        <Box sx={{ minHeight: "100vh" }}>
            <Typography sx={{ mb: 2, fontWeight: 700, fontSize: 22 }}>
                My Tasks
            </Typography>
            <Typography sx={{ mb: 3, color: "text.secondary" }}>
                Click on any task in "To Do" to start, or "In Progress" to submit for review.
            </Typography>

            {!mounted ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : timelineEntries.length === 0 ? (
                <CustomCard>
                    <Typography sx={{ textAlign: "center", color: "text.secondary", py: 4 }}>
                        No tasks yet. Tasks will appear after PM creates a task breakdown.
                    </Typography>
                </CustomCard>
            ) : (
                <KanbanBoard 
                    columns={kanbanColumns} 
                    onTaskClick={handleTaskClick}
                    showSubmitHint={true}
                />
            )}

            <WorkSubmissionForm
                open={showSubmissionForm}
                onClose={() => {
                    setShowSubmissionForm(false);
                    setSelectedTask(null);
                }}
                task={selectedTask}
                projectId={projectId}
                onSuccess={() => mutate()}
            />

            <Dialog open={showStartConfirm} onClose={() => setShowStartConfirm(false)}>
                <DialogTitle>Start Working on Task?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to start working on "{startingTask?.title}"?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Once started, you'll be able to submit your work for review.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <CustomButton variant="outlined" onClick={() => setShowStartConfirm(false)}>
                        Cancel
                    </CustomButton>
                    <CustomButton onClick={handleStartTask}>
                        Start Task
                    </CustomButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
