import {
    Box,
    CardContent,
    Stack,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import CustomIconButton from "../_components/CustomIconButton";

// Icon imports
import AddIcon from "@mui/icons-material/Add";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

export default function CustomChatCard() {
    return (
        <Paper
            elevation={1}
            sx={{
                borderRadius: 3,
                height: "100%",
                flex: 1,
                p: 2,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Stack
                sx={{
                    height: "100%",
                    gap: 1,
                    alignItems: "stretch",
                    justifyContent: "space-between",
                }}
            >
                {/* Chat Messages */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography sx={{ px: 2 }}>
                        Hi,
                        <br /> How can I help you?
                    </Typography>
                </Box>

                {/* Chat Input */}
                <Stack
                    direction="row"
                    spacing="3px"
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: 999,
                        backgroundColor: "background.input",
                        px: 2,
                        py: 2.5,
                    }}
                >
                    <CustomIconButton icon={<AddIcon />} />
                    <TextField
                        placeholder="Type your message here..."
                        fullWidth
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                            "& .MuiOutlinedInput-root": {
                                padding: 0,
                            },
                            "& .MuiOutlinedInput-input": {
                                padding: 0,
                            },
                        }}
                    />
                    <CustomIconButton icon={<KeyboardVoiceIcon />} />
                </Stack>
            </Stack>
        </Paper>
    );
}
