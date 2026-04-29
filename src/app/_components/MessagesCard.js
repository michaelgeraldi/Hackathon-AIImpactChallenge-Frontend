import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomIconButton from "./CustomIconButton";
import SearchField from "./SearchField";

// Icon imports
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SendIcon from "@mui/icons-material/Send";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import TextField from "@mui/material/TextField";

export default function MessagesCard() {
    return (
        <Paper
            elevation={0}
            sx={{
                py: 5,
                px: 5.5,
                borderRadius: 5,
                height: "80vh",
                display: "flex",
            }}
        >
            <Stack
                direction="row"
                sx={{
                    alignItems: "stretch",
                    justifyContent: "space-between",
                    gap: 6,
                    flex: 1,
                }}
            >
                {/* Sidebar */}
                <Stack sx={{ gap: 3 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 24 }}>
                        Messages
                    </Typography>

                    {/* Search bar */}
                    <Box>
                        <SearchField />
                    </Box>

                    {/* Messages List */}
                    <Stack
                        sx={{
                            maxHeight: "100%",
                            overflowY: "scroll",
                            gap: 1.75,
                            flex: 1,
                        }}
                    >
                        {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                            <MessageListItem key={index} />
                        ))}
                    </Stack>
                </Stack>

                {/* Chat Box */}
                <Stack
                    direction="column"
                    sx={{
                        justifyContent: "space-between",
                        gap: 5,
                        flex: 1,
                        height: "100%",
                        minHeight: 0,
                    }}
                >
                    {/* Chat Header */}
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Friend's Profile */}
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                            }}
                        >
                            <Avatar />
                            <Box>
                                <Typography sx={{ fontWeight: 600 }}>
                                    John Doe
                                </Typography>
                                <Typography sx={{ fontWeight: 300 }}>
                                    UI/UX Designer
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Chat Actions */}
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContet: "space-between",
                                gap: 1.5,
                            }}
                        >
                            <CustomIconButton icon={<VideocamOutlinedIcon />} />
                            <CustomIconButton icon={<CallOutlinedIcon />} />
                        </Stack>
                    </Stack>

                    {/* Chat Content */}
                    <Box sx={{ flex: 1, minHeight: 0 }}>
                        <Stack
                            sx={{
                                gap: 3,
                                maxHeight: "100%",
                                overflowY: "scroll",
                            }}
                        >
                            {[0, 1, 2, 3, 4, 5, 6].map((item, index) => (
                                <MessageBubble
                                    isSentByUser={index % 2 === 0}
                                    key={index}
                                />
                            ))}
                        </Stack>
                    </Box>

                    {/* Chat Input */}
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            backgroundColor: "white",
                            border: "1px solid",
                            borderColor: "violet.main",
                            borderRadius: 10,
                            px: 3,
                            py: 2,
                            width: "100%",
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            {/* Input Field */}
                            <TextField
                                fullWidth
                                placeholder="Type a message..."
                                variant="standard"
                                sx={{
                                    "& .MuiInput-root": {
                                        fontSize: 14,
                                    },
                                    "& .MuiInput-root:before, & .MuiInput-root:after":
                                        {
                                            borderBottom: "none !important",
                                        },
                                }}
                            />
                            {/* Action Icons */}
                            <Stack direction="row" sx={{ gap: 0.25, mt: 1.25 }}>
                                <CustomIconButton
                                    icon={<AttachFileOutlinedIcon />}
                                    iconSize={24}
                                    bgColor="transparent"
                                />
                                <CustomIconButton
                                    icon={<ImageOutlinedIcon />}
                                    iconSize={24}
                                    bgColor="transparent"
                                />
                                <CustomIconButton
                                    icon={<EmojiEmotionsOutlinedIcon />}
                                    iconSize={24}
                                    bgColor="transparent"
                                />
                            </Stack>
                        </Box>

                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 2,
                            }}
                        >
                            <CustomIconButton
                                sx={{ px: 1.75, py: 1.25 }}
                                icon={
                                    <Typography sx={{ fontWeight: 600 }}>
                                        AI
                                    </Typography>
                                }
                            />
                            <CustomIconButton
                                bgColor="violet.main"
                                sx={{
                                    px: 1.75,
                                    py: 1.25,
                                    color: "white",
                                }}
                                icon={<SendIcon sx={{ fontSize: 20 }} />}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}

function MessageListItem({ active }) {
    return (
        <Stack
            direction="row"
            sx={{
                borderRadius: 5,
                backgroundColor: active
                    ? "secondary.main"
                    : "background.default",
                py: 2.5,
                px: 3,
                gap: 3,
                alignItems: "flex-start",
                justifyContent: "space-between",
                cursor: "pointer",
            }}
        >
            <Avatar />

            {/* Message Info */}
            <Box sx={{ flex: 1 }}>
                {/* Sender Information */}
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Typography sx={{ fontWeight: 600 }}>
                            John Doe
                        </Typography>
                        <Typography sx={{ fontWeight: 300 }}>
                            UI/UX Designer
                        </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                        Just Now
                    </Typography>
                </Stack>

                {/* Message Preview */}
                <Typography sx={{ mt: 2 }}>Makan dimana siang ini?</Typography>
            </Box>
        </Stack>
    );
}

function MessageBubble({ message, isSentByUser }) {
    return (
        <Box
            sx={{
                backgroundColor: isSentByUser
                    ? "background.default"
                    : "secondary.main",
                px: 3,
                py: 2,
                borderRadius: 2,
            }}
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            auctor diam at enim efficitur, a efficitur nisl bibendum. Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque.
        </Box>
    );
}
