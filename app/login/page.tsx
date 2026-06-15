import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {

    async function loginAction(formData: FormData) {
        "use server";
        // const email = formData.get("email");
        // const password = formData.get("password");

        const cookieStore = await cookies();
        cookieStore.set("auth", "true", {
            path: "/",
        });
        redirect("/books");
    }


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 text-center">
                    Login to Your Account
                </h2>
                <form action={loginAction} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:outline-none bg-transparent text-zinc-900 dark:text-zinc-50"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:outline-none bg-transparent text-zinc-900 dark:text-zinc-50"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-zinc-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )

}