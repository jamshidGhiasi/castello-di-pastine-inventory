import CategoryItem from "@/components/category/category-item";
import Layout from "@/components/layout/layout";
import fetchCategories from "@/utils/fetchCategories";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'

const Categories = async () => {

    const categories = await fetchCategories();

    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 mb-4 flex items-center justify-between shadow-sm w-full  mx-auto '>
                <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
                    <Link href='/' className='hover:underline'>
                        <Home className='inline-block w-4' />
                    </Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/categories' className=' pointer-events-none' >Categories</Link>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3  w-full max-w-5xl mx-auto  px-4 pt-0'>
                {categories && categories.map((area: any) => (
                    <CategoryItem key={area.id} title={area.title} slug={area.slug} count={area._count.antiques} />
                ))}
            </div>
        </Layout>
    )
}
export default Categories;
