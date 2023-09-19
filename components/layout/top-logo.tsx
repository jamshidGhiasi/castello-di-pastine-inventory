import Image from "next/image";

const TopLogo = () => {
    return (
        <div className="mb-4 text-center">
            <Image
                className="relative z-10 m-auto"
                src='/castello-di-pastine-typography.svg'
                width={244.54}
                height={14.21}
                alt=""

            />
        </div>
    )
}

export default TopLogo;