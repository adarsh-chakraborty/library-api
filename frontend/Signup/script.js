const emailInput = document.querySelector('#email');
const userNameInput = document.querySelector('#userName');
const passInput = document.querySelector('#passwordNew');
const confPassInput = document.querySelector('#passwordConf');
const btnSignup = document.querySelector('#btnSignup');
const error = document.querySelector('#error');

btnSignup.addEventListener('click', async (e) => {
  e.preventDefault();
  error.classList.replace('success', 'error');

  try {
    if (passInput.value !== confPassInput.value) {
      error.innerHTML = `<h2>Password and Confirm password should match!</h2>`;
      return;
    }

    const payload = {
      username: userNameInput.value,
      email: emailInput.value,
      password: passInput.value
    };

    const res = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const response = await res.json();

    if (!res.ok) {
      error.innerHTML = `Error: ${
        response?.message ?? 'Something went wrong.'
      }`;
    }

    error.innerHTML = `<h2>${response.message}</h2>`;
    if (res.status === 201) {
      error.classList.replace('error', 'success');
      setTimeout(() => {
        window.location = '/login';
      }, 5000);
    }
    console.log(response);
  } catch (err) {
    console.log(err);
    error.innerHTML = `<h2>Something went wrong, try again!</h2>`;
  }
});
