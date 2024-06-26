import { Box, Button, Card, IconButton, Skeleton, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { Navbar } from "../components/Navbar.tsx"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks/useAuth.tsx";
import { MdOutlineAdd } from "react-icons/md";

export const Dashboard = () => {
	const { user } = useAuth()

	useEffect(() => {
		console.log(user)
	}, [user])
	
	return (
		<Box
			sx={{
				width: '100vw',
				minHeight: '100vh',
				fontFamily: 'Roboto', 
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
						minWidth: '50vw',
						minHeight: '100px',
						padding: '30px',
						marginBottom: '150px'
					}}
				>
					<Box sx={{ marginBottom: '30px' }}>
						<Typography variant="h2" sx={{ fontWeight: '700' }}>{user?.name}</Typography>
						<Typography variant="h6" sx={{ fontWeight: '400' }}>{user?.email}</Typography>
					</Box>
					<Box>
						<Box sx={{ display: 'flex', gap: '5px' }}>
							<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Telefone:</Typography>
							<Typography variant="subtitle1" sx={{ fontWeight: '400' }}>{user?.phone && user?.phone?.trim() !== '' ? user?.phone : '-'}</Typography>
						</Box>
						<Box sx={{ display: 'flex', gap: '5px' }}>
							<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Nascimento	:</Typography>
							<Typography variant="subtitle1" sx={{ fontWeight: '400' }}>{user?.birth && user?.birth?.trim() !== '' ? user?.birth?.split('T')[0] : '-'}</Typography>
						</Box>
						<Box sx={{ display: 'flex', gap: '5px' }}>
							<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>CPF:</Typography>
							<Typography variant="subtitle1" sx={{ fontWeight: '400' }}>{user?.cpf && user?.cpf?.trim() !== '' ? user?.cpf : '-'}</Typography>
						</Box>
					</Box>
					<Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', flexWrap: 'wrap' }}>
						<Box sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
							<Typography variant="h4" sx={{ fontWeight: 'bold' }}>Projetos</Typography>
							{/* <Button variant="contained" sx={{ borderRadius: '50px' }}>+</Button> */}
							<IconButton aria-label="add" size="large" color='info'>
								<MdOutlineAdd />
							</IconButton>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'start', gap: '10px' }}>
							<Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', flexDirection: 'column' }}>
								<Skeleton variant="rounded" width={200} height={200} />
								<Skeleton variant="rounded" width={200} height={50} />
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', flexDirection: 'column' }}>
								<Skeleton variant="rounded" width={200} height={200} />
								<Skeleton variant="rounded" width={200} height={50} />
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', flexDirection: 'column' }}>
								<Skeleton variant="rounded" width={200} height={200} />
								<Skeleton variant="rounded" width={200} height={50} />
							</Box>
							<Box sx={{ display: 'flex', justifyContent: 'start', gap: '5px', flexDirection: 'column' }}>
								<Skeleton variant="rounded" width={200} height={200} />
								<Skeleton variant="rounded" width={200} height={50} />
							</Box>
						</Box>
					</Box>
					<Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', flexWrap: 'wrap' }}>
						<Box sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
							<Typography variant="h4" sx={{ fontWeight: 'bold' }}>Experiências</Typography>
							{/* <Button variant="contained" sx={{ borderRadius: '50px' }}>+</Button> */}
							<IconButton aria-label="add" size="large" color='info'>
								<MdOutlineAdd />
							</IconButton>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'start', gap: '10px', flexDirection: 'column' }}>
							<Skeleton variant="rounded" width={"100%"} height={50} />
							<Skeleton variant="rounded" width={"100%"} height={50} />
							<Skeleton variant="rounded" width={"100%"} height={50} />
						</Box>
					</Box>
				</Card>
			</Box>
			<ToastContainer />
		</Box>
	)
}