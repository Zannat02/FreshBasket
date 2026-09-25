import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../provider/AuthProvider';

const Login = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await loginUser(email, password);
            toast.success("Logged in successfully!");
            navigate("/auth/account");
        } catch (err) {
            if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
                setError("Incorrect email or password.");
            } else if (err.code === "auth/user-not-found") {
                setError("No account found with this email.");
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
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

                    <Link to="#" className="text-sm text-gray-500 text-center hover:text-green-800">
                        Forgot your password?
                    </Link>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-800 hover:bg-green-900 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-md transition-colors"
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>

                    <Link
                        to="/auth/register"
                        className="text-sm text-gray-500 text-center hover:text-green-800"
                    >
                        Create account
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;