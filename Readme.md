# Library API

A Simple API to perform CRUD operations on a web based library app.

**New Features** (_v0.1_)

- Added Authorization `token` in request header for POST request.
- Changed all responses to JSON.
- Nerfed all the unimportant variables from GET request. (`{__v:}`).
- Added more bugs to fix later.
- Added a 404 response.

---

## Documentation

**API available at**

> http://adarsh.gq/library

## Endpoints

**GET** `/books`

> Fetches all the records of books from library.

**Response:**

```javascript
[
	{
		name: 'Adarsn Chakraborty',
		book: 'The Moonstone',
		author: 'Wilkie Collins (1868)',
		price: '$200'
	},
	{
		name: 'Adarsh Chakraborty',
		book: 'The Way We Live Now',
		author: 'Anthony Trollope (1875)',
		price: '$200'
	}
];
```

---

**POST** `/books`

> Accepts a POST request to add a new book to the database.

**Required Headers:**

```
Content-Type: application/json
token: superdoge1234
```

**Required Body: (JSON)**

```javascript
{
    "name": "Adarsh Chakraborty",
    "book": "The Picture of Dorian Gray ",
    "author": "The Picture of Dorian Gray ",
    "price": "$200"
}
```

**Please note: all the fields `name,book,author,price` are required \*, else you will receive a 400 error.**

**Response:** Response will return the newly added object with the result success.

```javascript
{
    "result": "success",
    "created_book": {
        "name": "Adarsh Chakraborty",
        "book": "The Picture of Dorian Gray",
        "author": "The Picture of Dorian Gray",
        "price": "$200",
        "_id": "61a9f2090793e2749117fba5",
        "createdAt": "2021-12-03T10:31:37.712Z",
        "updatedAt": "2021-12-03T10:31:37.712Z",
        "__v": 0
    }
}
```

---

**PUT** `/books`

> Accepts a PUT request to update a book, Needs the ID of the book you want to update. `bookid`

**Required Headers:**

```
Content-Type:  application/json
token:  superdoge1234
```

**Required Body: (JSON)**

```javascript
{
	"bookid":  "idOFTheBOOKY0UWAnTtoEDIT",
	"name": "Rimuru Tempest"
}
```

**Please note: The field `bookid` is required \*, You can exclude all the other fields that you don't want to update.**

**Response:** Response will return the updated book with result success.

```javascript
{
    "result": "success",
    "updated_book": {
        "_id": "idOFTheBOOKY0UW@nTtoEDIT",
        "name": "Rimuru Tempest",
        "book": "TEST BOOK ",
        "author": "The Picture of Dorian Gray ",
        "price": "$400",
        "createdAt": "2021-12-03T10:18:31.343Z",
        "updatedAt": "2021-12-03T10:33:33.345Z",
        "__v": 0
    }
}
```

---

**DELETE** `/books`

> Accepts a DELETE request to delete a book, Needs the `bookid` you want to delete.

**Required Headers:**

```
Content-Type:  application/json
token:  superdoge1234
```

**Required Body: (JSON)**

```javascript
{
	"bookid":  "idOFTheBOOKY0UWAnTtoDEL"
}
```

\*_Please note: The field `bookid` is absolutely required._

**Response:** Response will return the deleted book with the result success.

```javascript
{
    "result": "success",
    "deleted_book": {
        "_id": "61a9eef73136012ff2094ac5",
        "name": "Rimuru Tempest",
        "book": "TEST BOOK ",
        "author": "The Picture of Dorian Gray ",
        "price": "$400",
        "createdAt": "2021-12-03T10:18:31.343Z",
        "updatedAt": "2021-12-03T10:33:33.345Z",
        "__v": 0
    }
}
```
