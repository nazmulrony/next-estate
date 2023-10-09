"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
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

const formSchema = z
    .object({
        username: z.string({ required_error: "username is required" }).min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string({ required_error: "Email is required" }),
    })
    .required();

export default function SignUpPage() {
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = () => {};
    return (
        <div>
            <h1 className="text-3xl text-center font-semibold my-7  ">
                Sign Up
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 max-w-lg mx-auto"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
