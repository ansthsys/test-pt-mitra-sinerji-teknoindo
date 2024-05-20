import { Link, useForm } from "@inertiajs/react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function HeaderIndex() {
    const { data, setData, get, processing } = useForm({
        search: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route("transaction.index", [{ search: data.search }]), {
            replace: true,
            preserveState: true,
        });
    };

    return (
        <div className="flex flex-row justify-center md:justify-end items-center gap-5 w-full ms-auto">
            <div className="join me-auto md:m-0">
                <div>
                    <div>
                        <input
                            type="search"
                            className="input input-bordered border-neutral focus:outline-neutral/80 focus:border-neutral input-sm join-item"
                            placeholder="Nama customer"
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="btn btn-neutral btn-sm join-item"
                    onClick={handleSubmit}
                >
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
