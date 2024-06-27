import React from "react"
import { useState } from "react";
import { 
	Box, 
	Button, 
	Card, 
	InputAdornment, 
	TextField, 
	Typography
} from '@mui/material';
import { Navbar } from "../components/Navbar.tsx";
import { AuthUser } from "../context/types";
import { BiLogIn } from 'react-icons/bi'
import { useAuth } from "../hooks/useAuth.tsx";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Login = (props: any) => {
	const { login, isAuthenticated } = useAuth()
	const [loginData, setLoginData] = useState<AuthUser>({ email: '',  })
	const navigate = useNavigate()

	if (isAuthenticated) navigate('/dashboard')

	const formik = useFormik({
		initialValues: {
			email: '',
      password: '',
		},
		enableReinitialize: true,
		onSubmit: values => {
			const data = {
				email: values.email,
        password: values.password,
			}

			login(data);
		}
	})

	const { handleSubmit, handleChange, values } = formik;

	return (
		<Box
			sx={{
				width: '100vw',
				minHeight: '100vh'
			}}
		>
			<Navbar />

			<Box
				sx={{
					width: '100vw',
					height: '100%',
					display: "flex",
					justifyContent: 'center',
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Card
					sx={{
						minWidth: '300px',
						minHeight: '100px',
						padding: '15px',
					}}
				>
					<Typography sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>Entre na sua conta!</Typography>
					<form onSubmit={handleSubmit}>	
						<Box
							sx={{
								display: "flex",
								justifyContent: 'center',
								alignItems: "center",
								flexDirection: "column",
								gap: '15px'
							}}
						>
							<TextField
								fullWidth
								sx={{ outlineColor: 'black' }}
								label='Email'
								placeholder='Insira seu email...'
								id='email'
								name='email'
								onChange={handleChange}
								value={values.email}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<BiLogIn />
										</InputAdornment>
									),
								}}
							/>
							<TextField
								fullWidth
								type='password'
								sx={{ outlineColor: 'black' }}
								label='Senha'
								placeholder='Insira sua senha...'
								id='password'
								name='password'
								onChange={handleChange}
								value={values.password}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<RiLockPasswordFill />
										</InputAdornment>
									),
								}}
							/>
							<Link to='/register' style={{ textDecoration: 'none', color: '#1565c0' }}>Cadastre-se</Link>
							<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
								<Button 
									variant='contained'
									type="submit"
								>
									Login
								</Button>
							</Box>
						</Box>
					</form>
				</Card>
			</Box>
			<ToastContainer />
		</Box>
	);
};