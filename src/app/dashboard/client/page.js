"use client";

import { Box, Collapse, Grid, IconButton, Typography } from "@mui/material";
import * as React from "react";
import { Suspense } from "react";
import CustomCard from "../../_components/CustomCard";
import { useNavigationBarContext } from "../../_components/NavigationBar";
import useProject from "../../_hooks/useProject";
import { getWorkspaceSession } from "../../lib/workspace-session";

// Pages imports
import ClientOverviewPage from "./_components/ClientOverviewPage";
import ClientReportPage from "./_components/ClientReportPage";

// Icon imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClientMessagesPage from "./_components/ClientMessagesPage";
import ClientTrackerPage from "./_components/ClientTrackerPage";

function ClientPageContent() {
    const { active, setActive } = useNavigationBarContext();
    const session = getWorkspaceSession();
    const projectId = session.project_id;
    const { overview } = useProject(projectId);

    if (active === "Project Overview") {
        return <ClientOverviewPage data={overview} />;
    } else if (active === "Task Board") {
        return <ClientTrackerPage />;
    } else if (active === "Meeting Notes") {
        return <ClientReportPage />;
    } else if (active === "Team Chat") {
        return <ClientMessagesPage />;
    }
}

export default function ClientPage() {
    return (
        <Suspense fallback={null}>
            <ClientPageContent />
        </Suspense>
    );
}
