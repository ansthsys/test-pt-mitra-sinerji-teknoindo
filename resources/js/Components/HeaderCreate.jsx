import { router } from "@inertiajs/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function HeaderCreate() {
    const handleBack = (e) => {
        e.preventDefault();
        router.visit(route("transaction.index"), {
            onSuccess: () => {
                router.delete(route("transaction.deleteAllTmpItem"));
            },
        });
    };

    return (
        <div className="flex flex-row justify-end items-center gap-5 w-full ms-auto">
            <button className="btn btn-sm btn-neutral" onClick={handleBack}>
                <ArrowLeftIcon className="size-5 text-white" />
                Kembali
            </button>
        </div>
    );
}
