"use client";

import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CustomIconButton from "./CustomIconButton";
import SearchField from "./SearchField";
import useMutation from "../_hooks/useMutation";
import { useFeedbackContext } from "../_providers/FeedbackProvider";

// Icon imports
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import SendIcon from "@mui/icons-material/Send";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

const DEFAULT_CONVERSATIONS = [
    {
        id: "conv-secretary-client",
        projectId: "proj-demo-client",
        participantName: "Secretary Assistant",
        participantRole: "Client workspace support",
        preview:
            "Summarize the latest PM updates and suggest a response for the client.",
        timestamp: "Just now",
        messages: [
            {
                id: "msg-1",
                sender: "assistant",
                content:
                    "Secretary summary: two action items should move to PM, one client concern needs a reply today, and the meeting notes are ready to share.",
            },
            {
                id: "msg-2",
                sender: "user",
                content:
                    "Can you summarize today’s thread and highlight anything PM should turn into a task?",
            },
        ],
    },
    {
        id: "conv-secretary-freelancer",
        projectId: "proj-demo-freelancer",
        participantName: "Secretary Assistant",
        participantRole: "Freelancer update support",
        preview:
            "Prepare a cleaner status update before sending it to PM and the project owner.",
        timestamp: "5 min ago",
        messages: [
            {
                id: "msg-3",
                sender: "assistant",
                content:
                    "Secretary can turn your rough update into a PM-ready summary with clearer risks and next steps.",
            },
        ],
    },
];

