const Admin = async () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div>

                    <h1 className=" mb-4">
                        This is the <code className=" bg-slate-400 p-1 rounded-sm">/admin</code> page and only accessible to Admin
                    </h1>

                    <h2 className="mb-2 text-cyan-500">Components</h2>
                    <p className="fixed left-0 top-0 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        <span>- Dynamic Data Table</span>
                        <span>- File Upload</span>
                        <span>- Access to main Google Sheet</span>
                        <span>- Refresh Google Sheet</span>
                        <span>- Sync with Prisma Postgres db</span>
                        <span>- CRUD on Prisma Postgres db</span>
                        <span>- Print</span>
                        <span>- Accessible via Google Auth - next-auth.js / maybe user Admin</span>
                    </p>
                </div>

            </div>
        </main>
    )
}
export default Admin;