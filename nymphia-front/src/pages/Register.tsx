import { Box, Button, Card, InputAdornment, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { Navbar } from "../components/Navbar.tsx"
import { BiLogIn } from "react-icons/bi"
import { RiLockPasswordFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.tsx"
import { AuthUser, RegisterUser } from "../context/types"
import { useFormik } from "formik"
import * as Yup from 'yup';
import axios from "axios"
import { apiRoutes } from "../api/apiRoutes.ts"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
const { login, isAuthenticated } = useAuth()
	const [registerData, setRegisterData] = useState<RegisterUser>({ email: '', name: '', password: '', cpf: '', birth: '', phone: '' })
	const navigate = useNavigate()

	if (isAuthenticated) navigate('/dashboard')

	const formik = useFormik({
		initialValues: {
			name: '', 
			email: '', 
			password: '', 
			cpf: '', 
			birth: '', 
			phone: ''
		},
		enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .required("Required"),
      cpf: Yup.string()
				.length(11, "Must be 11 characters")
        .required("Required"),
      phone: Yup.string()
        .required("Required"),
      birth: Yup.string()
        .required("Required")
    }),
		onSubmit: async values => {
			const data = {
				name: values.name, 
				email: values.email,
				password: values.password,
				cpf: values.cpf, 
				birth: new Date(values.birth).toISOString(), 
				phone: values.phone
			}

			await axios.post(apiRoutes.register, data)
				.then(res => {
					toast.success('Usuario criado!');
					navigate('/')
				})
				.catch(err => {
					toast.error(err.response.data.message);
					console.error(err);
				})
		}
	})

	const { handleSubmit, handleChange, values, dirty, isValid } = formik;

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
					<Typography sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>Crie sua conta!</Typography>
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
								label='Nome'
								placeholder='Nome'
								id='name'
								name='name'
								onChange={handleChange}
								value={values.name}
							/>
							<TextField
								fullWidth
								sx={{ outlineColor: 'black' }}
								label='Email'
								placeholder='Email'
								id='email'
								name='email'
								onChange={handleChange}
								value={values.email}
							/>
							<TextField
								fullWidth
								type="password"
								sx={{ outlineColor: 'black' }}
								label='Senha'
								placeholder='Senha'
								id='password'
								name='password'
								onChange={handleChange}
								value={values.password}
							/>
							<TextField
								fullWidth
								sx={{ outlineColor: 'black' }}
								label='CPF'
								placeholder='CPF'
								id='cpf'
								name='cpf'
								onChange={handleChange}
								value={values.cpf}
							/>
							<TextField
								fullWidth
								sx={{ outlineColor: 'black' }}
								label='Telefone'
								placeholder='Telefone'
								id='phone'
								name='phone'
								onChange={handleChange}
								value={values.phone}
							/>
							<TextField
								fullWidth
								type="date"
								InputLabelProps={{ shrink: true }}
								sx={{ outlineColor: 'black' }}
								label='Data de nascimento'
								id='birth'
								name='birth'
								onChange={handleChange}
								value={values.birth}
							/>
							<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
								<Button 
									variant='contained'
									type="submit"
									disabled={!formik.isValid}
								>
									Cadastrar
								</Button>
							</Box>
						</Box>
					</form>
				</Card>
			</Box>
			<ToastContainer />
		</Box>
	);
}