import { useState } from "react";
import { ChangePassword } from "./change-password";
import { useGetCurrentUser } from "@/features/user";

export function UserProfilePage() {
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);

  const openChangePassword = () => setChangePasswordOpen(true);
  const closeChangePassword = () => setChangePasswordOpen(false);

  const { data, isLoading, isError } = useGetCurrentUser();

  if (isLoading) {
    return <p>Loading user info...</p>;
  }

  if (!data) {
    throw new Error("Something went wrong displaying user info.");
  }

  const user = data.data;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">User Profile</h1>

        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Name:</div>
            <div className="text-gray-600">{user.name}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Email:</div>
            <div className="text-gray-600">{user.email}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Role:</div>
            <div className="text-gray-600">{user.role}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Date of Birth:</div>
            <div className="text-gray-600">
              {user.birthDate ? user.birthDate.toString() : <span className="italic text-gray-500">There is no data</span>}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Status:</div>
            <div
              className={`text-gray-600 ${
                user.activeStatus === "ACTIVE"
                  ? "text-green-600"
                  : user.activeStatus === "UNVERIFIED"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {user.activeStatus}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Address:</div>
            <div className="text-gray-600">
              {user.address ? user.address : <span className="italic text-gray-500">There is no data</span>}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="font-medium text-gray-700">Phone:</div>
            <div className="text-gray-600">
              {user.phone ? user.phone.toString() : <span className="italic text-gray-500">There is no data</span>}
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        <button
          onClick={openChangePassword}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Change Password
        </button>
      </div>

      <ChangePassword isOpen={isChangePasswordOpen} onClose={closeChangePassword} />
    </div>
  );
}
