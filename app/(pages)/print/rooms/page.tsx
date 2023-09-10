'use client'
import Layout from "@/components/layout.tsx/layout"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export const PrintRoom = () => {
    return (
        <Layout>
            <Link href={'/print'} className="flex justify-start items-center mb-8">
                <ChevronLeft />Back
            </Link>
            <div>
                <h1>Print Room</h1>
            </div>
        </Layout>
    )
}

export default PrintRoom