import { useUserContext } from "../context/userContext"

export function useDashboardPage() {
    const user = useUserContext();


    return { User: user.User }
}