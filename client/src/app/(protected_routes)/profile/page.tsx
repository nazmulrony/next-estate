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
import { userSelector } from "@/redux/user/userSlice";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function Profile() {
    const { currentUser } = useSelector(userSelector);
    const form = useForm();
    return (
        <Container>
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

            <Form {...form}>
                <form className="w-full sm:w-2/4 md:w-[500px] mx-auto flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <Image
                                src={currentUser?.avatar}
                                alt="profile image"
                                className="rounded-full mx-auto"
                                width={100}
                                height={100}
                                {...field}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
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
                                <FormLabel>Email</FormLabel>
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
                    <div className="mt-4 flex flex-col gap-4">
                        <Button type="submit">Update</Button>
                        <Button type="button">Create Listing</Button>
                    </div>
                </form>
            </Form>
        </Container>
    );
}
