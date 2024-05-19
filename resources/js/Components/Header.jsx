export default function Heading({
    titlePage = "PT Mitra Sinerji Teknoindo",
    children,
}) {
    return (
        <header className="sticky top-0 py-5 px-5 flex flex-col md:flex-row gap-5 items-start md:items-center justify-start bg-base-100/60 backdrop-blur z-20">
            <h1 className="inline-block text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight w-full">
                {titlePage}
            </h1>

            {children && children}
        </header>
    );
}
