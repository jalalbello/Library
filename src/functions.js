export let books = JSON.parse(localStorage.getItem("books")) || [];

// Book class, responsability: constructor
export class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.random().toString(36).substr(2, 9);
  }
}

// Book class, responsability: create item

export function createBookItem() {
  const title = document.getElementsByName("title")[0].value;
  const pages = document.getElementsByName("pages")[0].value;
  const author = document.getElementsByName("author")[0].value;
  const read = document.getElementsByName("read")[0].checked;

  const book = new Book(title, author, pages, read);
  addBookToArray(book);
  updateLocalStorage()
  return book;
}

// function, responsability: add to array

 function addBookToArray(book) {
  books.push(book);
}

// function, responsability: update local storage

 function updateLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}


// function, responsability: create the dom elements that dispaly the books

export function createBookElement(item) {
  const bookHtml = `
    <div class="book ${item.read ? "read" : "" }" id = "${item.id}">
      <div class="book-title">${item.title}</div>
      <div class="book-author">${item.author}</div>
      <div class="book-pages">${item.pages ? "Pages :" : "" } <strong>${item.pages}</strong></div>
      <div id ="book-element-read-container">
        <label htmlFor="book_read_status"></label>
        <input type="checkbox" id="book_read_status" name="book_read_status" ${
          item.read ? "checked" : ""
        }>
      </div>
      <button id="remove-button">Delete 🗑️</button>
    </div>
  `;
  const fragment = document.createRange().createContextualFragment(bookHtml);
  const bookDiv = fragment.querySelector(".book");
  return bookDiv;
}

// function, responsability: append book elements in the dom

export function appendBookElement(bookDiv) {
  const bookSection = document.querySelector("#books");
  bookSection.appendChild(bookDiv);
}


// function, responsability: handle submtion

export function submitNewBook() {
  const book = createBookItem();
  const bookHtml = createBookElement(book);
  appendBookElement(bookHtml);
}

// function, responsability: update books after removal

export function updateBooksArray(updatedBooks) {
  books = updatedBooks;
  localStorage.setItem("books", JSON.stringify(books));
}

// function, responsability: remove book from aray and dispaly

export function removeBook(event) {
  const parent = event.target.parentElement;
  const id = parent.id;
  // Create a new array with all the elements that do not match the specified id
  const updatedBooks = books.filter((book) => book.id !== id);
  // Update the local storage
  updateBooksArray(updatedBooks);
  parent.remove();
}

// function, responsability: find the book, update the read status, update local storage, and add class read

export function updateReadStatus(event) {
  const parent = event.target.parentElement.parentElement;
  const id = parent.id;
  const book = books.find((book) => book.id === id);
  book.read = event.target.checked;
  updateLocalStorage()
  if (event.target.checked) {
    parent.classList.add("read");
  } else {
    parent.classList.remove("read");
  }
}