export default function MessagesCard() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [draft, setDraft] = React.useState("");
    const [conversations, setConversations] = React.useState(DEFAULT_CONVERSATIONS);
    const [selectedConversationId, setSelectedConversationId] = React.useState(
        DEFAULT_CONVERSATIONS[0].id,
    );
    const [suggestions, setSuggestions] = React.useState([]);
    const [toneAnalysis, setToneAnalysis] = React.useState("");
    const [reasoning, setReasoning] = React.useState("");
    const { post, isLoading } = useMutation("/secretary/suggest");
    const { showError, showInfo, showSuccess } = useFeedbackContext();

    const filteredConversations = React.useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return conversations;
        }

        return conversations.filter((conversation) => {
            return [
                conversation.participantName,
                conversation.participantRole,
                conversation.preview,
            ]
                .join(" ")
                .toLowerCase()
                .includes(query);
        });
    }, [conversations, searchQuery]);

    const selectedConversation =
        conversations.find(
            (conversation) => conversation.id === selectedConversationId,
        ) || conversations[0];

    const updateConversationMessages = React.useCallback(
        (conversationId, updater) => {
            setConversations((prevConversations) =>
                prevConversations.map((conversation) => {
                    if (conversation.id !== conversationId) {
                        return conversation;
                    }

                    const nextMessages = updater(conversation.messages);

                    return {
                        ...conversation,
                        preview:
                            nextMessages[nextMessages.length - 1]?.content ||
                            conversation.preview,
                        timestamp: "Just now",
                        messages: nextMessages,
                    };
                }),
            );
        },
        [],
    );

    const requestSecretarySuggestions = React.useCallback(
        async (message) => {
            const trimmedMessage = message.trim();

            if (!trimmedMessage) {
                showInfo(
                    "Type a message first so Secretary can generate reply suggestions.",
                );
                return;
            }

            try {
                const response = await post({
                    project_id: selectedConversation.projectId,
                    conversation_id: selectedConversation.id,
                    current_message: trimmedMessage,
                    context_messages: Math.min(
                        selectedConversation.messages.length,
                        10,
                    ),
                });

                const nextSuggestions = response?.suggestions || [];
                setSuggestions(nextSuggestions);
                setToneAnalysis(response?.tone_analysis || "");
                setReasoning(response?.reasoning || "");

                if (nextSuggestions.length > 0) {
                    updateConversationMessages(
                        selectedConversation.id,
                        (messages) => [
                            ...messages,
                            {
                                id: crypto.randomUUID(),
                                sender: "assistant",
                                content: `Secretary suggestions ready: ${nextSuggestions[0]}`,
                            },
                        ],
                    );
                }

                showSuccess(
                    "Secretary suggestions generated from the backend.",
                );
            } catch (error) {
                showError(
                    error.message ||
                        "Secretary suggestion request failed. Check the backend response.",
                );
            }
        },
        [post, selectedConversation, showError, showInfo, showSuccess, updateConversationMessages],
    );

    const handleSend = async () => {
        const trimmedDraft = draft.trim();

        if (!trimmedDraft) {
            showInfo("Type a message before sending it.");
            return;
        }

        updateConversationMessages(selectedConversation.id, (messages) => [
            ...messages,
            {
                id: crypto.randomUUID(),
                sender: "user",
                content: trimmedDraft,
            },
        ]);

        setDraft("");

        if (trimmedDraft.includes("/secretary")) {
            const cleanedPrompt = trimmedDraft.replace("/secretary", "").trim();
            await requestSecretarySuggestions(cleanedPrompt || trimmedDraft);
            return;
        }

        showSuccess("Message added to the thread.");
    };

    const handleUseSuggestion = (suggestion) => {
        setDraft(suggestion);
        showInfo("Secretary suggestion copied into the composer.");
    };

    const handlePlaceholderAction = (label) => {
        showInfo(`${label} is not connected yet, but the Secretary suggestion flow is live.`);
    };

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
                    minWidth: 0,
                }}
            >
                <Stack sx={{ gap: 3, width: 340, flexShrink: 0 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 24 }}>
                        Secretary chat
                    </Typography>

                    <Box>
                        <SearchField
                            placeholder="Search conversation"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                    </Box>

                    <Stack
                        sx={{
                            maxHeight: "100%",
                            overflowY: "auto",
                            gap: 1.75,
                            flex: 1,
                        }}
                    >
                        {filteredConversations.map((conversation) => (
                            <MessageListItem
                                key={conversation.id}
                                active={conversation.id === selectedConversation.id}
                                conversation={conversation}
                                onClick={() => {
                                    setSelectedConversationId(conversation.id);
                                    setSuggestions([]);
                                    setToneAnalysis("");
                                    setReasoning("");
                                }}
                            />
                        ))}
                    </Stack>
                </Stack>

                <Stack
                    direction="column"
                    sx={{
                        justifyContent: "space-between",
                        gap: 3,
                        flex: 1,
                        height: "100%",
                        minHeight: 0,
                        minWidth: 0,
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
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
                                    {selectedConversation.participantName}
                                </Typography>
                                <Typography sx={{ fontWeight: 300 }}>
                                    {selectedConversation.participantRole}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <CustomIconButton
                                icon={<VideocamOutlinedIcon />}
                                onClick={() =>
                                    handlePlaceholderAction("Video meeting")
                                }
                            />
                            <CustomIconButton
                                icon={<CallOutlinedIcon />}
                                onClick={() => handlePlaceholderAction("Voice call")}
                            />
                        </Stack>
                    </Stack>

                    <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
                        <Stack
                            sx={{
                                gap: 2,
                                maxHeight: "100%",
                                overflowY: "auto",
                                pr: 1,
                            }}
                        >
                            {selectedConversation.messages.map((message) => (
                                <MessageBubble
                                    key={message.id}
                                    isSentByUser={message.sender === "user"}
                                    content={message.content}
                                />
                            ))}
                        </Stack>
                    </Box>

                    {(suggestions.length > 0 || toneAnalysis || reasoning) && (
                        <Box
                            sx={{
                                borderRadius: 4,
                                p: 3,
                                backgroundColor: "grey.main",
                            }}
                        >
                            <Typography sx={{ fontWeight: 700, mb: 1 }}>
                                Secretary suggestions
                            </Typography>
                            {toneAnalysis && (
                                <Typography
                                    sx={{ fontSize: 13, color: "text.secondary", mb: 1 }}
                                >
                                    Tone: {toneAnalysis}
                                </Typography>
                            )}
                            {reasoning && (
                                <Typography
                                    sx={{ fontSize: 13, color: "text.secondary", mb: 2 }}
                                >
                                    {reasoning}
                                </Typography>
                            )}
                            <Stack sx={{ gap: 1.5 }}>
                                {suggestions.map((suggestion, index) => (
                                    <Box
                                        key={`${selectedConversation.id}-${index}`}
                                        sx={{
                                            borderRadius: 3,
                                            backgroundColor: "white",
                                            p: 2,
                                        }}
                                    >
                                        <Typography sx={{ lineHeight: 1.6 }}>
                                            {suggestion}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            sx={{ mt: 1.5, justifyContent: "space-between" }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: 12,
                                                    color: "text.secondary",
                                                }}
                                            >
                                                From `/secretary/suggest`
                                            </Typography>
                                            <Typography
                                                onClick={() => handleUseSuggestion(suggestion)}
                                                sx={{
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: "primary.main",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Use suggestion
                                            </Typography>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )}

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
                            <TextField
                                fullWidth
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" && !event.shiftKey) {
                                        event.preventDefault();
                                        void handleSend();
                                    }
                                }}
                                placeholder="Type /secretary to generate suggestions from the backend..."
                                variant="standard"
                                multiline
                                maxRows={4}
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
                            <Stack direction="row" sx={{ gap: 0.25, mt: 1.25 }}>
                                <CustomIconButton
                                    icon={<AttachFileOutlinedIcon />}
                                    iconSize={24}
                                    bgColor="transparent"
                                    onClick={() =>
                                        handlePlaceholderAction("Attachment upload")
                                    }
                                />
                                <CustomIconButton
                                    icon={<ImageOutlinedIcon />}
                                    iconSize={24}
                                    bgColor="transparent"
                                    onClick={() => handlePlaceholderAction("Image upload")}
                                />
                                <CustomIconButton
                                    icon={<EmojiEmotionsOutlinedIcon />}
                                    iconSize={24}
                                    bgColor="transparent"
                                    onClick={() => handlePlaceholderAction("Emoji picker")}
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
                                loading={isLoading}
                                onClick={() => requestSecretarySuggestions(draft)}
                                icon={
                                    <Stack
                                        direction="row"
                                        sx={{
                                            alignItems: "center",
                                            gap: 0.75,
                                        }}
                                    >
                                        <AutoAwesomeIcon sx={{ fontSize: 18 }} />
                                        <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
                                            /secretary
                                        </Typography>
                                    </Stack>
                                }
                            />
                            <CustomIconButton
                                bgColor="violet.main"
                                sx={{
                                    px: 1.75,
                                    py: 1.25,
                                    color: "white",
                                }}
                                onClick={() => void handleSend()}
                                icon={<SendIcon sx={{ fontSize: 20 }} />}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
}

function MessageListItem({ active, conversation, onClick }) {
    return (
        <Stack
            direction="row"
            onClick={onClick}
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

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                    }}
                >
                    <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 600 }} noWrap>
                            {conversation.participantName}
                        </Typography>
                        <Typography sx={{ fontWeight: 300 }} noWrap>
                            {conversation.participantRole}
                        </Typography>
                    </Box>
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                        {conversation.timestamp}
                    </Typography>
                </Stack>

                <Typography sx={{ mt: 2 }} noWrap>
                    {conversation.preview}
                </Typography>
            </Box>
        </Stack>
    );
}

function MessageBubble({ content, isSentByUser }) {
    return (
        <Box
            sx={{
                alignSelf: isSentByUser ? "flex-end" : "flex-start",
                maxWidth: "85%",
                backgroundColor: isSentByUser
                    ? "background.default"
                    : "secondary.main",
                px: 3,
                py: 2,
                borderRadius: 2,
            }}
        >
            <Typography sx={{ lineHeight: 1.7 }}>{content}</Typography>
        </Box>
    );
}
