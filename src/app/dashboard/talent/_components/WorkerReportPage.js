import { Box, Stack, Typography, Grid, CircularProgress } from "@mui/material";
import CustomCard from "../../../_components/CustomCard";

// Icon imports
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";

export default function WorkerReportPage() {
    return (
        <Grid container spacing={5.5}>
            <Grid size={4}>
                <Box>
                    <CustomCard title="Task Completetion" sx={{ flex: 1 }}>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                gap: 4,
                                mt: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: 120,
                                    height: 120,
                                }}
                            >
                                <CircularProgress
                                    variant="determinate"
                                    value={60}
                                    size={120}
                                    thickness={3}
                                    sx={{ color: "#5B63FF" }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 32,
                                            fontWeight: 600,
                                            color: "#1a1a2e",
                                        }}
                                    >
                                        60%
                                    </Typography>
                                </Box>
                            </Box>
                            <Stack sx={{ gap: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: 18,
                                        fontWeight: 500,
                                        color: "#1a1a2e",
                                    }}
                                >
                                    24/60 tasks completed
                                </Typography>
                            </Stack>
                        </Stack>
                    </CustomCard>

                    <CustomCard
                        title="Training Recommendations"
                        sx={{ flex: 1, mt: 5.5 }}
                    >
                        <Stack sx={{ gap: 2.5, mt: 2 }}>
                            <TrainingItem
                                icon={<DesignServicesOutlinedIcon />}
                                title="Inclusive Design Standards"
                                description="This module teaches designers how to achieve maximum scores in accessibility audits"
                            />
                            <TrainingItem
                                icon={<DesignServicesOutlinedIcon />}
                                title="Inclusive Design Standards"
                                description="This module teaches designers how to achieve maximum scores in accessibility audits"
                            />
                        </Stack>
                    </CustomCard>
                </Box>
            </Grid>
            <Grid size={4}>
                <CustomCard title="Feedback from AI" sx={{ height: "100%" }}>
                    <Typography sx={{ mt: 2 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                        <br />
                        <br />
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit.
                    </Typography>
                </CustomCard>
            </Grid>
            <Grid size={4}>
                <CustomCard
                    title="Feedback from Project Owner"
                    sx={{ height: "100%" }}
                >
                    <Typography sx={{ mt: 2 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                        <br />
                        <br />
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit.
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
