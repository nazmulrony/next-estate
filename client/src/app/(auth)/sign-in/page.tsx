"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Axios } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
    signInFailure,
    signInStart,
    signInSuccess,
    userSelector,
} from "@/redux/user/userSlice";
import OAuth from "@/components/OAuth";

const formSchema = z.object({
    email: z.string(),
    password: z.string().min(6, {
        message: "password must be at least 6 characters",
    }),
});

export default function SignInPage() {
    const router = useRouter();

    const { currentUser, error, isLoading } = useSelector(userSelector);
    const dispatch = useDispatch();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        dispatch(signInStart());

        try {
            const res = await Axios.post("/auth/signin", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(res);
            // console.log("Sign in successful:", res.data);
            dispatch(signInSuccess(res.data));
            router.push("/");
        } catch (error: any) {
            console.log(error);
            dispatch(signInFailure(error?.response?.data?.message));
        }
    };

    // console.log(isLoading);

    return (
        <div>
            <Container>
                <div className="max-w-lg mx-auto my-16  ">
                    <h1 className="text-3xl text-center font-semibold  ">
                        Sign In
                    </h1>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4  "
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                required
                                                placeholder="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                required
                                                placeholder="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}
                            <Button type="submit" className="w-full">
                                {isLoading && (
                                    <Loader2
                                        color="white"
                                        className="mr-2 h-4 w-4 animate-spin"
                                    />
                                )}
                                Sign in
                            </Button>
                            <OAuth />
                        </form>
                        <p className="mt-4">
                            New to Next Estate?
                            <Link href="/sign-up">
                                <Button
                                    variant="link"
                                    color="blue"
                                    className="text-blue-500 m-0 px-2"
                                >
                                    Sign up
                                </Button>
                            </Link>
                        </p>
                    </Form>
                </div>
            </Container>
        </div>
    );
}
