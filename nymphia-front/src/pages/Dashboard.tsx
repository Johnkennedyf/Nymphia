import { Box, Button, Card, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Skeleton, Typography } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { Navbar } from "../components/Navbar.tsx"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks/useAuth.tsx";
import { MdEdit, MdOutlineAdd } from "react-icons/md";
import { CreatePortfolioModal } from "../components/Modal/CreatePortfolioModal.tsx";
import { Portfolio, User } from "../types/models.ts";
import axios from "axios";
import { apiRoutes } from "../api/apiRoutes.ts";
import { formatDateToString } from "../utils/formatDateToString.ts";
import { ShowPortfolioModal } from "../components/Modal/ShowPortfolioModal.tsx";
import { IoMenu } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { ChangeDescriptionModal } from "../components/Modal/ChangeDescriptionModal.tsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const Dashboard = () => {
	const { user } = useAuth()
	const [updatedUser, setUpdatedUser] = useState<User>({} as User)
	const [portfolios, setPortfolios] = useState<Portfolio[]>([])
	
	const [openModal, setOpenModal] = useState(false);
	const [openDescriptionModal, setDescriptionModal] = useState(false);
	const [openPortfolioModal, setOpenPortfolioModal] = useState(false);
	const [openedPortfolio, setOpenedPortfolio] = useState<Portfolio>({} as Portfolio)

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const userMenu = Boolean(anchorEl);

	const handleClose = () => {
		setOpenModal(state => !state);
	}

	const handleCloseDescriptionModal = () => {
		setDescriptionModal(state => !state);
	}

	const handleClosePortfolioModal = () => {
		setOpenPortfolioModal(state => !state);
	}

	const handleCloseUserMenu = () => {
		setAnchorEl(null)
	}

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

	const queryUpdatedUser = async (): Promise<void> => {
		if (user?.id) {
			await axios.get(apiRoutes.findUserById(user.id))
				.then(res => {
					setUpdatedUser(res.data)
				})
				.catch(err => {
					console.log(err.message)
					console.error(err)
				})
		}
	}

	const queryData = async (): Promise<void> => {
		if (user?.id) {
			await axios.get(apiRoutes.findPortfoliosByUserId(user.id))
				.then(res => {
					setPortfolios(res.data)
				})
				.catch(err => {
					console.log(err.message)
          console.error(err)
				})
		}
	}

	useEffect(() => {
		queryData()
	}, [user, openModal, openPortfolioModal])

	useEffect(() => {
		queryUpdatedUser()
	}, [openDescriptionModal, user])

  const printRef = useRef();

  const handleDownloadPdf = async () => {
		//@ts-ignore
    const element: HTMLElement = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = (pdf.internal.pageSize.getWidth())*1.78
    const pdfHeight = ((imgProperties.height * pdfWidth) / imgProperties.width)*1.0

    pdf.addImage(data, 'PNG', -80, 0, pdfWidth, pdfHeight);
    pdf.save(`${user?.name?.replace(' ', '_').toLowerCase()}_portfolio.pdf`);
  };
		
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
				ref={printRef}
			>
				<Box
					sx={{
						maxWidth: '50vw',
						width: '100%',
						minHeight: '100px',
						padding: '30px',
						marginBottom: '150px',
						backgroundColor: 'white',
						borderRadius: '5px',
					}}
				>	
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<Box>
							<Box
								sx={{
									display: 'flex',
									gap: '10px',
									justifyContent: 'start',
									alignItems: 'center',
								}}
							>
								<Typography variant="h3" sx={{ fontWeight: '700' }}>{user?.name}</Typography>
								<IconButton
									id="user-menu-button"
									onClick={handleUserMenuClick}
								>
									<IoMenu />
								</IconButton>
								<Menu
									id="user-menu"
									anchorEl={anchorEl}
									open={userMenu}
									onClose={handleCloseUserMenu}
								>
									<MenuItem onClick={() => {
										handleCloseDescriptionModal();
										handleCloseUserMenu();
									}}>
										<ListItemIcon>
											<MdEdit />
										</ListItemIcon>
										<ListItemText>Descrição</ListItemText>
									</MenuItem>
									<MenuItem onClick={() => {
										handleDownloadPdf();
										handleCloseUserMenu();
									}}>
										<ListItemIcon>
											<IoMdDownload />
										</ListItemIcon>
										<ListItemText>Portfolio</ListItemText>
									</MenuItem>
								</Menu>
							</Box>
							<Typography variant="h6" sx={{ fontWeight: '400' }}>{user?.email}</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between'
							}}
						>
							<Box>
								<Box sx={{ display: 'flex', gap: '5px' }}>
									<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Telefone:</Typography>
									<Typography variant="subtitle1" sx={{ fontWeight: '400' }}>{user?.phone && user?.phone?.trim() !== '' ? user?.phone : '-'}</Typography>
								</Box>
								<Box sx={{ display: 'flex', gap: '5px' }}>
									<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Nascimento	:</Typography>
									<Typography variant="subtitle1" sx={{ fontWeight: '400' }}>{`${formatDateToString(new Date(user?.birth || ''))}`}</Typography>
								</Box>
								<Box sx={{ display: 'flex', gap: '5px' }}>
									<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>CPF:</Typography>
									<Typography variant="subtitle1" sx={{ fontWeight: '400' }}>{user?.cpf && user?.cpf?.trim() !== '' ? user?.cpf : '-'}</Typography>
								</Box>
							</Box>
						</Box>
					</Box>

					<Box
						sx={{
							marginTop: '30px',
						}}
					>
						{!updatedUser.description || updatedUser.description?.trim() === '' ? (
								<>
									<Typography
										sx={{
											color: 'rgba(0, 0, 0, 0.2)'
										}}
									>
										Este usuário não possui nenhuma descrição! Adicione sua própria descrição!
									</Typography>
								</>
							) : (
								<>
									<Typography
										variant="body1"
									>
										{updatedUser.description}
									</Typography>
								</>
								)}
					</Box>

					<Box sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', flexWrap: 'wrap' }}>
						<Box sx={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
							<Typography variant="h4" sx={{ fontWeight: 'bold' }}>Portfólio</Typography>
							{/* <Button variant="contained" sx={{ borderRadius: '50px' }}>+</Button> */}
							<IconButton aria-label="add" size="large" color='info' onClick={handleClose}>
								<MdOutlineAdd />
							</IconButton>
						</Box>
						{portfolios.length > 0 ? 
						<>
							<Box
								sx={{
									display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'start',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
									borderRadius: '5%',
								}}
							>
								{portfolios.map(portfolio => (
									<Card 
										id={portfolio.id}
										key={portfolio.id}
										sx={{
											display: 'flex',
											flexDirection: 'column',
											boxShadow: 'none',
											border: '1px solid rgba(0, 0, 0, 0.2)'
											// padding: '10px'
										}}
									>
										<Box>
											<img 
												src={portfolio.img}
												alt={portfolio?.name}
												style={{
													height: '200px',
													width: '200px',
													objectFit: 'cover',
													// borderRadius: '5%',
													// boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.2)',
													cursor: 'pointer'
												}} 
												onClick={() => {
													setOpenedPortfolio(portfolio)
													handleClosePortfolioModal()
												}}
											/>
										</Box>
										<Box
											sx={{
												padding: '10px'
											}}
										>
											<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
												{portfolio.name}
											</Typography>
											<Typography variant="subtitle1">
												{portfolio.description}
											</Typography>
											<Typography 
												variant="caption"
												sx={{
													alignSelf: 'end',
													marginTop: '10px'
												}}
											>
												{`${formatDateToString(new Date(portfolio?.created_at))}`}
											</Typography>
										</Box>
									</Card>
								))}
							</Box>
						</> : 
						<>
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
						</>}
					</Box>
				</Box>
			</Box>
			<ToastContainer />

			<CreatePortfolioModal open={openModal} onClose={handleClose} />
			<ChangeDescriptionModal open={openDescriptionModal} onClose={handleCloseDescriptionModal} user={updatedUser} />
			<ShowPortfolioModal open={openPortfolioModal} onClose={handleClosePortfolioModal} portfolio={openedPortfolio} />
		</Box>
	)
}