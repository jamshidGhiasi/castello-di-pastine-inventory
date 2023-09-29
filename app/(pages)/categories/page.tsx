import CategoryItem from "@/components/category/category-item";
import Layout from "@/components/layout/layout";
import fetchCategories from "@/utils/fetchCategories";

export const dynamic = 'force-dynamic'

const Categories = async () => {

    const categories = await fetchCategories();

    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#f2f2f2/80] backdrop-blur-sm  border-b py-2 px-4 mb-4 w-full flex items-center justify-between'>
                <h1 className='font-bold sm:text-lg '>Select a category</h1>

            </div>
             <div className='grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3 w-full '>
                {categories && categories.map((area: any) => (
                    <CategoryItem key={area.id} title={area.title} slug={area.slug} count={area._count.antiques} />
                ))}
            </div>
        </Layout>
    )
}
export default Categories;
