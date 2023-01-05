const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');
const error = document.getElementById('error');
const modal = document.querySelector('.modal');

const img = {
  failed: '/assets/failed.png',
  success: '/assets/check.png',
  loading: '/assets/loading.svg'
};

submit.addEventListener('click', async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (!email.value || !password.value) {
      error.innerHTML = `<h2>All fields are required!</h2>`;
      setLoading(false);
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
    console.log(res.status, res.statusText);
    const response = await res.json();
    console.log(response);
    error.innerHTML = `<h2>${response.message}</h2>`;

    if (res.ok) {
      setLoading(true, response.message, img.success);
      error.classList.replace('error', 'success');
      setTimeout(() => {
        window.location = '/';
      }, 3000);
      return;
    }
    setLoading(true, response.message, img.failed);
    setTimeout(() => {
      setLoading(false);
    }, 2200);
  } catch (err) {
    error.innerHTML = `<h2>Something went wrong, try again!</h2>`;
    console.log(err);
    setLoading(false);
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
