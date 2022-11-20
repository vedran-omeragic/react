import { UserPermission } from '../userPermissons/models';

export interface UserData {
	username: string;
	email: string;
	first_name: string | null;
	last_name: string | null;
	date_of_birth: Date | null;
	status: string | null;
}

export interface UserFormData extends UserData {
	password: string;
}

export interface UserFormUpdateData extends UserFormData {
	id: number;
}
export interface User extends UserData {
	id: number;
	created_at: Date;
	updated_at: Date | null;
	user_permissions: UserPermission[];
}
