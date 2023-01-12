import "./css/styles.css";
import "./css/book.css";
import {
  submitNewBook,
  createBookElement,
  appendBookElement,
  books,
  removeBook,
  updateReadStatus,
} from "./functions.js";

// function : respnsability open popup
document.getElementById("newBookBtn").addEventListener("click", function () {
  document.getElementById("popUp").style.display = "flex";
});

// function : respnsability close popup
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("popUp").style.display = "none";
});

// Prevent default behavior, and submit form
document.querySelector("#addBtn").addEventListener("click", function (event) {
  event.preventDefault();
  if (!titleInput.validity.valid) {
    showTitleError();
  }
  if (!authorInput.validity.valid) {
    showAuthorError();
  } 
  if(authorInput.validity.valid && titleInput.validity.valid){
    submitNewBook();
  }
});

// New book Form Read button color change to green
const form = document.querySelector("#form");
form.addEventListener("change", (event) => {
  if (event.target.id === "read") {
    const bookBefore = event.target.parentElement.parentElement;
    if (event.target.checked) {
      bookBefore.classList.add("read");
    } else {
      bookBefore.classList.remove("read");
    }
  }
});

// Event listener: responability, tell if it's a click on the read checkbox or on the remove button
const booksElements = document.querySelector("#books");
booksElements.addEventListener("click", (event) => {
  if (event.target.id === "remove-button") {
    removeBook(event);
  }
  if (event.target.id === "book_read_status") {
    updateReadStatus(event);
  }
});

for (let book of books) {
  const bookHtml = createBookElement(book);
  appendBookElement(bookHtml);
}

const titleInput = document.getElementById("title");
const titleError = document.getElementById("title-error");

titleInput.addEventListener("input", () => {
  if (titleInput.validity.valid) {
    titleError.innerHTML = ""; // Reset the content of the message
  } else {
    showTitleError();
  }
});

function showTitleError() {
  if (titleInput.validity.valueMissing) {
    titleError.textContent = "You need to enter a title.";
  } else if (titleInput.validity.tooShort) {
    titleError.textContent = `Title should be at least ${titleInput.minLength} characters; you entered ${titleInput.value.length}.`;
  } else if (titleInput.validity.patternMismatch) {
    titleError.textContent =
      "Title should contains only letters and whitespace.";
  }
}
const authorInput = document.getElementById("author");
const authorError = document.getElementById("author-error");

authorInput.addEventListener("input", () => {
  if (authorInput.validity.valid) {
    authorError.innerHTML = ""; // Reset the content of the message
  } else {
    showAuthorError();
  }
});

function showAuthorError() {
  if (authorInput.validity.valueMissing) {
    authorError.textContent = "You need to enter a author.";
  } else if (authorInput.validity.tooShort) {
    authorError.textContent = `author should be at least ${authorInput.minLength} characters; you entered ${authorInput.value.length}.`;
  } else if (authorInput.validity.patternMismatch) {
    authorError.textContent =
      "author should contains only letters and whitespace.";
  }
}
