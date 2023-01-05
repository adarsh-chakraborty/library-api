const emailInput = document.querySelector('#email');
const userNameInput = document.querySelector('#userName');
const passInput = document.querySelector('#passwordNew');
const confPassInput = document.querySelector('#passwordConf');
const btnSignup = document.querySelector('#btnSignup');
const error = document.querySelector('#error');
const modal = document.querySelector('.modal');

const img = {
  failed: '/assets/failed.png',
  success: '/assets/check.png',
  loading: '/assets/loading.svg'
};

btnSignup.addEventListener('click', async (e) => {
  e.preventDefault();
  setLoading(true);
  error.classList.replace('success', 'error');

  try {
    if (passInput.value !== confPassInput.value) {
      error.innerHTML = `<h2>Password and Confirm password should match!</h2>`;
      setLoading(false);
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
      setLoading(false);
      return;
    }

    error.innerHTML = `<h2>${response.message}</h2>`;
    if (res.status === 201) {
      error.classList.replace('error', 'success');
      setLoading(
        true,
        'Account created! You can login now. Redirecting in 5s..',
        img.success
      );
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

function setLoading(show, text, imageUrl) {
  if (show) {
    modal.style.display = 'block';
    if (text) {
      // custom text
      modal.innerHTML = `<div id="modal">
      <div class="modal-container">
        <div id="loader">
          <img
            src="${imageUrl}"
            alt="${text}"
            class="loading"
            width="120px"
            style="padding: 4px; margin-top: 1rem;"
          />
        </div>
        <div id="loader-text" style="margin-top: 2rem;">${text}</div>
      </div>
    </div>`;
      return;
    }
    modal.innerHTML = ` <div id="modal">
    <div class="modal-container">
      <div id="loader">
        <img
          src="/assets/loading.svg"
          alt="Loading.. Please wait.."
          class="loading"
        />
      </div>
      <div id="loader-text">Processing your request. Please wait...</div>
    </div>
  </div>`;
    return;
  }
  console.log('hiding modal');
  modal.innerHTML = '';
  modal.style.display = 'none';
}
