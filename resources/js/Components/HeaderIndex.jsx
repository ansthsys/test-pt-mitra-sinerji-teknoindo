import { Link } from "@inertiajs/react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function HeaderIndex() {
    return (
        <div className="flex flex-row justify-center md:justify-end items-center gap-5 w-full ms-auto">
            <div className="join me-auto md:m-0">
                <div>
                    <div>
                        <input
                            className="input input-bordered border-neutral focus:outline-neutral/80 focus:border-neutral input-sm join-item"
                            placeholder="Nama customer"
                        />
                    </div>
                </div>
                <button className="btn btn-outline btn-sm join-item">
                    <MagnifyingGlassIcon className="size-5 text-content-neutral" />
                </button>
            </div>

            <Link
                href={route("transaction.create")}
                className="btn btn-sm btn-neutral"
                as="button"
                type="button"
            >
                <PlusIcon className="size-5 text-white" />
                <span className="hidden sm:inline">Tambah</span>
            </Link>
        </div>
    );
}
