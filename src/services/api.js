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
  console.log(data);
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
  console.log(data);
  return data;
};