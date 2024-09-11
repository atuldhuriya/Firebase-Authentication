"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/Component/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );

            const user = userCredential.user;
            
                const registrationData = localStorage.getItem("registrationData");
                const {
                    firstName = "",
                    lastName = "",
                    gender = "",
                } = registrationData ? JSON.parse(registrationData) : {};

                const userDoc = await getDoc(doc(firestore, "users", user.uid));
                if (!userDoc.exists()) {
                    await setDoc(doc(firestore, "users", user.uid), {
                        firstName,
                        lastName,
                        gender,
                        email: user.email,
                    });
                }
                router.push("/dashboard"); // Corrected router.push path to "/dashboard"
            
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-600 to-black justify-center items-center h-screen w-screen flex flex-col relative">
            <h2 className="text-4xl font-medium text-white mb-10">Firebase</h2>
            <form onSubmit={handleLogin} className="p-5 border border-gray-300 rounded">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    className="w-full p-2 mb-4 rounded"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password..."
                    className="w-full p-2 mb-4 rounded"
                    required
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Log In
                </button>
               <div className="flex gap-48">
               <p className="text-sm font-medium text-gray-300 mt-4">
                     have an account?{" "}
                    <Link href="/register" className="text-blue-700 hover:underline">
                        Register here
                    </Link>
                </p>
                <p className="text-sm font-medium text-gray-300 mt-4">
                    {" "}
                    <Link href="/changePasswod" className="text-blue-700 hover:underline">
                        Forget Your Password
                    </Link>
                </p>
               </div>
            </form>
        </div>
    );
};

export default LoginPage;
