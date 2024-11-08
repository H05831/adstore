"use client";

import useNetworkStatus from "@/hooks/useNetwork";
import { ReactNode } from "react";

const NetworkStatusProvider = ({ children }: { children: ReactNode }) => {
  const isOnline = useNetworkStatus();

  if (!isOnline) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-3xl font-semibold text-red-600">You are offline</h1>
        <p className="text-lg text-gray-700 mt-4">
          Please check your internet connection.
        </p>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default NetworkStatusProvider;
