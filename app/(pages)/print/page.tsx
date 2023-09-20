'use client'
import BottomNavigation from "@/components/bottom-navigation";
import Layout from "@/components/layout/layout";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutList } from "lucide-react";
import { useRouter } from "next/navigation";
const Print = () => {
    const router = useRouter();
    return (
        <Layout>
            <div>
                <Button className=" bg-emerald-300 text-md  rounded-3xl p-6 w-64" onClick={() => router.push('/print/antiques')} >
                    <LayoutList className="mr-2 h-4 w-4" /> Print Antiques
                </Button>
                <Button className=" bg-emerald-300 text-md  rounded-3xl p-6 w-64" onClick={() => router.push('/print/labels')} >
                    <LayoutList className="mr-2 h-4 w-4" /> Print Labels
                </Button>
                <Button className=" bg-emerald-300 text-md  rounded-3xl p-6 w-64" onClick={() => router.push('/print/rooms')} >
                    <LayoutList className="mr-2 h-4 w-4" /> Print Rooms
                </Button>
            </div>
        </Layout>
    )
}
export default Print;
