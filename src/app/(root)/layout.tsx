import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const NonAdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      {children}
    </div>
  );
};

export default NonAdminLayout;
