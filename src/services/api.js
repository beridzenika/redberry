
export const loginUser = async (email, password) => {
  const res = await fetch(`https://api.redclass.redberryinternship.ge/api/login`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
};

export const registerUser = async ({ email, password, password_confirmation, username, avatar }) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('password_confirmation', password_confirmation);
  if (avatar) {
    formData.append('avatar', avatar);
  }

  const res = await fetch('https://api.redclass.redberryinternship.ge/api/register', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw { message: data.message, errors: data.errors };
  }
  return data;
};

export const updateProfile = async (profileData, token) => {
  const formData = new FormData();

  if (profileData.fullName) formData.append('full_name', profileData.fullName);
  if (profileData.mobileNumber) formData.append('mobile_number', profileData.mobileNumber.replace(/\s/g, ''));
  if (profileData.age) formData.append('age', profileData.age);
  if (profileData.avatar instanceof File) {
    formData.append('avatar', profileData.avatar);
  }


  const res = await fetch ('https://api.redclass.redberryinternship.ge/api/profile', {
    method: 'PUT',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    throw {message: data.message, errors: data.errors };
  }
  
  return data;
}


export const getData = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw { message: data.message || 'Failed to fetch featured courses'};
  }
  return data;
};
export const getOutherisedData = async (token, url) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
       'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    throw { message: data.message || 'Failed to fetch'};
  }
  return data;
};
