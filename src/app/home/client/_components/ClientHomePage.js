"use client";

import {
    Box,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
    Avatar,
    TextField,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomButton from "@/app/_components/CustomButton";
import React from "react";
import { useFeedbackContext } from "@/app/_providers/FeedbackProvider";
import useMutation from "@/app/_hooks/useMutation";
import { apiFetcher } from "@/app/lib/api";
import {
    getWorkspaceSession,
    mergeWorkspaceSession,
} from "@/app/lib/workspace-session";

export default function ClientHomePage() {
    const [searchRole, setSearchRole] = React.useState("");
    const [teamMembers, setTeamMembers] = React.useState(() => {
        if (typeof window !== "undefined") {
            const session = getWorkspaceSession();
            return session.latestMatches || [];
        }
        return [];
    });
    const { showInfo, showError, showSuccess } = useFeedbackContext();
    const { post: createMatchRequest, isLoading } = useMutation("/talent/match");

    const loadRealMatches = React.useCallback(async () => {
        const session = getWorkspaceSession();
        const currentProjectOverview = session.currentProjectOverview;

        if (!session.currentProjectId || !currentProjectOverview) {
            return;
        }

        const requiredSkills = currentProjectOverview.freelancers
            ?.flatMap((freelancer) =>
                freelancer.skills?.length > 0
                    ? freelancer.skills
                    : freelancer.role
                      ? [freelancer.role]
                      : [],
            )
            .filter(Boolean);

        try {
            const response = await createMatchRequest({
                project_id: session.currentProjectId,
                project_description: currentProjectOverview.description,
                required_skills: requiredSkills.length > 0
                    ? requiredSkills
                    : [currentProjectOverview.scope || "Frontend"],
                budget_min: 10,
                budget_max: 100,
                timeline_weeks: 6,
                top_k: 5,
            });

            const matches = response?.matches || [];

            const detailedMatches = await Promise.all(
                matches.map(async (match) => {
                    try {
                        const detail = await apiFetcher(
                            `/talent/matches/${match.match_id}`,
                        );

                        return {
                            id: match.match_id,
                            profileId: detail?.profile?.profile_id || match.profile_id,
                            name: detail?.profile?.full_name || "Matched talent",
                            role:
                                currentProjectOverview.freelancers?.[0]?.role ||
                                "Freelancer",
                            experience: `${Math.round((match.match_score || 0) * 100)}% match score`,
                            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${match.profile_id}`,
                            description:
                                match.match_reasoning ||
                                "Talent Acquisition returned this freelancer as a relevant match.",
                            matchReasoning: match.match_reasoning,
                        };
                    } catch {
                        return {
                            id: match.match_id,
                            profileId: match.profile_id,
                            name: "Matched talent",
                            role:
                                currentProjectOverview.freelancers?.[0]?.role ||
                                "Freelancer",
                            experience: `${Math.round((match.match_score || 0) * 100)}% match score`,
                            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${match.profile_id}`,
                            description:
                                match.match_reasoning ||
                                "Talent Acquisition returned this freelancer as a relevant match.",
                            matchReasoning: match.match_reasoning,
                        };
                    }
                }),
            );

            setTeamMembers(detailedMatches);
            mergeWorkspaceSession({
                latestMatchRequestId: response?.request_id || null,
                latestMatches: detailedMatches,
            });
        } catch (error) {
            showError(error.message || "Failed to load Talent Acquisition matches.");
        }
}, [createMatchRequest, showError]);

    const filteredMembers = teamMembers.filter((member) => {
        const query = searchRole.trim().toLowerCase();

        if (!query) {
            return true;
        }

        return [member.name, member.role, member.description]
            .join(" ")
            .toLowerCase()
            .includes(query);
    });

    const handleViewProfile = async (member) => {
        if (!member.profileId) {
            showInfo("No backend profile is attached to this match yet.");
            return;
        }

        try {
            const response = await apiFetcher(
                `/talent/profiles/${member.profileId}`,
            );
            const profile = response?.profile;

            showSuccess(
                `${profile?.full_name || member.name}: ${profile?.headline || "Profile loaded"}`,
            );
            mergeWorkspaceSession({
                currentProfileId: member.profileId,
                currentTalentProfile: profile || null,
            });
        } catch (error) {
            showError(error.message || "Failed to load the matched talent profile.");
        }
    };

    const handleAskAgent = async (member) => {
        if (member.matchReasoning) {
            showInfo(member.matchReasoning);
            return;
        }

        await loadRealMatches();
    };

    return (
        <Box sx={{ backgroundColor: "#f5f5f5", py: 4 }}>
            <Container maxWidth="xl">
                <Stack sx={{ gap: 4 }}>
                    {/* Project Insights Section */}
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            backgroundColor: "#fff",
                        }}
                    >
                        <Typography
                            sx={{ fontSize: 20, fontWeight: 700, mb: 2 }}
                        >
                            Three-agent hiring flow
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: "#666" }}>
                            Talent Acquisition helps you define the role,
                            shortlist talent, and move the matched team into PM
                            delivery. Once work starts, Secretary keeps meeting
                            notes, chat summaries, and suggested replies tied to
                            the same project context.
                        </Typography>
                    </Paper>

                    {/* Build your team Section */}
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            backgroundColor: "#fff",
                        }}
                    >
                        {/* Section header with title and search */}
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 3,
                            }}
                        >
                            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                                Talent Acquisition shortlist
                            </Typography>
                            <TextField
                                placeholder="Search matched role"
                                value={searchRole}
                                onChange={(e) => setSearchRole(e.target.value)}
                                size="small"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon
                                                    sx={{ color: "#999" }}
                                                />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={{
                                    width: 280,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        backgroundColor: "#f5f5f5",
                                    },
                                }}
                            />
                        </Stack>

                        {/* Team members grid */}
                        <Grid container spacing={3}>
                            {filteredMembers.map((member) => (
                                <Grid
                                    key={member.id}
                                    size={{ xs: 12, sm: 6, md: 4 }}
                                >
                                    <TeamMemberCard
                                        member={member}
                                        isLoading={isLoading}
                                        onViewProfile={() =>
                                            void handleViewProfile(member)
                                        }
                                        onAskAgent={() =>
                                            void handleAskAgent(member)
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}

// Team member card component
function TeamMemberCard({
    member,
    onViewProfile,
    onAskAgent,
    isLoading = false,
}) {
    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#e8ecff",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            {/* Header with avatar, name, and experience */}
            <Stack direction="row" sx={{ alignItems: "flex-start", gap: 2 }}>
                <Avatar
                    src={member.avatar}
                    alt={member.name}
                    sx={{ width: 56, height: 56 }}
                />
                <Stack sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                        {member.name}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "#666" }}>
                        {member.role}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "#999" }}>
                        {member.experience}
                    </Typography>
                </Stack>
            </Stack>

            {/* Description */}
            <Typography sx={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
                {member.description}
            </Typography>

            {/* Action buttons */}
            <Stack
                direction="row"
                sx={{ gap: 2, justifyContent: "space-between" }}
            >
                <CustomButton
                    variant="outlined"
                    sx={{ flex: 1 }}
                    onClick={onViewProfile}
                    disabled={isLoading}
                >
                    View match profile
                </CustomButton>
                <CustomButton
                    variant="outlined"
                    sx={{ flex: 1 }}
                    onClick={onAskAgent}
                    disabled={isLoading}
                >
                    Ask Talent Acquisition
                </CustomButton>
            </Stack>
        </Paper>
    );
}
