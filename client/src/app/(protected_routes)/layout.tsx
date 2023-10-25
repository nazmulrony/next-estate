import AuthGuard from "@/components/auth/AuthGuard";
import { ReactNode } from "react";

type ProtectedLayoutProps = {
    children: ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return <AuthGuard>{children}</AuthGuard>;
}
