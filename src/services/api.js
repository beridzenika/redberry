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