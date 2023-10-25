"use client";

import { userSelector } from "@/redux/user/userSlice";
import { useRouter, redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingState from "../LoadingState";

type AuthGuardProps = {
    children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const { currentUser } = useSelector(userSelector);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentUser?.email) {
            redirect("/sign-in");
        }
        setIsLoading(false);
    }, [currentUser?.email]);

    if (isLoading) {
        return <LoadingState />;
    }

    return children;
}
