import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../provider/AuthProvider';

const Register = () => {
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setIsSubmitting(true);

        try {
            const fullName = `${firstName} ${lastName}`.trim();
            await registerUser(fullName, email, password);
            toast.success("Account created successfully!");
            navigate("/auth/account");
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already registered. Try logging in.");
            } else if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-[70vh] flex justify-center px-4 py-16">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Create Account</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-green-800"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-800 hover:bg-green-900 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-md transition-colors mt-2"
                    >
                        {isSubmitting ? "Creating..." : "Create"}
                    </button>

                    <Link
                        to="/auth/login"
                        className="text-sm text-gray-500 text-center hover:text-green-800"
                    >
                        Already have an account? Login
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;