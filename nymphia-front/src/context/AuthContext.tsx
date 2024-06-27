import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from "axios";
import { apiRoutes } from "../api/apiRoutes.ts";
import { toast } from "react-toastify";
import { AuthContextState, AuthContextType, LoginUser } from "./types/index.ts";

const initialState: AuthContextState = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = (props: PropsWithChildren) => {
	const [state, setState] = useState(initialState)
	const navigate = useNavigate()

	useEffect(() => {
		const checkAuthentication = localStorage.getItem('user')

		if (checkAuthentication) {
			setState({
				user: JSON.parse(checkAuthentication),
				isAuthenticated: true,
				isLoading: false
			})
		} else {
			setState({
				user: null,
				isAuthenticated: false,
				isLoading: false
			})
		}
	}, [])

	const login = async (data: LoginUser) => {
		await axios.post(apiRoutes.login, data)
			.then(res => {
				const user = res.data
				delete user.password

				setState({
					user,
					isAuthenticated: true,
					isLoading: false
				})
				localStorage.setItem('user', JSON.stringify(res.data))
				navigate('/dashboard')
			})
			.catch(err => {
				console.log(err.message)
				toast.error(err.response.data.message)
				console.error()
			})
	}

	const logout = () => {
		setState({
			user: null,
			isAuthenticated: false,
			isLoading: false
		})
		localStorage.removeItem('user')
		navigate('/')
	}
	
	return (
		<AuthContext.Provider value={{ ...state, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	)
}