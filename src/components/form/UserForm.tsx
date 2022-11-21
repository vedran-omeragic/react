import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useAppDispatch } from '../../redux/hooks';
import { createUser, updateUser, fetchUser } from '../../features/user/thunk';
import { ApiResponse } from '../../features/api/models';
import Button from '../Button';
import './UserForm.css';

const UserForm = () => {
	const dispatch = useAppDispatch();

	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (params.id) {
			dispatch(fetchUser(Number(params.id)))
				.then((res) => {
					const userId = _.get(res, 'payload.id', null);
					const status = _.get(res, 'payload.status', null);
					if (!userId && status) {
						const message = _.get(res, 'payload.message', '');
						const validationErrors = _.get(res, 'payload.validationErrors', '');
						setApiResponse({
							message: message,
							status: status,
							validationErrors: validationErrors,
						} as ApiResponse);
					} else {
						setUserId(Number(params.id));
						setUsername(_.get(res, 'payload.username', ''));
						setEmail(_.get(res, 'payload.email', ''));
						setFirstName(_.get(res, 'payload.first_name', ''));
						setLastName(_.get(res, 'payload.last_name', ''));
						setStatus(_.get(res, 'payload.status', ''));
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [params.id]);

	const [apiResponse, setApiResponse] = useState<ApiResponse>();
	const [userId, setUserId] = useState<number>();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [status, setStatus] = useState('');

	const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(event.target.value);
	};

	const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(event.target.value);
	};

	const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStatus(event.target.value);
	};

	const handleSubmit = () => {
		const userData = {
			username: username,
			email: email,
			password: password,
			first_name: firstName,
			last_name: lastName,
			status: status,
			date_of_birth: new Date(Date.now()), // TODO date picker
		};
		dispatch(userId ? updateUser({ id: userId, ...userData }) : createUser(userData))
			.then((res) => handleResponse(res, userId ? 'User updated' : 'New user created'))
			.catch((err) => {
				console.error(err);
			});
	};

	const handleResponse = (res: any, successMsg = 'Success') => {
		const userId = _.get(res, 'payload.id', null);
		const status = _.get(res, 'payload.status', null);

		if (userId) {
			setApiResponse({
				message: successMsg,
				status: 200,
			} as ApiResponse);
			setUserId(userId);
			navigate(`/form/${userId}`);
		} else if (!userId && status) {
			const message = _.get(res, 'payload.message', '');
			const validationErrors = _.get(res, 'payload.validationErrors', '');
			setApiResponse({
				message: message,
				status: status,
				validationErrors: validationErrors,
			} as ApiResponse);
		} else {
			setApiResponse({
				message: 'Internal Server Error',
				status: 500,
			} as ApiResponse);
		}
	};

	const resetForm = () => {
		if (params.id) {
			navigate('/form/');
		}
		setUserId(undefined);
		setApiResponse(undefined);
		setUsername('');
		setEmail('');
		setPassword('');
		setFirstName('');
		setLastName('');
		setStatus('');
		navigate('/form/');
	};

	return (
		<div className="formWrapper">
			<div className="formContainer">
				<div className="responseWrapper">
					{apiResponse && (
						<div
							className="responseContainer"
							style={apiResponse.status === 200 ? { backgroundColor: '#b9fabf' } : { backgroundColor: '#fc9f9f' }}
						>
							<div>Status: {apiResponse.status}</div>
							<div>Message: {apiResponse.message}</div>
							{apiResponse.validationErrors && (
								<div>
									{apiResponse.validationErrors.map((item) => {
										return (
											<ul key={item.msg}>
												<li>Input: {item.param}</li>
												<li>Message: {item.msg}</li>
											</ul>
										);
									})}
								</div>
							)}
						</div>
					)}
				</div>
				<form className="userForm">
					<table className="userFormTable">
						<thead>
							<tr className="tableHeader">
								<th colSpan={2}>
									{userId ? (
										<h1 className="userFormTitle">UPDATING USER `{username}`</h1>
									) : (
										<h1 className="userFormTitle">CREATING NEW USER</h1>
									)}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<label>Username</label>
								</td>
								<td>
									<input
										type="text"
										value={username}
										onChange={(event) => handleUsername(event)}
									/>
								</td>
							</tr>
							<tr>
								<td>
									<label>Email</label>
								</td>
								<td>
									<input
										type="text"
										value={email}
										onChange={(event) => handleEmail(event)}
									/>
								</td>
							</tr>
							<tr>
								<td>
									<label>Password</label>
								</td>
								<td>
									<input
										type="password"
										value={password}
										onChange={(event) => handlePassword(event)}
									/>
								</td>
							</tr>
							<tr>
								<td>
									<label>First Name</label>
								</td>
								<td>
									<input
										type="text"
										value={firstName}
										onChange={(event) => handleFirstName(event)}
									/>
								</td>
							</tr>
							<tr>
								<td>
									<label>Last Name</label>
								</td>
								<td>
									<input
										type="text"
										value={lastName}
										onChange={(event) => handleLastName(event)}
									/>
								</td>
							</tr>
							<tr>
								<td>
									<label>Status</label>
								</td>
								<td>
									<input
										type="text"
										value={status}
										onChange={(event) => handleStatus(event)}
									/>
								</td>
							</tr>
						</tbody>
						<tfoot>
							<tr className="userFormFooter">
								<td>
									<Button onClick={() => handleSubmit()}>{userId ? 'Update User' : 'Create New'}</Button>
								</td>
								<td>
									<Button onClick={() => resetForm()}>{userId ? 'New User' : 'Reset'}</Button>
								</td>
							</tr>
						</tfoot>
					</table>
				</form>
			</div>
		</div>
	);
};

export default UserForm;
