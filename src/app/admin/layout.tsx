import TopBar from "@/components/admin/TopBar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-[#F2F4F7] p-3">
      <TopBar />
      <main> {children}</main>
    </div>
  );
};

export default AdminLayout;
