console.log('init');

const container = document.querySelector('.container');

function goToDashboard() {
  window.location = '/';
}

// <div class="book-container">
// <div class="book-image">
//   <img
//     src="https://bookshelfgq.s3.us-west-004.backblazeb2.com/5wqqa-harrypotter.jpg"
//     alt=""
//   />
// </div>
// <div class="book-details">
//   <h2>Harry Potter</h2>
//   <h4>JK Rowlings</h4>
//   <span>$2333</span>
//   <button class="btn-dash" onclick="goToDashboard();">
//     Go Back to Dashboard
//   </button>
// </div>
// </div>

const fetchBook = async () => {
  try {
    const uri = window.location.pathname;
    const res = await fetch('/api' + uri);
    const data = await res.json();
    console.log(data);

    let html = ` <div class="book-container">
    <div class="book-image">
      <img
        src="${data.imageUrl}"
        alt=""
      />
    </div>
    <div class="book-details">
      <h2>${data.book}</h2>
      <h4>${data.author}</h4>
      <span>₹${data.price}</span>
      <button class="btn-dash" onclick="goToDashboard();">
        Go Back to Dashboard
      </button>
    </div>
  </div>`;

    container.innerHTML = html;

    if (res.status != 200) {
      setError();
      return;
    }
  } catch (err) {
    setError();
  }
};

function setError() {
  container.innerHTML = `<h2>Error occured</h2>`;
}
fetchBook();
