import Image from "next/image";

const TopLogo = () => {
    return (
            <div className="relative h-3 border-yellow-300">

                <Image
                    className=" my-4 sm:my-10"
                    src='/castello-di-pastine-typography.svg'
                    fill={true}
                   
                    loading = 'lazy'
                    alt=""
                    
    
                />
            </div>
       
    )
}

export default TopLogo;