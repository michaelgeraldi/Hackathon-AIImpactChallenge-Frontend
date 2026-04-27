import { Box, Grid, Typography, Stack, Avatar, Paper } from "@mui/material";
import CustomCard from "../../_components/CustomCard";
import CustomBarChart from "../../_components/CustomBarChart";
import CustomDonutChart from "../../_components/CustomDonutChart";
import CustomChatCard from "../../_components/CustomChatCard";
import CustomButton from "@/app/_components/CustomButton";
import CustomIconButton from "@/app/_components/CustomIconButton";

// Icon imports
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
                    <Grid size={6}>
                        {/* Rank Performance */}
                        <CustomCard title="Rank Performance" />

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
                                        src="/avatars/avatar1.png"
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
                                        src="/avatars/avatar1.png"
                                        sx={{ mt: 1 }}
                                    />
                                </Box>
                            </Box>
                        </CustomCard>
                    </Grid>
                    <Grid size={6}>
                        <CustomCard
                            title="Tozo (AI Agent) Live Feed"
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
                <CustomChatCard />
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
