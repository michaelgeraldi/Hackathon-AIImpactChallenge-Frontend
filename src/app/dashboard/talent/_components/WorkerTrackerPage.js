"use client";

import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ActivitySection, {
    useActivitySection,
} from "../../../_components/ActivitySection";

import CustomCard from "@/app/_components/CustomCard";
import KanbanBoard from "@/app/_components/KanbanBoard";
import WorkSubmissionForm from "./WorkSubmissionForm";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { getWorkspaceSession } from "@/app/lib/workspace-session";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";

export default function WorkerTrackerPage() {
    const activitySectionHook = useActivitySection();
    const { showInfo } = useFeedbackContext();

    const session = getWorkspaceSession();
    const projectId = session.project_id;

    const [selectedTask, setSelectedTask] = React.useState(null);
    const [showSubmissionForm, setShowSubmissionForm] = React.useState(false);

    const { data: timelineData, isLoading } = useSWR(
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

    const handleTaskClick = (task, columnId) => {
        if (columnId === "inprogress") {
            setSelectedTask(task);
            setShowSubmissionForm(true);
        } else if (columnId === "todo") {
            showInfo("Start working on this task to submit it for review");
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
                Click on any task in "In Progress" to submit your work for review.
            </Typography>

            {isLoading ? (
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
            />
        </Box>
    );
}
