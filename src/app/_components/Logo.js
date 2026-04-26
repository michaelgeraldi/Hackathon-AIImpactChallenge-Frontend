import { Box, Typography, Paper } from "@mui/material";

export default function Logo() {
    return (
        <Paper
            sx={{
                px: 7.5,
                py: 1.5,
                backgroundColor: "background.paper",
                width: "fit-content",
                borderRadius: 4
            }}
            elevation={0}
        >
            <Typography
                sx={{ fontSize: 24, fontWeight: 600, color: "tertiary.main" }}
            >
                Keroyokin.id
            </Typography>
        </Paper>
    );
}
