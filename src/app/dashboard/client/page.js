"use client";

import { Box, Collapse, Grid, IconButton, Typography } from "@mui/material";
import * as React from "react";
import CustomCard from "../../_components/CustomCard";
import { useNavigationBarContext } from "../../_components/NavigationBar";
import useProject from "../../_hooks/useProject";

// Pages imports
import ClientOverviewPage from "./_components/ClientOverviewPage";
import ClientReportPage from "./_components/ClientReportPage";

// Icon imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClientMessagesPage from "./_components/ClientMessagesPage";
import ClientTrackerPage from "./_components/ClientTrackerPage";
import { useSearchParams } from "next/navigation";

export default function ClientPage() {
    const { active, setActive } = useNavigationBarContext();
    const searchParams = useSearchParams()
    const projectId = searchParams?.get("projectId");
    const { overview } = useProject(projectId);

    if (active === "PM Updates") {
        return <ClientOverviewPage data={overview} />;
    } else if (active === "PM Tasks") {
        return <ClientTrackerPage />;
    } else if (active === "Secretary Reports") {
        return <ClientReportPage />;
    } else if (active === "Secretary Chat") {
        return <ClientMessagesPage />;
    }
}
