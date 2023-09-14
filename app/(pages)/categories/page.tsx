import CategoryItem from "@/components/category-item";
import Layout from "@/components/layout.tsx/layout";

export const dynamic = 'force-dynamic'

const Categories = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/categories`, { cache: 'no-store' });
    const categories = await res.json()
    return (
        <Layout>
            <div>
                {categories.map((area: any) => (
                    <CategoryItem key={area.id} title={area.title} slug={area.slug} count={area._count.antiques} />
                ))}
            </div>
        </Layout>
    )
}
export default Categories;
