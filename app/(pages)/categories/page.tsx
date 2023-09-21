import CategoryItem from "@/components/category-item";
import Layout from "@/components/layout/layout";
import fetchCategories from "@/utils/fetchCategories";

export const dynamic = 'force-dynamic'

const Categories = async () => {

    const categories = await fetchCategories();

    return (
        <Layout>
             <div className='grid grid-cols-1 lg:grid lg:grid-cols-3 place-items-center place-content-center gap-3 w-full '>
                {categories && categories.map((area: any) => (
                    <CategoryItem key={area.id} title={area.title} slug={area.slug} count={area._count.antiques} />
                ))}
            </div>
        </Layout>
    )
}
export default Categories;
