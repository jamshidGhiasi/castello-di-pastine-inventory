'use client';
import Layout from "@/components/layout/layout";
import { use, useEffect, useRef, useState } from "react";
import { convertInputToAntiqueRange } from "@/lib/utils"
import { Input } from "@/components/ui/input";
import { Img } from "react-image";
import ReactToPrint from 'react-to-print';
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast'
import { ChevronRight, Home, Loader2 } from "lucide-react";
import S3Img from "@/components/S3Img";
import Link from "next/link";
const pageStyle = `
  @page {
    size: 57mm 32mm;
    margin: 0;
  }
  @media print {
    .page-label {
        width: 57mm !important;
        height: 32mm !important;
    }
  }
`;
const PrintLabels = () => {
    const [antiques, setAntiques] = useState<any[]>()
    const [loading, setLoading] = useState(false)
    const [range, setRange] = useState<string>()
    const componentRef = useRef(null);
    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()
        var formData = new FormData(event.target as HTMLFormElement);
        setLoading(true)

        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/print/antiques?r=${formData.get('range')}`)
            const data = await result.json();
            setLoading(false)
            setAntiques(data);
        } catch (error) {
            setLoading(false)
            setAntiques([])
            console.error(error);
        }
    }
    return (
        <Layout>
            <div className='sticky top-[79px] bg-[#fff] min-h-[46px]  border-b py-2 px-4 flex items-center justify-between shadow-sm w-full  mx-auto '>
                <div className='text-xs w-full max-w-5xl mx-auto flex items-center'>
                    <Link href='/' className='hover:underline'>
                        <Home className='inline-block w-4' />
                    </Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/print' className=' hover:underline' >Print</Link>
                    <ChevronRight className='inline-block w-4' />
                    <Link href='/floor-plans' className=' pointer-events-none' >Labels</Link>
                </div>
            </div>
            <div className='sticky top-[80px] bg-[#f2f2f2] border-b py-2 px-4 sm:px-0 mb-4 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between'>
            <div className=" w-full max-w-5xl mx-auto flex justify-between items-center">   
                <h1 className='font-bold sm:text-lg  mb-2 sm:mb-0'>Enter an range</h1>
                <form onSubmit={onSubmit} className="flex w-full sm:w-1/3 justify-between items-center">
                    <Input
                        name="range"
                        type="text"
                        className="rounded-md mr-2 text-[16px]"
                        placeholder="1,2,5-6"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                    />
                    <Button className=" text-black flex justify-center border   items-center  bg-white text-center shadow-sm rounded-sm hover:bg-[#ebf1ef] hover:shadow-lg  transition-all duration-400 ease-out hover:border hover:border-[#c4d5ce]" type="submit" >
                        Search
                    </Button>
                </form>
            </div>
            </div>
            <div className="flex flex-col items-center justify-between px-4 sm:p-0  w-full max-w-5xl mx-auto">
                {(antiques && antiques.length) && <ReactToPrint pageStyle={pageStyle} trigger={() => <Button className="mb-4 w-full sm:w-auto ml-auto ">Print</Button>} content={() => componentRef.current} />}
                <div ref={componentRef} className="w-full">
                    {loading && <Loader2 className="mr-2 h-24 w-24 animate-spin" />}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mx-auto  print:block">
                        {antiques && antiques.length && antiques.map((antique, index) => (
                            <div key={index} >
                                <div className="page-label bg-white rounded-lg shadow-md print:shadow-none print:rounded-none p-4  flex items-center justify-between   ">
                                    <QRCode className="print:w-[2cm] w-[100px] h-auto mr-2" value={`https://castello-di-pastine.com/${antique.itemNo}-2`} />
                                    <div className="flex flex-col justify-between items-center grow mr-auto">
                                        <p className="font-bold"> {antique?.itemNo}</p>

                                        <S3Img
                                            src={`/antiques/image${antique.itemNo.replace('0', '')}.png`}
                                            alt={antique.itemNo}
                                            className='mx-auto print:h-[1cm] h-[80px] print:w-auto '

                                        />
                                    </div>
                                </div>
                                <div className="page-break"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default PrintLabels;
