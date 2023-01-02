let currentPage = 0;

const pagination = document.querySelector('#pagination');
pagination.addEventListener('click', (e) => {
  if (e.target.tagName !== 'A') return;
  const link = e.target;

  const pageToLoad = parseInt(link.dataset.page);
  console.log(pageToLoad);
  setLoading();
  fetchBooks(pageToLoad);
});
fetchBooks();

async function fetchBooks(page = 1) {
  const url = '/api/books?page=' + page;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  currentPage = page;
  console.log(data);
  setupPagination(data, page);
  renderBooks(data);
}

function renderBooks(data) {
  let html = ``;

  data.books.forEach((book) => {
    html += `<div class="book-tabs">
        <div class="book-image">
            <a href="#">
                <img src="/assets/assets/dummy-book.svg" width="185px" alt="">
            </a>
        </div>
        <div class="book-details">
            <h5>${book.book}</h5>
            <h6>${book.author}</h6>
            <h4>₹${book.price}</h>
        </div>
    </div>`;
  });

  container.innerHTML = html;
}

function setupPagination(data, page) {
  const size = 4;

  const { totalBooks } = data;
  const totalPages = Math.ceil(totalBooks / size);

  let html = '';
  if (currentPage != 1) {
    html += `<a id="pageNum" href="#" data-page="1">&laquo;</a>`;
  }
  if (data.hasPrevPage) {
    html += `<a id="pageNum" href="#" data-page="${
      currentPage - 1
    }">&laquo;</a>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    html += `<a id="pageNum" data-page="${i}" class="${
      currentPage === i ? 'active' : ''
    }" href="#">${i}</a>`;
  }
  if (data.hasNextPage) {
    html += `
        <a id="pageNum" href="#" data-page="${currentPage + 1}">
          &raquo;
        </a>`;
  }
  if (currentPage != data.lastPage) {
    html += `
        <a id="pageNum" href="#" data-page="${data.lastPage}">
          &raquo;
        </a>`;
  }
  pagination.innerHTML = html;
}

function setLoading() {
  const container = document.getElementById('container');
  console.log('Set Loading called');
  container.innerHTML = `<img
    src="/assets/loading.svg"
    alt="Loading.. Please wait.."
    class="loading"
  />`;
}
