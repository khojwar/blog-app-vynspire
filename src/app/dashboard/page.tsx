'use client'

import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast";

const page = () => {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg');

    if (msg) {
        toast.success(decodeURIComponent(msg));
    }

  return (
    <div>Dashbaord-page</div>
  )
}

export default page