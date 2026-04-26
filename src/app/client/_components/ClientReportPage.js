import { Box, Grid } from "@mui/material";
import CustomCard from "../../_components/CustomCard";
import CustomBarChart from "../../_components/CustomBarChart";
import CustomDonutChart from "../../_components/CustomDonutChart";
import CustomChatCard from "../../_components/CustomChatCard";

export default function ClientReportPage() {
    return (
        <Grid container sx={{ mt: 2.5 }} spacing={2.5}>
            <Grid size={7}>
                {/* Executive Summary */}
                <CustomCard title="Executive Summary">
                </CustomCard>

                <Grid container spacing={2.5} sx={{ mt: 2.5 }}>
                    <Grid size={6}>
                        {/* Rank Performance */}
                        <CustomCard title="Project Progress" />

                        {/* Task in Progress */}
                        <CustomCard sx={{ mt: 2.5 }} title="Task in Progress" />
                    </Grid>
                    <Grid size={6}>
                        <CustomCard title="Tozo (AI Agent) Live Feed" />
                    </Grid>
                </Grid>

            </Grid>

            {/* AI Chat Card */}
            <Grid size={5}>
                <CustomChatCard />
            </Grid>
        </Grid>
    );
}
