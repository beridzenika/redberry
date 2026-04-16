const baseUrl = process.env.REACT_APP_BASE_URL;

export const loginUser = async (email, password) => {
  const res = await fetch(`${baseUrl}/login`, {
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

  const res = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.message); err.errors = data.errors; throw err;
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


  const res = await fetch (`${baseUrl}/profile`, {
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
    const err = new Error(data.message); err.errors = data.errors; throw err;
  }

  return data;
}


export const getData = async (url) => {
  const res = await fetch(`${baseUrl}/${url}`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch featured courses');
  }
  return data;
};
export const getOutherisedData = async (token, url) => {
  const res = await fetch(`${baseUrl}/${url}`, {
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
    throw new Error(data.message || 'Failed to fetch');
  }
  return data;
};

export const postEnroll = async (courseId, courseScheduleId, force, token) => {
  const res = await fetch(`${baseUrl}/enrollments`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId, courseScheduleId, force }),
  });

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    const err = new Error(data.message); Object.assign(err, data); err.status = res.status; throw err;
  }
  return data;
};

export const completeCourse = async (courseId, token) => {
  const res = await fetch (`${baseUrl}/enrollments/${courseId}/complete`, {
    method: 'PATCH',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    const err = new Error(data.message); err.errors = data.errors; throw err;
  }
  return data;
}

export const postReview = async (courseId, rating, token) => {
  const res = await fetch(`${baseUrl}/courses/${courseId}/reviews`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({rating}),
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    const err = new Error(data.message); err.errors = data.errors; throw err;
  }
  return data;
};

export const deleteCourse = async (courseId, token) => {
  const res = await fetch(`${baseUrl}/enrollments/${courseId}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null;
  }

  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    }
    throw new Error(data.message || 'Failed to delete');
  }
  return data;
}