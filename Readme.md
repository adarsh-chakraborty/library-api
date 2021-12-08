# Library API

A Simple API to perform CRUD operations on a web based library app.

**New Features** (_v2.1_)

- Added Pagination. `page` and `size{max:25}`
- Refactored code, It's more modular now.
- Global Error handling added.
- Added more bugs to fix later.

**New Features** (_v2.0_)

- Added Authorization `token` in request header for POST request.
- Changed all responses to JSON.
- Nerfed all the unimportant variables from GET request. (`{__v}`).
- Added more bugs to fix later.
- Added a 404 response.

---

## Documentation

**Books API available at**
Base URL:

> https://bookshelf.gq/api

## Endpoints

**GET** `/books`

**Query Parameters:**

| query        | default value | type         |
| ------------ | ------------- | ------------ |
| Content Cell | Content Cell  | Content Cell |
| Content Cell | Content Cell  | Content Cell |

> Fetches all the records of books from the api.

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

**Please note: all the fields `name,book,author,price` are absolutely required\*, else you will receive a 400 error.**

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

> Accepts a PUT request to update a book, Needs the ID of the book you want to update. `_id`

**Required Headers:**

```
Content-Type:  application/json
token:  superdoge1234
```

**Required Body: (JSON)**

```javascript
{
    "_id":  "idOFTheBOOKY0UWAnTtoEDIT",
    "name": "Rimuru Tempest"
}
```

**Please note: The field `_id` is required \*, You can exclude all the other fields that you don't want to update.**

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

> Accepts a DELETE request to delete a book, Needs the `_id` you want to delete.

**Required Headers:**

```
Content-Type:  application/json
token:  superdoge1234
```

**Required Body: (JSON)**

```javascript
{
    "_id":  "idOFTheBOOKY0UWAnTtoDEL"
}
```

\*_Please note: The field `_id` is absolutely required._

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

---

### View a single book in detail

Get detail of a single book by bookid on a GET request.

**GET** `/books/:bookid`

> Accepts a GET request where `:bookid` is the `_id` of the book.

**Example**

> /books/61431abac7b21d45aabf2ff9

**Response:**

```javascript
{
    "_id": "61431abac7b21d45aabf2ff9",
    "name": "Adarsn Chakraborty",
    "book": "The Moonstone",
    "author": "Wilkie Collins (1868)",
    "price": "$200"
}
```

---

# User Accounts & Authentication

**API available at**
Base URL:

> https://bookshelf.gq/auth

## Endpoints

**POST** `/register`

> Register a new user account.

**Required Headers:**

```
Content-Type: application/json
token: superdoge1234
```

**Required Body (JSON):**

```javascript
{
    "email": "adarshc@goocle.com",
    "username": "duck",
    "password": "superduck1234"
}
```

| Field Name | Validation                    | Type   |
| ---------- | ----------------------------- | ------ |
| `email`    | Must be a valid email format  | String |
| `username` | Must be unique                | String |
| `password` | Must be atleast 6 chars long. | String |

**Response:**

```javascript
{
  "result": "success",
  "status": 200,
  "user_created": {
    "email": "adarshc@goocle.com",
    "username": "duck",
    "_id": "61aef180a2eb8fbc9896350e",
    "createdAt": "2021-12-07T05:30:40.857Z",
    "updatedAt": "2021-12-07T05:30:40.857Z",
    "__v": 0
  }
}
```

---

**POST** `/login`

> Verifies credentials and generates an auth token.

**Required Headers:**

```
Content-Type: application/json
token: superdoge1234
```

**Required Body (JSON):**

```javascript
{
    "email": "adarshc@goocle.com",
    "password": "superduck1234"
}
```

**Response:**

```javascript
{
  "result": "OK",
  "message": "You are now logged in!",
  "token": "superdoge1234"
}
```

---

**POST** `/reset`

> Sends a password reset e-mail. (To be implemented)
