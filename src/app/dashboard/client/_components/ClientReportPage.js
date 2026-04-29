import CustomButton from "@/app/_components/CustomButton";
import CustomIconButton from "@/app/_components/CustomIconButton";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import CustomCard from "../../../_components/CustomCard";
import CustomChatCard from "../../../_components/CustomChatCard";

// Icon imports
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ClientReportPage() {
    return (
        <Grid container sx={{ mt: 2.5 }} spacing={2.5}>
            <Grid size={7}>
                {/* Executive Summary */}
                <CustomCard title="Executive Summary">
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </Typography>
                </CustomCard>

                <Grid container spacing={2.5} sx={{ mt: 2.5 }}>
                    <Grid
                        size={6}
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        {/* Rank Performance */}
                        <CustomCard sx={{ flex: 1 }} title="Rank Performance">
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
                                                    UX Designer
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
                                                    Punctuality
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
                                                    Feedback
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </CustomCard>

                        {/* Task in Progress */}
                        <CustomCard sx={{ mt: 2.5 }} title="Task in Progress">
                            <Box sx={{ mt: 1.5 }}>
                                <Box>
                                    <Typography
                                        sx={{ fontWeight: 600, fontSize: 12 }}
                                    >
                                        Wireframe Setup
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
                            title="Kira (AI Agent) Live Feed"
                            subtitle="What our agent has been doing for you"
                        >
                            <Stack sx={{ mt: 3, gap: 5 }}>
                                <AiReportItem />
                                <AiReportItem />
                            </Stack>
                        </CustomCard>
                    </Grid>
                </Grid>
            </Grid>

            {/* AI Chat Card */}
            <Grid size={5}>
                <Stack sx={{ height: "100%" }}>
                    <Box sx={{ flex: 1, display: "flex" }}>
                        <CustomChatCard />
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
                        <Typography>Report Week 1</Typography>
                        <CustomIconButton icon={<ChevronRightIcon />} />
                    </Paper>
                </Stack>
            </Grid>
        </Grid>
    );
}

function AiReportItem() {
    return (
        <Box>
            <Typography sx={{ fontWeight: 500 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <CustomButton sx={{ mt: 2 }}>Action</CustomButton>
        </Box>
    );
}
