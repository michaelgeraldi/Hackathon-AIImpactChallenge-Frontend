"use client";

import {
    Box,
    Grid,
    Paper,
    Stack,
    Typography,
    CircularProgress,
    Chip,
} from "@mui/material";
import CustomCard from "../../../_components/CustomCard";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { getWorkspaceSession } from "@/app/lib/workspace-session";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function ClientWeeklyUpdatesPage() {
    const { showError, showInfo } = useFeedbackContext();
    const session = getWorkspaceSession();
    const projectId = session.project_id;

    const {
        data: reportData,
        isLoading,
        error,
    } = useSWR(
        projectId ? ["/pm/reports", projectId] : null,
        ([url, pid]) => apiFetcher(url, {
            method: "POST",
            body: {
                project_id: pid,
                cadence: "weekly",
                days_since_last_report: 7,
                requester_notes: "Get project status report",
            },
        }),
        { revalidateOnFocus: false },
    );

    const report = reportData?.result;

    const getStatusColor = (status) => {
        switch (status) {
            case "on_track":
                return "success";
            case "watch":
                return "warning";
            case "at_risk":
                return "error";
            default:
                return "default";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "on_track":
                return <CheckCircleIcon />;
            case "watch":
                return <WarningIcon />;
            case "at_risk":
                return <ErrorIcon />;
            default:
                return <TrendingUpIcon />;
        }
    };

    if (!projectId) {
        return (
            <Box sx={{ mt: 2 }}>
                <Typography color="text.secondary">
                    No project selected. Select a project to view reports.
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container sx={{ mt: 2 }} spacing={3}>
            <Grid size={8}>
                {isLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                        <Typography color="error">
                            Failed to load report. Please try again.
                        </Typography>
                    </Paper>
                ) : report ? (
                    <>
                        <Paper sx={{ p: 3, mb: 3 }}>
                            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                                <Typography variant="h5" fontWeight={700}>
                                    Weekly Project Report
                                </Typography>
                                <Chip
                                    icon={getStatusIcon(report.overall_status)}
                                    label={report.overall_status?.replace("_", " ").toUpperCase()}
                                    color={getStatusColor(report.overall_status)}
                                    size="small"
                                />
                            </Stack>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Summary
                                </Typography>
                                <Typography variant="body1">
                                    {report.summary || "No summary available"}
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography fontWeight={600} gutterBottom>
                                            Progress
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="h4" fontWeight={700}>
                                                {report.progress_percent || 0}%
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid size={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography fontWeight={600} gutterBottom>
                                            Key Wins
                                        </Typography>
                                        {report.wins?.length > 0 ? (
                                            <Stack spacing={1}>
                                                {report.wins.map((win, i) => (
                                                    <Typography key={i} variant="body2">
                                                        ✓ {win}
                                                    </Typography>
                                                ))}
                                            </Stack>
                                        ) : (
                                            <Typography variant="body2" color="text.secondary">
                                                No wins recorded yet
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid size={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography fontWeight={600} gutterBottom>
                                            Blockers
                                        </Typography>
                                        {report.blockers?.length > 0 ? (
                                            <Stack spacing={1}>
                                                {report.blockers.map((blocker, i) => (
                                                    <Typography key={i} variant="body2" color="error.main">
                                                        ⚠ {blocker}
                                                    </Typography>
                                                ))}
                                            </Stack>
                                        ) : (
                                            <Typography variant="body2" color="text.secondary">
                                                No blockers
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>
                                <Grid size={6}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography fontWeight={600} gutterBottom>
                                            Risks
                                        </Typography>
                                        {report.risks?.length > 0 ? (
                                            <Stack spacing={1}>
                                                {report.risks.map((risk, i) => (
                                                    <Typography key={i} variant="body2" color="warning.main">
                                                        ⚡ {risk}
                                                    </Typography>
                                                ))}
                                            </Stack>
                                        ) : (
                                            <Typography variant="body2" color="text.secondary">
                                                No risks identified
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 2 }}>
                                <Typography fontWeight={600} gutterBottom>
                                    Upcoming Actions
                                </Typography>
                                {report.upcoming_actions?.length > 0 ? (
                                    <Stack spacing={1}>
                                        {report.upcoming_actions.map((action, i) => (
                                            <Typography key={i} variant="body2">
                                                → {action}
                                            </Typography>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No upcoming actions
                                    </Typography>
                                )}
                            </Box>

                            {report.morale_coaching?.length > 0 && (
                                <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                                    <Typography fontWeight={600} gutterBottom>
                                        💡 Team Notes
                                    </Typography>
                                    {report.morale_coaching.map((note, i) => (
                                        <Typography key={i} variant="body2">
                                            {note}
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                        </Paper>
                    </>
                ) : (
                    <Paper sx={{ p: 3, textAlign: "center" }}>
                        <Typography color="text.secondary">
                            No report data available. Create tasks first to generate reports.
                        </Typography>
                    </Paper>
                )}
            </Grid>

            <Grid size={4}>
                <CustomCard title="Quick Stats">
                    <Stack spacing={2}>
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="h3" fontWeight={700} color="primary.main">
                                {report?.progress_percent || 0}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Overall Progress
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="h4" fontWeight={700}>
                                {report?.wins?.length || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Wins This Week
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="h4" fontWeight={700} color={report?.blockers?.length > 0 ? "error.main" : "success.main"}>
                                {report?.blockers?.length || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Blockers
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <Typography variant="h4" fontWeight={700} color={report?.risks?.length > 0 ? "warning.main" : "text.secondary"}>
                                {report?.risks?.length || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Risks
                            </Typography>
                        </Box>
                    </Stack>
                </CustomCard>
            </Grid>
        </Grid>
    );
}