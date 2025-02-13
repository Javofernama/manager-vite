import { Company } from "../interfaces/company";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchCompanies = async (): Promise<Company[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return [];
    }

    const response = await fetch(`${apiUrl}/company`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
};
