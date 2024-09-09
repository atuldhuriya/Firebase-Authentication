"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    reauthenticateWithCredential,
    EmailAuthProvider,
    updatePassword,
} from "firebase/auth";
import { auth } from "@/Component/firebase";



const passwordChangePage = () =>{
    const [currentPassword, setCurrentPassword] = useState ("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();


    const handlePasswordChange = async (event: React.FormEvent) =>{
        event.preventDefault();
        setError(null);
        setMessage(null);

        if (newPassword !== confirmNewPassword){
            setError("New password do not match");
            return;
        }
        try {
            const user = auth.currentUser;
            if(user && user.email){
                const credential = EmailAuthProvider.credential(
                    user.email,
                    currentPassword
                );
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newPassword);
                setMessage("Password changed successfully");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            }else{
                setError("No user is currently signed in.");

            }
        } catch (error) {
            if (error instanceof Error){
                setError(error.message);
            }else{
                setError("An unknown error occurred");
            }
        }
    } ;
 return(
    <div className="bg-gradient-to-b from-gray-600 to-black flex justify-center items-center h-screen w-screen">
       <div className="max-w-md w-full p-6 border border-gray-300 rounded">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
            Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="p-5">
                <label
                    htmlFor="currentPassword"
                    className="text-sm font-medium text-gray-300 mb-2"
                   
                >
                    Current Password
                    </label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Password..."
                    className="w-full p-2 mb-4 rounded"
                    required
                />
                 <label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-gray-300 mb-2"
                   
                >
                    New Password
                    </label>
                 <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="NewPassword..."
                    className="w-full p-2 mb-4 rounded"
                    required
                />
                 <label
                    htmlFor="confirmNewPassword"
                    className="text-sm font-medium text-gray-300 mb-2"
                   
                >
                    Confirm New Password
                    </label>
                 <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="confirmNewPassword..."
                    className="w-full p-2 mb-4 rounded"
                    required
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {message && <p className="text-green-500 text-sm">{message}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Change Password
                </button>
               
            </form>
       </div>

    </div>
);
};
export default passwordChangePage;