
const Category = async ({ params }: { params : { categoryId: string}}) => {
    const { categoryId } = params;
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div>
                    <h1 className=" mb-4">
                        This is the <code className=" bg-slate-400 p-1 rounded-sm">/categories/[{categoryId}]</code> and is public and shows all available items for the category
                    </h1>

                    <h2 className="mb-2 text-cyan-500">Components</h2>
                    <p className="left-0 top-0 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        <span>- Logo</span>
                        <span>- PRINT</span>
                        <span>- Global site search</span>
                        <span>- A component to change Category on page</span>
                        <span>- List of all rooms available items for category={categoryId}</span>
                        <span>- Bottom Sheet Component to show details of a selected Antique Item</span>
                        <span>- Bottom navigation</span>
                        
                    </p>
                </div>

            </div>
        </main>
    )
}

export default Category;