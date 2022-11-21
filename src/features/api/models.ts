export interface ValidationError {
	value: string;
	msg: string;
	param: string;
	location: string;
}

export interface ApiResponse {
	message: string;
	status: number;
	validationErrors?: ValidationError[];
}
