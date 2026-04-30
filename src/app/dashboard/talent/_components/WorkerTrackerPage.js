"use client";

import { Box } from "@mui/material";
import ActivitySection, {
    useActivitySection,
} from "../../../_components/ActivitySection";

// Icon imports
import CustomCard from "@/app/_components/CustomCard";
import KanbanBoard from "@/app/_components/KanbanBoard";

export default function WorkerTrackerPage() {
    const activitySectionHook = useActivitySection();

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
            <CustomCard sx={{ mb: 3 }}>
                <ActivitySection {...activitySectionHook} />
            </CustomCard>

            {/* Kanban Board */}
            <KanbanBoard columns={kanbanColumns} />
        </Box>
    );
}
