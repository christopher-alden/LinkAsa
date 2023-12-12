import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/userContext";
import LoadingPageDisplay from "../components/shared/LoadingPageDisplay";
import CircularProgress from "@mui/material/CircularProgress";


export default function HomePage() {
    const { user, loading } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.push("/dashboard/page");
            } else {
                router.push("/login/page");
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return <LoadingPageDisplay></LoadingPageDisplay>;
    }

    return null;
}
