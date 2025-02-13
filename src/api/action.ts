import { Action } from "../interfaces/company";
const apiUrl = import.meta.env.VITE_API_URL;


export const assignAction = async (action: Omit<Action, "actionId">) => {
   try {
    const token = localStorage.getItem('token');
    if (!token) {
      return [];
    }

    const response = await fetch(`${apiUrl}/action`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el login');
    }

    return data;
  } catch (error) {
    console.error('Error en login:', error);
    return;
  }
};

