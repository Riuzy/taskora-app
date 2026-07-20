"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

import { Input } from "@/components/ui/input";

interface Props
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = forwardRef<HTMLInputElement, Props>(
    ({ className, ...props }, ref) => {
        const [show, setShow] = useState(false);

        return (
            <div className="relative">

                <Input
                    ref={ref}
                    {...props}
                    type={show ? "text" : "password"}
                    className={`h-11 rounded-xl pr-10 ${className}`}
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    rounded-md
                    p-1
                    text-slate-400
                    transition
                    hover:bg-slate-100
                    hover:text-slate-700
                    "
                >
                    {show ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>

            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;