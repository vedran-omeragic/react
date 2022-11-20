import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers, deleteUser } from '../../features/user/thunk';
import {
	pageIncrease,
	pageDecrease,
	setOrderColumn,
	setOrderDirection,
	setSearchValue,
} from '../../features/user/slice';
import { User } from '../../features/user/models';
import TableRow from './TableRow';
import Button from '../Button';
import './style.css';

function Table() {
	const page = useAppSelector((state) => state.userList.page);
	const sortColumn = useAppSelector((state) => state.userList.column);
	const sortDirection = useAppSelector((state) => state.userList.direction);
	const searchValue = useAppSelector((state) => state.userList.search);
	const dispatch = useAppDispatch();

	const [paginatedUserList, setPaginatedUserList] = useState([]);
	const [searchInputValue, setSearchInputValue] = useState('');

	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [modalUserId, setModalUserId] = useState(-1);

	const [apiResponse, setApiResponse] = useState({});

	useEffect(() => {
		dispatch(fetchUsers({ page, sortColumn, sortDirection, searchValue }))
			.then((res) => {
				setPaginatedUserList(res.payload);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [dispatch, page, sortColumn, sortDirection, searchValue, apiResponse]);

	function changeDirection() {
		if (sortDirection === 'asc') {
			return 'desc';
		}
		return 'asc';
	}

	const handlePageDecrease = () => {
		dispatch(pageDecrease());
	};

	const handlePageIncrease = () => {
		dispatch(pageIncrease());
	};

	const handleOrderColumn = (column: string) => {
		if (sortColumn === column) {
			dispatch(setOrderDirection(changeDirection()));
		}
		dispatch(setOrderColumn(column));
	};

	const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInputValue(event.target.value);
	};

	const handleSearchSubmit = () => {
		dispatch(setSearchValue(searchInputValue));
	};

	const clearSearchInput = () => {
		setSearchInputValue('');
		dispatch(setSearchValue(''));
	};

	const getChevron = (column: string) => {
		if (sortColumn === column) {
			if (sortDirection === 'desc') {
				return '⬆';
			} else {
				return '⬇';
			}
		}
	};

	const openModal = (id: number, username: string) => {
		setModalMessage(`Aare you sure you wish to delete user ${username}?`);
		setModalUserId(id);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const renderModal = () => {
		return (
			<div className="modal">
				<div className="modalContent">
					<span
						className="close"
						onClick={() => closeModal()}
					>
						&times;
					</span>
					<p>{modalMessage}</p>
					<Button onClick={() => handleDelete(modalUserId)}>Confirm</Button>
				</div>
			</div>
		);
	};

	const handleDelete = (id: number) => {
		dispatch(deleteUser(id))
			.then((res) => {
				setApiResponse(res.payload);
				closeModal();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className="tableWrapper">
			<div className="searchBarContainer">
				<input
					type="text"
					id="searchBar"
					name="searchBar"
					value={searchInputValue}
					onChange={(event) => handleSearchInput(event)}
				/>
				<Button onClick={() => handleSearchSubmit()}>Search</Button>
				<Button onClick={() => clearSearchInput()}>Clear</Button>
			</div>
			<div></div>
			<div className="tableContainer">
				<table className="userTable">
					<thead>
						<tr className="tableHeader">
							<th onClick={() => handleOrderColumn('id')}>ID {getChevron('id')}</th>
							<th onClick={() => handleOrderColumn('username')}>Username {getChevron('username')}</th>
							<th onClick={() => handleOrderColumn('email')}>Email {getChevron('email')}</th>
							<th onClick={() => handleOrderColumn('first_name')}>First Name {getChevron('first_name')}</th>
							<th onClick={() => handleOrderColumn('last_name')}>Last Name {getChevron('last_name')}</th>
							<th onClick={() => handleOrderColumn('date_of_birth')}>Date of Birth {getChevron('date_of_birth')}</th>
							<th onClick={() => handleOrderColumn('status')}>Status {getChevron('status')}</th>
							<th onClick={() => handleOrderColumn('created_at')}>Created At {getChevron('created_at')}</th>
							<th onClick={() => handleOrderColumn('updated_at')}>Updated At {getChevron('updated_at')}</th>
							<th>Permissions</th>
							<th>Edit</th>
							<th>Delete</th>
							<th>Manage Perissions</th>
						</tr>
					</thead>
					<tbody>
						{paginatedUserList.map((user: User) => {
							return (
								<TableRow
									key={user.id}
									deleteFn={() => openModal(user.id, user.username)}
									{...user}
								/>
							);
						})}
					</tbody>
					<tfoot>
						<tr>
							<td>
								<Button
									onClick={() => handlePageDecrease()}
									disabled={page <= 0}
								>
									Previous
								</Button>
							</td>
							<td colSpan={11}> Page: {page}</td>
							<td>
								<Button
									onClick={() => handlePageIncrease()}
									disabled={paginatedUserList.length < 10}
								>
									Next
								</Button>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
			{showModal && renderModal()}
		</div>
	);
}

export default Table;
