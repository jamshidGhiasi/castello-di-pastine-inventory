import Layout from "@/components/layout/layout";
import FloorPlansSlider from "@/components/floor-plans/floor-plans-slider";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const FloorPlans = () => {
  return (
    <Layout>
      <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 mb-4 flex items-center justify-between shadow-sm w-full  mx-auto '>
        <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
          <Link href='/' className='hover:underline'>
            <Home className='inline-block w-4' />
          </Link>
          <ChevronRight className='inline-block w-4' />
          <Link href='/floor-plans' className=' pointer-events-none' >Floor Plans</Link>
        </div>
      </div>

      <div className="px-4">
        <FloorPlansSlider />
      </div>
    </Layout>
  )
}

export default FloorPlans;
