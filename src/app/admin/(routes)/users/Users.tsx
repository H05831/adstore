"use client";

import { fetchAllUsers, deleteUser, updateUser } from "@/actions/users";
import UserSkeleton from "@/components/skeletons/UserSkeletonl";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const Users = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | undefined>("");

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => fetchAllUsers(),
  });

  const queryClient = useQueryClient();

  const { mutate: removeUser } = useMutation({
    mutationFn: async (userId: string | undefined) => {
      setDeletingUserId(userId);
      await db.user.delete({
        where: {
          id: userId,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDeletingUserId("");
    },
    onError: () => {
      setDeletingUserId("");
    },
  });

  // Mutation for updating the user role
  const { mutate: updateUserRole, isPending: isUpdatingRole } = useMutation({
    mutationFn: async ({ role, userId }: { role: UserRole; userId: string }) =>
      updateUser({ userId, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Failed to update user role", error);
    },
  });

  // Handle role change
  const handleRoleChange = (userId: string, newRole: UserRole) => {
    updateUserRole({ role: newRole, userId });
    setOpenDropdown(null); // Close the dropdown after role change
  };

  return (
    <div className="bg-white w-full h-[87%] my-6 px-10 py-6 flex flex-col gap-8 overflow-y-auto shadow-md rounded-lg">
      {/* Table header */}
      <div className="grid grid-cols-5 items-center gap-x-6 py-4 px-6 bg-gray-100 rounded-t-lg text-sm font-medium text-gray-600">
        <div className="text-left">User</div>
        <div className="text-left">Email</div>
        <div className="text-center">Orders</div>
        <div className="text-center">Role</div>
        <div className="text-center">Actions</div>
      </div>

      {/* User Rows */}
      {isLoading ? (
        <div className="divide-y divide-gray-200">
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
          <UserSkeleton />
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {users?.map((user: any) => (
            <div
              key={user.id}
              className="grid grid-cols-5 items-center gap-x-6 py-4 px-6 text-sm"
            >
              {/* User Info */}
              <div className="flex items-center gap-x-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">
                    {user.name.slice(0, 1)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{user.name}</h4>
                  <span className="text-gray-400 text-xs">ID: {user.id}</span>
                </div>
              </div>

              {/* User Email */}
              <div className="font-medium text-gray-700">{user.email}</div>

              {/* Orders */}
              <div className="text-center text-gray-600">
                {user.orders ? user.orders.length : 0}
              </div>

              {/* Role */}
              <div className="relative text-center">
                <div
                  className="cursor-pointer bg-light-blue-100 text-blue-700 border border-gray-300 rounded-md py-2 px-4 inline-flex items-center justify-between hover:bg-light-blue-200 transition-colors duration-300 ease-in-out"
                  onClick={() =>
                    setOpenDropdown(openDropdown === user.id ? null : user.id)
                  }
                >
                  <span className="mr-2">{user.role}</span>
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openDropdown === user.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-opacity duration-200 ease-in-out">
                    <div
                      className="cursor-pointer px-4 py-2 text-blue-800 hover:bg-blue-200 hover:text-blue-900 transition-colors duration-200 ease-in-out"
                      onClick={() => handleRoleChange(user.id, "ADMIN")}
                    >
                      <span className="font-semibold text-blue-800">Admin</span>
                    </div>
                    <div
                      className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200 ease-in-out"
                      onClick={() => handleRoleChange(user.id, "USER")}
                    >
                      <span className="font-semibold text-gray-700">User</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="text-center flex justify-center gap-x-2">
                <button
                  onClick={() => removeUser(user.id)}
                  className={`px-3 py-1 text-xs font-medium ${
                    deletingUserId === user.id
                      ? "text-gray-400 bg-gray-200"
                      : "text-red-600 bg-red-50 hover:bg-red-100"
                  } rounded-md`}
                >
                  {deletingUserId === user.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
