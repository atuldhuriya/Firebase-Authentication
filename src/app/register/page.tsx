"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/Component/firebase";


const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const router = useRouter();

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        setMessage(null);

        if (password !== confirmPassword) {
            setError("Password do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await sendEmailVerification(user);

            // Temporarily store user data in local storage
            localStorage.setItem(
                "registrationData", JSON.stringify({
                    firstName,
                    lastName,
                    gender,
                    email,
                }));
            setMessage(
                "Registration successful! Please check your email for verification."
            );
            setFirstName("");
            setLastName("");
            setGender("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };


    return (
        <div className="bg-gradient-to-b from-gray-600 to-black justify-center items-center min-h-screen w-screen flex flex-col relative">
    <h2 className="text-2xl text-white font-bold text-center mb-10">Register</h2>
    <div className="p-5 border border-gray-300 rounded">
        <form onSubmit={handleRegister} className="space-y-6 px-6 pb-4">
            <div className="flex flex-wrap -mx-2 space-y-6">
                <div className="w-full md:w-1/2 px-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        />
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                    />
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <label htmlFor="gender" className="text-sm font-medium text-gray-300 mb-2">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                    />
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                    />
                </div>
                <div className="w-full md:w-1/2 px-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                    />
                </div>
                
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Sign Up
            </button>
        </form>
    </div>
</div>

    );
};
export default RegisterPage;