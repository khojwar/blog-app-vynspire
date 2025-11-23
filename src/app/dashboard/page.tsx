'use client'

import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";

const page = () => {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg');

    if (msg) {
        toast.success(decodeURIComponent(msg));
    }

  return (
    <div>
        <PrivateRoute>
            <h1>Dashboard Page - Protected</h1>
            
        </PrivateRoute>
    </div>
  )
}

export default page