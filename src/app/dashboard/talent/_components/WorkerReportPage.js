import { Box, Stack, Typography, Grid, CircularProgress } from "@mui/material";
import { Box, Stack, Typography, Grid, CircularProgress } from "@mui/material";
import CustomCard from "../../../_components/CustomCard";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { getWorkspaceSession } from "@/app/lib/workspace-session";

export default function WorkerReportPage() {
    const session = getWorkspaceSession();
    const projectId = session.project_id;

    const { data: reportData, isLoading } = useSWR(
        projectId ? ["/pm/reports", projectId] : null,
        ([url, pid]) => apiFetcher(url, {
            method: "POST",
            body: {
                project_id: pid,
                cadence: "weekly",
                days_since_last_report: 7,
                requester_notes: "Get freelancer status report",
            },
        }),
        { revalidateOnFocus: false }
    );

    const report = reportData?.result;

    return (
        <Grid container spacing={2.5}>
            <Grid size={4}>
                <Box>
                    <CustomCard
                        title="Secretary delivery summary"
                        sx={{ flex: 1 }}
                    >
                        <Typography>
                            Secretary condensed the sprint into a freelancer-ready recap so you can see which updates PM will escalate and which ones need a direct reply.
                        </Typography>
                    </CustomCard>
                    <CustomCard
                        title="Improvement references"
                        sx={{ flex: 1, mt: 5.5 }}
                    >
                        <Stack sx={{ gap: 2.5, mt: 2 }}>
                            <TrainingItem
                                icon={<DesignServicesOutlinedIcon />}
                                title="PM quality checklist"
                                description="Use the PM work checker rubric to tighten scope alignment, references, and acceptance-criteria coverage before resubmission."
                            />
                            <TrainingItem
                                icon={<DesignServicesOutlinedIcon />}
                                title="Secretary client-update notes"
                                description="Review the Secretary summary before replying so your update stays aligned with the project timeline and current decisions."
                            />
                        </Stack>
                    </CustomCard>
                </Box>
            </Grid>
<Grid size={4}>
                <CustomCard
                    title="PM work checker feedback"
                    sx={{ height: "100%" }}
                >
                    {isLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : report ? (
                        <Stack sx={{ gap: 2 }}>
                            <Typography>
                                {report.summary || "No feedback available"}
                            </Typography>
                            {report.wins && report.wins.length > 0 && (
                                <Box>
                                    <Typography sx={{ fontWeight: 600, fontSize: 12 }}>Wins</Typography>
                                    {report.wins.map((win, i) => (
                                        <Typography key={i} sx={{ fontSize: 12 }}>{win}</Typography>
                                    ))}
                                </Box>
                            )}
                            {report.upcoming_actions && report.upcoming_actions.length > 0 && (
                                <Box>
                                    <Typography sx={{ fontWeight: 600, fontSize: 12 }}>Next Actions</Typography>
                                    {report.upcoming_actions.map((action, i) => (
                                        <Typography key={i} sx={{ fontSize: 12 }}>{action}</Typography>
                                    ))}
                                </Box>
                            )}
                        </Stack>
                    ) : (
                        <Typography>No feedback yet. Reports will appear after project is created.</Typography>
                    )}
                </CustomCard>
            </Grid>
            <Grid size={4}>
                <CustomCard
                    title="Project owner feedback"
                    sx={{ height: "100%" }}
                >
                    <Typography>
                        The client wants clearer rollout notes and a tighter explanation of what changed since the last PM update.
                    </Typography>
                </CustomCard>
            </Grid>
        </Grid>
    );
}

function TrainingItem({ icon, title, description }) {
    return (
        <Box
            sx={{
                gap: 2.5,
                backgroundColor: "#f5f5f5",
                p: 2.5,
                borderRadius: 3,
                alignItems: "flex-start",
            }}
        >
            <Stack
                direction="row"
                sx={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 0.75,
                }}
            >
                <Box
                    sx={{
                        fontSize: 32,
                        flexShrink: 0,
                    }}
                >
                    {icon}
                </Box>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: 16,
                    }}
                >
                    {title}
                </Typography>
            </Stack>
            <Typography
                sx={{
                    fontSize: 14,
                    color: "text.secondary",
                    lineHeight: 1.5,
                }}
            >
                {description}
            </Typography>
        </Box>
    );
}
