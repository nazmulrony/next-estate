"use client";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Container from "@/components/Container";
import Link from "next/link";

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
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
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
                            <Button type="submit" className="w-full">
                                Submit
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
