import CategoryItem from "@/components/category-item";
import Layout from "@/components/layout.tsx/layout";
const Categories = async () => {
    const res = await fetch('http://localhost:3000/api/categories');
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