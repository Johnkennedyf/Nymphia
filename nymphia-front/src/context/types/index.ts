export interface AuthUser {
	id?: string; 
	name?: string;
	description?: string;
	cpf?: string;
	email: string;
	birth?: string;
	phone?: string;
	created_at?: string; 
	updated_at?: string; 
}

export interface LoginUser {
	email: string;
	password: string;
}

export interface RegisterUser {
	name: string;
	cpf: string;
	birth: string;
	phone: string;
	email: string;
	password: string;
}

export interface AuthContextState {
	user: AuthUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export interface AuthContextType extends AuthContextState {
	login: (data: LoginUser) => void;
	logout: () => void;
}