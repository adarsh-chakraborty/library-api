const bookName = document.getElementById('bookName');
const authorName = document.getElementById('authorName');
const price = document.getElementById('price');



const button = document.getElementById('button').addEventListener('click', (e) =>{
    e.preventDefault();
    const data ={   
        name: "Shrey Lawang",     
        book : bookName.value,
        author : authorName.value,
        price:  price.value 
     } 

     fetch('https://bookshelf.gq/api/books', {
         method: 'POST',
         headers: {
            "Content-Type":  "application/json",
            "token":  "superdoge1234",
         },

         body: JSON.stringify(data)
     })
     .then( (response) => {
         // Async
          return response.json();
     })
     .then((data) => {
        console.log(data);
     });
})