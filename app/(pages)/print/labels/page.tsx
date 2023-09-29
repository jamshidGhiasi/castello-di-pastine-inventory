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
import { Loader2 } from "lucide-react";
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
        setAntiques
        try {
            const result = await fetch(`http://localhost:3000/api/print/antiques?r=${formData.get('range')}`)
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
            <div className='sticky top-[79px] bg-[#f2f2f2/80] backdrop-blur-sm  border-b py-2 px-4 mb-4 w-full flex flex-col sm:flex-row items-center justify-between'>
                <h1 className='font-bold sm:text-lg '>Enter an range</h1>
                <form onSubmit={onSubmit} className="flex justify-between items-center">
                    <Input
                        name="range"
                        type="text"
                        className="  rounded-full mr-2"
                        placeholder="1,2,5-6"
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                    />
                    <Button className=" text-black flex justify-center border   items-center  bg-white text-center shadow-sm rounded-sm hover:bg-[#ebf1ef] hover:shadow-lg  transition-all duration-400 ease-out hover:border hover:border-[#c4d5ce]" type="submit" >
                        Search
                    </Button>
                </form>
            </div>
            <div className="flex flex-col items-center justify-between px-4 sm:p-0">
                {(antiques && antiques.length) && <ReactToPrint pageStyle={pageStyle} trigger={() => <Button className="mb-4 w-full sm:w-auto ml-auto ">Print</Button>} content={() => componentRef.current} />}
                <div ref={componentRef}>
                    {loading && <Loader2 className="mr-2 h-24 w-24 animate-spin" />}
                    <div className="grid grid-col-2 sm:grid-cols-3 gap-3 mx-auto  print:block">
                        {antiques && antiques.length && antiques.map((antique, index) => (
                            <div key={index} >
                                <div className="page-label bg-white rounded-lg shadow-md print:shadow-none print:rounded-none p-4  flex items-center justify-between   ">
                                    <QRCode className="print:w-[2cm] h-auto" value={`https://castello-di-pastine.com/${antique.itemNo}-2`} />
                                    <div className="flex flex-col justify-between items-center">
                                        <p className="font-bold mb-2 prin"> {antique?.itemNo}</p>
                                        <Img className="mx-auto print:h-[1cm] print:w-auto " src={`/antiques/image${antique?.itemNo.replace('0', '')}.png`} />
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
