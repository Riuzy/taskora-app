export default function AuthHeader() {
    return (
        <div className="space-y-3 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">

                <span className="text-xl font-bold">
                    T
                </span>

            </div>

            <div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Welcome back
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Sign in to continue to your workspace
                </p>

            </div>

        </div>
    );
}