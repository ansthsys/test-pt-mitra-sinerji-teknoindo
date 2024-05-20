import { Link } from "@inertiajs/react";
import Header from "@/Components/Header";

export default function Layout({
    titlePage = "PT Mitra Sinerji Teknoindo",
    headComponent,
    children,
}) {
    return (
        <div className="container lg:max-w-5xl min-h-screen mx-auto px-3 sm:px-5 lg:px-24 overflow-clip">
            <Header titlePage={titlePage}>{headComponent}</Header>

            <main className="bg-slate-100 rounded-xl p-5 mb-5">
                {children}
            </main>
        </div>
    );
}
