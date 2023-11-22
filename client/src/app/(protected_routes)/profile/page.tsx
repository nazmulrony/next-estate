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
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getStorage, ref } from "firebase/storage";
import { app } from "@/firebase/firebase";

export default function Profile() {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | undefined>(undefined);

    const { currentUser } = useSelector(userSelector);
    const form = useForm();

    //file upload api and method

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file: File) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
    };
    return (
        <Container>
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

            <Form {...form}>
                <form className="w-full sm:w-2/4 md:w-[500px] mx-auto flex flex-col gap-2 pb-10">
                    <Input
                        onChange={(e) => setFile(e?.target?.files?.[0])}
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        className="hidden"
                    />
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <Image
                                onClick={() => fileRef.current?.click()}
                                src={currentUser?.avatar}
                                alt="profile image"
                                className="rounded-full self-center cursor-pointer"
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
                                <FormLabel>Username</FormLabel>
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
                    <div className="mt-4 flex flex-col gap-4">
                        <Button type="submit">Update</Button>
                        <Button type="button" className="bg-green-700">
                            Create Listing
                        </Button>
                    </div>
                    <div className=" flex justify-between">
                        <Button variant="link" className="text-red-500 px-0">
                            Delete account
                        </Button>
                        <Button variant="link" className="text-red-500 px-0">
                            Sign out
                        </Button>
                    </div>
                </form>
            </Form>
        </Container>
    );
}
