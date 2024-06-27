import React from "react"
import { 
	Box, 
	Button, 
	Card, 
	InputAdornment, 
	TextField, 
	Typography
} from '@mui/material';
import { Navbar } from "../components/Navbar.tsx";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Home = (props: any) => {
	const navigate = useNavigate()

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
					padding: '5vw',
					justifyContent: 'start',
					alignItems: "center",
					color: 'white',
					gap: '10px',
				}}
			>
				<Box
					sx={{
						height: '100%',
						width: '80%',
						display: "flex",
						justifyContent: 'start',
						alignItems: "start",
						flexDirection: "column",
						color: 'white',
						gap: '10px',
						// border: '1px solid red'
					}}
				>
					<Typography variant="h2" sx={{ fontFamily: 'Roboto', fontWeight: '700' }}>Seu próprio portfólio</Typography>
					<Typography variant="h5" sx={{ fontFamily: 'Roboto',  }}>Um ambiente para você armazenar seu trabalho e compartilhar suas habilidades</Typography>
					<Button variant="contained" sx={{ padding: '20px', backgroundColor: '#272727', marginTop: '40px' }}>
						<Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
							Iniciar portfólio
						</Link>
					</Button>
				</Box>
				<Box sx={{ 
					// border: '1px solid red',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<img src="/assets/pasta.png" alt="" />
				</Box>
			</Box>

			<ToastContainer />
		</Box>
	);
};