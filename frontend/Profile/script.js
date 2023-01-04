const container = document.getElementById('container');

getProfile();

async function getProfile() {
  try {
    const res = await fetch('/auth/profile');

    if (!res.ok) {
      container.innerHTML = `<h2 class="error">Error loading your profile, try again later.</h2>`;
      return;
    }
    const response = await res.json();

    container.innerHTML = `<h2>Welcome, ${response.username}</h2>
    <h2>You've signed in as ${response.email}</h2>
    <a href="/logout"><button>Logout</button></a>`;
  } catch (err) {
    container.innerHTML = `<h2 class="error">Error loading your profile, try again later.</h2>`;
  }
}
