import fetchAntique from "@/utils/fetchAntique"
import Layout from "@/components/layout/layout"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import QRCode from "react-qr-code"
import S3Img from "@/components/S3Img"

const ItemPage = async ({ params }: { params: { itemNo: string } }) => {
    const antique = await fetchAntique(params.itemNo.split('-')[0])
    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 flex items-center justify-between shadow-sm w-full  mx-auto '>
                <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
                    <Link href='/' className='hover:underline'>
                        <Home className='inline-block w-4' />
                    </Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/floor-plans' className=' pointer-events-none' >Item {params.itemNo}</Link>
                </div>
            </div>
            <div className=' w-full max-w-5xl mx-auto  px-4 sm:px-0 pt-4 '>
            {!antique && <div>oops! It looks like there are not data for {params.itemNo} yet. </div>}
            {antique && (
                <div className="page-a4 bg-white p-4 h-full rounded-lg shadow-md print:shadow-none  print:rounded-none  flex flex-col justify-start items-center ">
                  <S3Img
                    src={`/antiques/image${antique.itemNo.replace('0', '').replace('a', '').replace('b', '')}.jpg`}
                    alt={antique.itemNo}
                    className='m-auto h-[200px] w-auto '
                  />
                  <div className="flex flex-col items-center">
                    <span className="font-bold">Item No:</span> {antique?.itemNo}
                  </div>
                  <p className="font-bold mb-2"></p>
                  <p className="page-description text-xs mb-2 text-center max-w-md">{antique?.description}</p>
                  <div className=" flex flex-col items-center">
                    <span className="font-bold">Room Number: &nbsp; </span>
                    <span className="mb-2">{antique?.room?.title || 'TBC'}</span>
                  </div>
                  <div className="mt-3 flex flex-col items-center">
                    <p className="font-bold">Dimension (cm):</p>
                    <span className='font-bold'> w: <span className=' font-normal'>{antique?.width ? antique?.width + " cm" : ""}</span></span>
                    <span className='font-bold'> h: <span className=' font-normal'>{antique?.height ? antique?.height +" cm" : ""}</span></span>
                    <span className='font-bold'> d: <span className=' font-normal'>{antique?.depth ? antique?.depth+ " cm" : ""}</span></span>
                  </div>
                  <p className="font-bold mt-3">Warehouse location:</p>
                  <p>{antique?.warehouseLocation || 'TBC'}</p>
                  <p className="font-bold mb-3 mt-3">QR Code</p>
                  <QRCode className="w-8 h-8 print:w-[2cm] print:h-[2cm]" value={`https://castello-di-pastine.com/${antique.itemNo}-2`} />
                </div>
            )}

            </div>
        </Layout>
    )
}

export default ItemPage