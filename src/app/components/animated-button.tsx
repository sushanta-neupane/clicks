import { cn } from "@/lib/utils";
import { ReactNode } from 'react';
import { PiSpinnerBall } from 'react-icons/pi';


interface Props {
    title: string;
    onClick?: () => void;
    onSubmit?: (e: React.FormEvent) => void;
    className?: string;
    icon: ReactNode;
    next_icon: ReactNode;
    isLoading: boolean;
    disable?: boolean;
    type?: "button" | "submit"

}

const AnimatedButton = ({ title, onClick, onSubmit, className, icon, next_icon, isLoading, disable, type = "button" }: Props) => {
    return (
        <button
            disabled={disable}
            onClick={onClick}
            type={type}
            onSubmit={onSubmit}

            className={cn(
                " p-3 lg:p-5 bg-muted hover:bg-muted-hover rounded-xl flex justify-between items-center cursor-pointer group transition-all duration-150 ease-[cubic-bezier(0.22, 1, 0.36, 1)]",
                className
            )}
        >
            <p className="text-sm">{title}</p>

            <div className="relative inline-block overflow-hidden size-[18px]">
                <div className="relative inline-block group font-light text-sm h-full w-full">

                    {isLoading ? (
                        <span className="flex items-center justify-center animate-spin ">
                            <PiSpinnerBall />
                        </span>

                    ) : (
                        <>
                            {/* Default Text (visible initially, moves down on hover) */}
                            <span className="block transform transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
                                {icon}
                            </span>

                            {/* Hover Text (hidden initially, moves up on hover) */}
                            <span className="absolute inset-0 transform translate-y-full transition-transform duration-200 ease-in-out group-hover:translate-y-0">
                                {next_icon}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </button>
    );
};

export default AnimatedButton;
