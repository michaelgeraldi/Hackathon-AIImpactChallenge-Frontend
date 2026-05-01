import useSWR from "swr";

export default function useProject(id) {
    const { data, error, isLoading } = useSWR(`/pm/projects/${id}/context`, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return {
        id,
        data,
        snapshot: data?.snapshot || null,
        overview: data?.snapshot?.overview || null,
        isLoading,
        error,
        isError: error,
    };
}
