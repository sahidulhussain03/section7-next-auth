"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

interface IProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
  return (
    <SessionProvider>
      <NextUIProvider> {children} </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
