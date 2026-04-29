import { Box, Stack, Typography, Grid } from "@mui/material";
import CustomCard from "../../../_components/CustomCard";

// Icon imports
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";

export default function WorkerReportPage() {
    return (
        <Grid container spacing={5.5}>
            <Grid item size={4}>
                <Box>
                    <CustomCard
                        title="Task Completetion"
                        sx={{ flex: 1 }}
                    ></CustomCard>
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
            <Grid item size={4}>
                <CustomCard
                    title="Feedback from AI"
                    sx={{ height: "100%" }}
                ></CustomCard>
            </Grid>
            <Grid item size={4}>
                <CustomCard
                    title="Feedback from Project Owner"
                    sx={{ height: "100%" }}
                ></CustomCard>
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
