import React, { useState } from "react";
import { Box, Button, Card, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Portfolio } from "../../types/models.ts";
import { formatDateToString } from "../../utils/formatDateToString.ts";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { apiRoutes } from "../../api/apiRoutes.ts";
import { toast } from "react-toastify";

type ShowPortfolioModalProps = {
  open: boolean;
  onClose: () => void;
	portfolio: Portfolio;
};

export const ShowPortfolioModal = (props: ShowPortfolioModalProps) => {
	const portfolio = props.portfolio;

	const deletePortfolio = async () => {
		await axios.delete(apiRoutes.deletePortfoliosById(portfolio.id))
			.then(res => {
				toast.success('Portfolio deletado!');
				props.onClose();
			})
			.catch(err => {
				toast.error(err.response.data.message)
				console.error(err)
			})
	}

  return (
    <Modal
      open={props.open}
			onClose={props.onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: 'center',
					gap: '20px',
					width: '40vw'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'start',
						width: '100%'
					}}
				>
					<img 
						src={portfolio.img} 
						alt="Imagem"
						style={{
							height: '25vw',
							width: '25vw',
							objectFit: 'cover',
							boxShadow: '3px 3px 3px 1px rgba(0, 0, 0, 0.2)',
						}} 
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
							padding: '20px'
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'start',
								gap: '8px',
								flex: 1,
								height: '100%',
								width: '100%'
							}}
						>
							<Typography variant="h3">
								{portfolio.name}
							</Typography>
							<Typography variant="body1">
								{portfolio.description}
							</Typography>
							<Typography 
								variant="caption"
								sx={{
									alignSelf: 'start',
									marginTop: '10px'
								}}
							>
								{`${formatDateToString(new Date(portfolio?.created_at))}`}
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'end',
								alignItems: 'end',
                gap: '10px',
								width: '100%'
							}}
						>
							<IconButton
								onClick={deletePortfolio}
							>
								<FaTrashAlt color="red" />
							</IconButton>
						</Box>
					</Box>
				</Box>
			</Card>
    </Modal>
  );
};
