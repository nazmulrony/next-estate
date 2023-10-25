"use client";

import { HashLoader } from "react-spinners";

export default function LoadingState() {
    return (
        <div className="h-[85vh] grid place-items-center ">
            <HashLoader color="#079ba5" />
        </div>
    );
}
