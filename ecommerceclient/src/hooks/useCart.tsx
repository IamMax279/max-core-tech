import { useRouter } from "next/navigation"
import useAuth from "./useAuth"
import { useDispatch } from "react-redux"
import type { CartItem } from "@/types/CartTypes"
import { addItem } from "@/redux/Slices"

const useCart = () => {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()
    const dispatch = useDispatch()

    const handleAddingItem = async (item: CartItem) => {
        if(!isAuthenticated) {
            router.replace('/sign-in')
            return
        } else {
            dispatch(addItem(item))
        }
    }

    return {
        handleAddingItem
    }
}

export default useCart