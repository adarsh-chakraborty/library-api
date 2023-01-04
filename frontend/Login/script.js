const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');
const error = document.getElementById('error');

submit.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    if (!email.value || !password.value) {
      error.innerHTML = `<h2>All fields are required!</h2>`;
      return;
    }
    const payload = {
      email: email.value,
      password: password.value
    };
    const res = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const response = await res.json();
    error.innerHTML = `<h2>${response.message}</h2>`;

    if (res.status === 202) {
      error.classList.replace('error', 'success');
      setTimeout(() => {
        window.location = '/';
      }, 3500);
    }
    console.log(response);
  } catch (err) {
    error.innerHTML = `<h2>Something went wrong, try again!</h2>`;
    console.log(err);
  }
});
