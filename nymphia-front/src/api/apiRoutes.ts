const API_URL = 'http://localhost:4000'

export const apiRoutes = {
	login: `${API_URL}/users/login`,
	register: `${API_URL}/users`,
	findUserById: (id: string) => `${API_URL}/users/${id}`,
	changeUserDescription: (id: string) => `${API_URL}/users/${id}`,
	createPortfolio: `${API_URL}/portfolios`,
	findPortfoliosByUserId: (id: string) => `${API_URL}/portfolios/${id}`,
	deletePortfoliosById: (id: string) => `${API_URL}/portfolios/${id}`,
}