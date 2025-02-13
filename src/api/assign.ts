
const apiUrl = import.meta.env.VITE_API_URL;

export const assignMe = async (userId: string, companyId: string) => {
   try {
    const token = localStorage.getItem('token');
    if (!token) {
      return [];
    }

    const response = await fetch(`${apiUrl}/assign`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: Number(userId), companyId: Number(companyId) }),
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

