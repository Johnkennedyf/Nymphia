import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.tsx"

export const useAuth = () => {
	const auth = useContext(AuthContext)

	return { ...auth }
}