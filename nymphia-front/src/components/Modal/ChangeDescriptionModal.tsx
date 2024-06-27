import React, { useEffect, useState } from "react";
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
import { User } from "../../types/models.ts";

type ChangeDescriptionModalProps = {
  open: boolean;
  onClose: () => void;
	user: User;
};

export const ChangeDescriptionModal = (props: ChangeDescriptionModalProps) => {
	// const { user } = useAuth()
	const user = props.user;
	const [prevDescription, setPrevDescription] = useState<string>('')

	const formik = useFormik({
		initialValues: {
			description: user?.description,
		},
		validationSchema: Yup.object({
			description: Yup.string()
		}),
		enableReinitialize: true,
		onSubmit: async values => {
      const sendData = {
        description: values.description,
			}

			await axios.put(apiRoutes.changeUserDescription(user?.id || ''), sendData)
				.then(res => {
					toast.success('Descrição alterada!');
					closeInnerModal()
				})
				.catch(err => {
					toast.error(err.response.data.message);
					console.error(err);
				})
    }
	})

	const { handleSubmit, values, dirty, isValid, setValues, resetForm } = formik;

	const closeInnerModal = () => {
		props.onClose();
    resetForm();
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
						minWidth: "20vw",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: 'center',
						gap: '20px',
						padding: '20px'
					}}
				>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Alterar descrição
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
								justifyContent: 'start',
								gap: '8px',
								flex: 1
							}}
						>
							<TextField
								type="text"
								placeholder="Descrição"
								label="Descrição"
								fullWidth
								multiline
								rows={8}
								InputLabelProps={{ shrink: true }}
								{...formik.getFieldProps('description')}
							/>
						</Box>
					</Box>
					<Button
						type="submit" 
						variant="contained"
						disabled={isValid && !dirty}
					>
						Alterar
					</Button>
				</Card>
			</form>
    </Modal>
  );
};
