import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Log in" />

            <div className="bg-gray-100 flex justify-center items-center ">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('./images/Reverse.png')" }}></div>

                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 relative z-10">
                    <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="flex justify-center mb-8">
                            <img src="./images/logo color.png" alt="Logo" className="h-20 w-auto" />
                        </div>
                        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-purple-500"
                                autoComplete="username"
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-purple-500"
                                autoComplete="current-password"
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                        </div>
                        <div className="mb-4 flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                            />
                            <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
                        </div>
                        <div className="mb-6 text-blue-500">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                            disabled={processing}
                        >
                            Login
                        </button>
                        <div className="mt-6 text-yellow-500 text-center">
                            <a href="/register" className="hover:underline">Sign up Here</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
