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

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string(),
    password: z.string().min(6, {
        message: "password must be at least 6 characters",
    }),
});

export default function SignUpPage() {
    const router = useRouter();
    //states
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await Axios.post("/auth/signup", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Signup successful:", res.data);
            router.push("/sign-in");
        } catch (error: any) {
            console.error("Signup failed:", error?.response?.data?.message);
            setError(error?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Container>
                <div className="max-w-lg mx-auto my-16 ">
                    <h1 className="text-3xl text-center font-semibold  ">
                        Sign Up
                    </h1>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4  "
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                placeholder="username"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                Sign up
                            </Button>
                        </form>
                        <p className="mt-4">
                            Have an account ?
                            <Link href="/sign-in">
                                <Button
                                    variant="link"
                                    color="blue"
                                    className="text-blue-500 m-0 px-2"
                                >
                                    Sign in
                                </Button>
                            </Link>
                        </p>
                    </Form>
                </div>
            </Container>
        </div>
    );
}
