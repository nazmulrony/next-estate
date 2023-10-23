"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";

type ReduxProviderProps = {
    children: ReactNode | ReactNode[];
};

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return <Provider store={store}>{children}</Provider>;
}
