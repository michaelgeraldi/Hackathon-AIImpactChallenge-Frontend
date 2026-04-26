import {
    Box,
    Grid,
    Typography,
    Stack,
    Card,
    CardContent,
    TextField,
} from "@mui/material";
import CustomCard from "./CustomCard";
import CustomTextField from "./CustomTextField";
import CustomIconButton from "../_components/CustomIconButton";

// Icon imports
import AddIcon from "@mui/icons-material/Add";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

export default function CustomChatCard() {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                height: "100%",
                backgroundColor: "background.paper",
            }}
        >
            <CardContent sx={{ height: "100%" }}>
                <Stack sx={{ height: "100%", gap: 1 }}>
                    <Box
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography sx={{ px: 2}}>
                            Hi,
                            <br /> How can I help you?
                        </Typography>
                    </Box>
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
            </CardContent>
        </Card>
    );
}
