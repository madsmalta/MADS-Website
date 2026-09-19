import Image from "next/image";
import Link from "next/link";
export function Logo({light=false}:{light?:boolean}) { return <Link href="/" className={`logo ${light?"logo--light":""}`}><Image src="/media/mads-logo.png" alt="MADS — Malta Association of Dental Students, home" width={428} height={317} priority/></Link>; }

