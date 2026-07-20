export default function AuthFooter() {
    return (
        <p className="text-center text-xs leading-relaxed text-slate-500">
            Only authorized employees can access
            <span className="font-semibold text-slate-700">
                {" "}TASKORA
            </span>.
        </p>
    );
}