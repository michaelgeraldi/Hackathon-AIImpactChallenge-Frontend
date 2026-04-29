// hooks/useApiMutation.js
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../lib/apiClient";

export default function useMutation(url, options = {}) {
    const { trigger, data, error, isMutating } = useSWRMutation(
        url,
        mutationFetcher,
        options,
    );

    const post = (body, extra = {}) => {
        console.log(
            "Triggering POST mutation with body:",
            body,
            "and extra options:",
            extra,
        );
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
