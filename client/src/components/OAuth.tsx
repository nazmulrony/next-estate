"use client";

import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase/firebase";
import { Axios } from "@/lib/axios";

export default function OAuth() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            };

            Axios.post("/api/auth/google", userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full gap-2 bg-white text-slate-900 border hover:bg-slate-50"
        >
            <FcGoogle className="text-xl" />
            Continue with google
        </Button>
    );
}
