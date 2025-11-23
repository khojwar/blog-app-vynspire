'use client'

import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import PostList from "@/components/PostList";

const page = () => {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg');

    if (msg) {
        toast.success(decodeURIComponent(msg));
    }   

  return (
    <div>
        <PrivateRoute>
            <PostList />

        </PrivateRoute>
    </div>
  )
}

export default page