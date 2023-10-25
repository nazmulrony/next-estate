"use client";

import Image from "next/image";
import Container from "./Container";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { userSelector } from "@/redux/user/userSlice";

export default function Navbar() {
    const { currentUser } = useSelector(userSelector);
    return (
        <header className=" w-full bg-slate-200 shadow-md">
            <Container>
                <div className="py-4 flex justify-between items-center">
                    <Link href="/">
                        <Image
                            src={"/images/logo.png"}
                            alt=""
                            className="object-contain h-10 w-28 md:w-48 "
                            width={180}
                            height={100}
                        />
                    </Link>
                    <form className="flex justify-center border items-center rounded-lg px-2 bg-slate-50">
                        <Input
                            placeholder="Search..."
                            className="bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-none w-24 sm:w-64"
                        />
                        <button type="submit">
                            <Search className="text-slate-500" />
                        </button>
                    </form>
                    <ul className="flex items-center gap-4">
                        <Link href="/">
                            <li className="hidden sm:inline text-slate-700">
                                Home
                            </li>
                        </Link>
                        <Link href="/about">
                            <li className="hidden sm:inline text-slate-700">
                                About
                            </li>
                        </Link>
                        {currentUser?.avatar ? (
                            <Link href="/profile">
                                <li className="  text-slate-700">
                                    <Image
                                        src={currentUser?.avatar}
                                        alt="profile"
                                        className="rounded-full object-cover"
                                        height={28}
                                        width={28}
                                    />
                                </li>
                            </Link>
                        ) : (
                            <Link href="/sign-in">
                                <li className="  text-slate-700">Sign in</li>
                            </Link>
                        )}
                    </ul>
                </div>
            </Container>
        </header>
    );
}
