"use client";

import CustomButton from "@/app/_components/CustomButton";
import CustomIconButton from "@/app/_components/CustomIconButton";
import { Avatar, Box, Grid, Paper, Stack, Typography, CircularProgress } from "@mui/material";
import CustomCard from "../../../_components/CustomCard";
import CustomChatCard from "../../../_components/CustomChatCard";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import useSWR from "swr";
import { apiFetcher } from "@/app/lib/api";
import { getWorkspaceSession } from "@/app/lib/workspace-session";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ClientReportPage() {
    const { showInfo } = useFeedbackContext();
    const session = getWorkspaceSession();
    const projectId = session.project_id;

    const { data: reportData, isLoading, error } = useSWR(
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
        { revalidateOnFocus: false }
    );

    const report = reportData?.result;
    const contextRecord = reportData?.context_record;

    return (
        <Grid container sx={{ mt: 2.5 }} spacing={2.5}>
            <Grid size={7}>
{/* Executive Summary */}
                <CustomCard title="PM Executive Summary">
                    {isLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : report ? (
                        <Typography>
                            {report.summary || "No summary available"}
                        </Typography>
                    ) : (
                        <Typography>
                            No report available. Create a project and generate a report to see data here.
                        </Typography>
                    )}
                </CustomCard>

                <Grid container spacing={2.5} sx={{ mt: 2.5 }}>
                    <Grid
                        size={6}
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        {/* Rank Performance */}
                        <CustomCard sx={{ flex: 1 }} title="PM work checker">
                            <Stack sx={{ gap: 2.5, mt: 2 }}>
                                {[1, 2, 3].map((rank) => (
                                    <Stack
                                        key={rank}
                                        direction="row"
                                        sx={{
                                            alignItems: "center",
                                            gap: 2,
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        {/* Rank and Profile */}
                                        <Stack
                                            direction="row"
                                            sx={{
                                                alignItems: "center",
                                                gap: 2,
                                                flex: 1,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: 12,
                                                }}
                                            >
                                                {rank}
                                            </Typography>
                                            <Avatar
                                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=abdul"
                                                sx={{ width: 48, height: 48 }}
                                            />
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    Abdul
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: 12,
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    Frontend Engineer
                                                </Typography>
                                            </Box>
                                        </Stack>

                                        {/* Stats */}
                                        <Stack
                                            direction="row"
                                            sx={{
                                                gap: 3,
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box sx={{ textAlign: "center" }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    95%
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: 12,
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    Delivery score
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: "center" }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: 14,
                                                        color: "success.main",
                                                    }}
                                                >
                                                    Positive
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: 12,
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    Checker status
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </CustomCard>

                        {/* Task in Progress */}
                        <CustomCard sx={{ mt: 2.5 }} title="PM active timeline">
                            <Box sx={{ mt: 1.5 }}>
                                <Box>
                                    <Typography
                                        sx={{ fontWeight: 600, fontSize: 12 }}
                                    >
                                        Homepage polish handoff
                                    </Typography>
                                    <Avatar
                                        alt="User 1"
                                        src="https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=ffffff&seed=abdul"
                                        sx={{ mt: 1 }}
                                    />
                                </Box>
                                <Box sx={{ mt: 1.5 }}>
                                    <Typography
                                        sx={{ fontWeight: 400, fontSize: 12 }}
                                    >
                                        Thursday, 13 November 2026
                                    </Typography>
                                    <Avatar
                                        alt="User 1"
                                        src="https://api.dicebear.com/7.x/avataaars/svg?backgroundColor=ffffff&seed=abdul"
                                        sx={{ mt: 1 }}
                                    />
                                </Box>
                            </Box>
                        </CustomCard>
                    </Grid>
                    <Grid size={6}>
                        <CustomCard
                            title="Secretary live feed"
                            subtitle="MoM, summaries, and response suggestions prepared for this workspace"
                        >
                            <Stack sx={{ mt: 3, gap: 5 }}>
                                <AiReportItem onReview={() => showInfo("Secretary highlighted this update as ready for a client-facing review.")} />
                                <AiReportItem onReview={() => showInfo("Secretary suggested turning this summary into a PM escalation before sending it out.")} />
                            </Stack>
                        </CustomCard>
                    </Grid>
                </Grid>
            </Grid>

            {/* AI Chat Card */}
            <Grid size={5}>
                <Stack sx={{ height: "100%" }}>
                    <Box sx={{ flex: 1, display: "flex" }}>
                        <CustomChatCard title="Secretary chat summary" />
                    </Box>
                    <Paper
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 2.5,
                            px: 4,
                            py: 2.5,
                            borderRadius: 999,
                        }}
                    >
                        <CustomIconButton icon={<ChevronLeftIcon />} />
                        <Typography>Secretary Report - Week 1</Typography>
                        <CustomIconButton icon={<ChevronRightIcon />} />
                    </Paper>
                </Stack>
            </Grid>
        </Grid>
    );
}

function AiReportItem({ onReview }) {
    return (
        <Box>
            <Typography sx={{ fontWeight: 500 }}>
                Secretary summarized the latest standup, extracted the PM risk
                list, and drafted a client-facing update so the team can reply
                faster.
            </Typography>
            <CustomButton sx={{ mt: 2 }} onClick={onReview}>
                Review suggestion
            </CustomButton>
        </Box>
    );
}
