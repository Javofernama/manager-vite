
const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (userEmail: string, userPass: string) => {
   try {
    const response = await fetch(`${apiUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, userPass }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el login');
    }

    if (!data.access_token) {
      throw new Error(data.message || 'Error en el login');
    }

    const infoOnBase64 = data.access_token.split('.')[1]
    const userInfo = JSON.parse(atob(infoOnBase64));

    if (!userInfo.userId) {
      throw new Error(data.message || 'Error en el login');
    }

    localStorage.setItem('userId', userInfo.userId);
    localStorage.setItem('token', data.access_token);

    return data;
  } catch (error) {
    console.error('Error en login:', error);
    return;
  }
};

