"use client";

import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import ActivitySection, {
    useActivitySection,
} from "../../../_components/ActivitySection";

import CustomCard from "@/app/_components/CustomCard";
import KanbanBoard from "@/app/_components/KanbanBoard";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { getWorkspaceSession } from "@/app/lib/workspace-session";

export default function ClientTrackerPage() {
    const activitySectionHook = useActivitySection();

    const session = getWorkspaceSession();
    const projectId = session.project_id;

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
                PM task board
            </Typography>
            <Typography sx={{ mb: 3, color: "text.secondary" }}>
                Follow PM assignments, review queues, and the Secretary reporting handoff in one board.
            </Typography>
            {/* Activity Section */}
            <CustomCard elevation={0} sx={{ mb: 3 }}>
                <ActivitySection {...activitySectionHook} />
            </CustomCard>

            {/* Kanban Board */}
            {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress />
                </Box>
            ) : timelineEntries.length === 0 ? (
                <CustomCard>
                    <Typography sx={{ textAlign: "center", color: "text.secondary", py: 4 }}>
                        No tasks yet. Create a project and generate a task breakdown to see tasks here.
                    </Typography>
                </CustomCard>
            ) : (
                <KanbanBoard columns={kanbanColumns} />
            )}
        </Box>
    );
}
