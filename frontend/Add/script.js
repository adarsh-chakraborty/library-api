const bookName = document.getElementById('bookName');
const authorName = document.getElementById('authorName');
const price = document.getElementById('price');
const fileBtn = document.getElementById('imagebtn');
const addBookbtn = document.querySelector('.uploadbtn');
const modal = document.querySelector('.modal');

addBookbtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (isFormValid) {
    // set loading screen
    setLoading(true);
    addBook();
  }
  //
});
console.log('add book init');

function isFormValid() {
  return 1;
}

async function addBook() {
  // need 4 things from dom
  const form = new FormData();
  form.append('name', bookName.value);
  form.append('book', bookName.value);

  form.append('author', authorName.value);
  form.append('price', price.value);
  form.append('img', fileBtn.files[0]);

  try {
    const request = await fetch('/api/books', {
      method: 'POST',
      body: form
    });
    const response = await request.json();
    console.log(response);
    setLoading();
  } catch (e) {
    setLoading();
    console.log(e);
  }
}

function setLoading(bool) {
  if (bool) {
    return (modal.style.display = 'block');
  }
  console.log('hiding modal');
  modal.style.display = 'none';
}
