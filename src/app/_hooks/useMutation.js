// hooks/useApiMutation.js
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../lib/api";

export default function useMutation(url, options = {}) {
    const { trigger, data, error, isMutating } = useSWRMutation(
        url,
        mutationFetcher,
        options,
    );

    const post = async (body, extra = {}) => {
        return await trigger({ method: "POST", body, ...extra });
    };

    const put = async (body, extra = {}) => {
        return await trigger({ method: "PUT", body, ...extra });
    };

    const del = async (body, extra = {}) => {
        return await trigger({ method: "DELETE", body, ...extra });
    };

    return {
        post,
        put,
        del,
        data,
        error,
        isLoading: isMutating,
    };
}
