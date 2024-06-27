import React, { useState } from "react";
import { Box, Button, Card, IconButton, Modal, TextField, Typography } from "@mui/material";
import { MdPhotoCamera } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useAuth } from "../../hooks/useAuth.tsx";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";
import { apiRoutes } from "../../api/apiRoutes.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type CreatePortfolioModalProps = {
  open: boolean;
  onClose: () => void;
};

export const CreatePortfolioModal = (props: CreatePortfolioModalProps) => {
	const [image, setImage] = useState('/assets/photoicon.jpg')
	const { user } = useAuth()

	const formik = useFormik({
		initialValues: {
			img: '',
			name: '',
			description: '',
		},
		validationSchema: Yup.object({
			img: Yup.string()
				.required(),
			name: Yup.string(),
			description: Yup.string()
		}),
		onSubmit: async values => {
      const sendData = {
				img: image,
        name: values.name,
        description: values.description,
				user_id: user?.id 
			}

			await axios.post(apiRoutes.createPortfolio, sendData)
				.then(res => {
					toast.success('Portfolio criado!');
					closeInnerModal()
				})
				.catch(err => {
					toast.error(err.response.data.message);
					console.error(err);
				})
    }
	})

	const { handleSubmit, values, dirty, isValid, setValues, resetForm } = formik;

  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
		const imgObj: File = target.files[0]

    fileReader.readAsDataURL(imgObj);
		fileReader.onload = (e) => {
			const imgString = e.target?.result?.toString() || ''
			
			setImage(imgString)
			setValues({ ...values, img: imgString })
		}
  };

	const closeInnerModal = () => {
		props.onClose();
    resetForm();
		setImage('/assets/photoicon.jpg')
	}

  return (
    <Modal
      open={props.open}
			onClose={closeInnerModal}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
			<form onSubmit={handleSubmit}>
				<Card
					sx={{
						minWidth: "30vw",
						minHeight: "30vh",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: 'center',
						gap: '20px',
						padding: '10px'
					}}
				>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Crie seu portfólio
					</Typography>
					<Box
						sx={{
							display: 'flex',
							gap: '20px',
							justifyContent: 'center',
							width: '100%'
						}}
					>
						<Box
							sx={{
								display: 'flex',
                flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
                gap: '10px',
							}}
						>
							<input
									accept="image/*"
									id="icon-button-photo"
									onChange={handleCapture}
									type="file"
									hidden
							/>
							<img 
								src={image} 
								alt="Imagem"
								style={{
									borderRadius: '5%',
									// border: '1px solid black',
									height: '150px',
									width: '150px',
									objectFit: 'cover',
									boxShadow: '3px 3px 3px 1px rgba(0, 0, 0, 0.2)',
								}} 
							/>
							<label htmlFor="icon-button-photo">
								<IconButton color="primary" component="span">
									<FaFileUpload />
								</IconButton>
							</label>
						</Box>
						<Box 
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'start',
								gap: '8px',
								flex: 1
							}}
						>
							<TextField
								type="text"
								placeholder="Nome"
								label="Nome"
								fullWidth
								{...formik.getFieldProps('name')}
							/>
							<TextField
								type="text"
								placeholder="Descrição"
								label="Descrição"
								fullWidth
								multiline
								rows={3}
								{...formik.getFieldProps('description')}
							/>
						</Box>
					</Box>
					<Button
						type="submit" 
						variant="contained"
						disabled={isValid && !dirty}
					>
						Adicionar
					</Button>
				</Card>
			</form>
    </Modal>
  );
};
