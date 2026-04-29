// hooks/useApiMutation.js
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../lib/api";

export default function useMutation(url, options = {}) {
    const { trigger, data, error, isMutating } = useSWRMutation(
        url,
        mutationFetcher,
        options,
    );

    const post = (body, extra = {}) => {
        trigger({ method: "POST", body, ...extra });
    };

    const put = (body, extra = {}) =>
        trigger({ method: "PUT", body, ...extra });

    const del = (body, extra = {}) =>
        trigger({ method: "DELETE", body, ...extra });

    return {
        post,
        put,
        del,
        data,
        error,
        isLoading: isMutating,
    };
}
