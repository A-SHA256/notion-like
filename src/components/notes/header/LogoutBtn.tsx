import { signOut } from "firebase/auth";
import { logout } from "@/slices/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import { auth } from "@/lib/firebase";

export default function LogoutBtn() {
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logout());
            console.log('User signed out successfully');
        } catch (error) {
            console.error("Error signing out: ", error)
        }
    }
    return (
        <button onClick={handleLogout} className="px-4 py-2 bg-white-600 hover:bg-green-700 text-white font-semibold rounded transition duration-300">Sign Out</button>
    );
}