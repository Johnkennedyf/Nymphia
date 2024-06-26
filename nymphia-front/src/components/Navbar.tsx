import React from 'react';
import { Box, Typography, Link, Button } from "@mui/material";
import { FaUser } from 'react-icons/fa';
import { useAuth } from "../hooks/useAuth.tsx";

export const Navbar = (props: any) => {
	const { user, logout } = useAuth()

	return (
		<Box
			sx={{
				width: '100vw',
				height: '95px',
				boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.2)',
				marginBottom: '100px',
				// backgroundColor: '#252525',
				backgroundColor: 'transparent',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: '60%',
					padding: '20px'
				}}
			>
				<Link 
					href='/' 
					sx={{ 
						textDecoration: 'none', 
						color: 'black', 
						'&:hover': { 
							color: 'black' 
						},
						display: 'flex',
						justifyContent: 'center',
						alignItems: "center",
						gap: '10px'
					}}
				>
					{/* <FaUser style={{ transform: 'scale(1.7)', marginRight: '10px' }} /> */}
					<Box>
						<Typography sx={{ fontWeight: '400', color: '#fcc204', fontSize: '3em', fontFamily: "'Tangerine', cursive", fontStyle: 'normal' }}>Nymphia</Typography>
					</Box>
				</Link>
				{user && (
					<Box 
						sx={{
							marginRight: '10px',
						}}
					>
						<Typography textAlign='end' sx={{ color: 'white' }}>
							Logado como {user?.email} | 
								<Button 
									variant='text'
									sx={{
										marginLeft: '5px',
										marginBottom: '3px'
									}}
									onClick={logout}
								>
									Deslogar
								</Button>
						</Typography>
					</Box>
				)}
			</Box>
		</Box>
	)
}