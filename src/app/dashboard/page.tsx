"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "@/Component/firebase";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";



const DashboardPage = () =>{
    const [user, setUser] = useState<User | null>(null);
    const [userName, setUserName] = useState<string | null >(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    useEffect (() => {
        const unsubscribe =  onAuthStateChanged(auth, async (user) =>{
            if (user) {
                setUser(user);
                const userDoc = await getDoc(doc(firestore, "users",user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserName(`${userData.firstName} ${userData.lastName}`);
                }
            }else{
                router.push("/login");
            }
            setLoading(false);
        });

        ///Cleanup subscription on unmount
        return () => unsubscribe();
    },[router]);

    const handleLogout = async () => {
        try{
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout error", error);
        }
    };
    const handleChangePassword = () =>{
        router.push("/changePasswod");
    };
    if (loading) {
        return <p>Loading...</p>
    }

    return(
        <div className="min-h-screen bg-gray-100 bg-gradient-to-b from-gray-600 to-black">
          <nav className="bg-gray-800 p-4">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="text-white text-xl">Dashboard</div>
                    </div>
                </div>
             </div>
          </nav>
          <main className="flex flex-col items-center justify-center flex-grow mt-10">
            
                <h1 className="text-4xl font-bold mb-6 ml-10">
                    Welcome, {userName}!
                </h1>
             
             <div className="space-x-4">
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" onClick={handleLogout}>
                    Logout
                </button>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleChangePassword}>
                    Change Password
                </button>
             </div>
          </main>
        </div>
    );
};
export default DashboardPage;