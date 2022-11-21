import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';
import { fetchUserPermissions, createUserPermission, deleteUserPermission } from '../../features/user/thunk';
import { fetchAllPermissions } from '../../features/userPermissons/thunk';
import { Permission, UserPermission } from '../../features/userPermissons/models';
import { useAppDispatch } from '../../redux/hooks';
import { ApiResponse } from '../../features/api/models';
import './PermissionForm.css';

const PermissionForm = () => {
	const dispatch = useAppDispatch();
	const params = useParams();

	const [permissionList, setPermissionList] = useState<Permission[]>();
	const [userPermissions, setUserPermissions] = useState<string[]>([]);
	const [apiResponse, setApiResponse] = useState<ApiResponse>();

	useEffect(() => {
		if (params.id) {
			// Fetch all permissions
			dispatch(fetchAllPermissions())
				.then((res) => {
					setPermissionList(res.payload);
				})
				.catch((err) => {
					console.error(err);
				});
			// Fetch user specific permissions
			dispatch(fetchUserPermissions(Number(params.id)))
				.then((res) => {
					const status = _.get(res, 'payload.status', null);
					if (!status) {
						const allUserPermissions: UserPermission[] = res.payload;
						const permsCodeList: string[] = [];
						allUserPermissions.map((perm) => {
							permsCodeList.push(perm.permission_code);
						});
						setUserPermissions(permsCodeList);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [dispatch, apiResponse]);

	const handleClick = (code: string) => {
		console.log(code);
		if (userPermissions.includes(code)) {
			dispatch(deleteUserPermission({ user_id: Number(params.id), permission_code: code }))
				.then((res) => {
					const userId = _.get(res, 'payload.user_id', null);
					const permissionCode = _.get(res, 'payload.permission_code', null);
					if (userId && permissionCode) {
						handleSuccessResponse(`Permission ${permissionCode} revoked from user with ID ${userId}`);
					} else {
						handleFailResponse(res);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			dispatch(createUserPermission({ user_id: Number(params.id), permission_code: code }))
				.then((res) => {
					const userId = _.get(res, 'payload.user_id', null);
					const permissionCode = _.get(res, 'payload.permission_code', null);
					if (userId && permissionCode) {
						handleSuccessResponse(`Permission ${permissionCode} given to user with ID ${userId}`);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	const handleFailResponse = (res: any) => {
		const message = _.get(res, 'payload.message', 'An error occured');
		const status = _.get(res, 'payload.status', 500);
		const validationErrors = _.get(res, 'payload.validationErrors', []);
		setApiResponse({
			message: message,
			status: status,
			validationErrors: validationErrors,
		} as ApiResponse);
	};

	const handleSuccessResponse = (message: string) => {
		setApiResponse({
			message: message,
			status: 200,
		} as ApiResponse);
	};

	return (
		<div className="permissionFormContainer">
			<div className="permissionList">
				<div className="userPermissionsFormHeader">
					<h1>UPDATING PERMISSIONS FOR USER WITH ID `{params.id}`</h1>
				</div>
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
				{permissionList &&
					permissionList.map((perm: Permission) => {
						return (
							<div
								key={perm.code}
								className={classNames({
									permissionItem: true,
									hasPermission: userPermissions.includes(perm.code),
								})}
								onClick={() => handleClick(perm.code)}
							>
								<div className="checkbox">
									{userPermissions.includes(perm.code) && <div className="checkmark"></div>}
								</div>
								<div className="title">{perm.code}</div>
								<div className="description">{perm.description}</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default PermissionForm;
