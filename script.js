const main = document.querySelector("main");
const addNewButton = document.querySelector("#addNewButton");
const addNewBookDialog = document.querySelector("#addNewBookDialog");
const add = document.querySelector("#add");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");


const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    let newBook= new Book (title, author, pages, read);

    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks(){
    main.innerHTML = ""
    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        const bookTitle = document.createElement("h3");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookRead = document.createElement("p");
        const remove = document.createElement("button")

        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = book.pages;
        bookRead.textContent = book.read;
        remove.textContent = "REMOVE";

        bookCard.append(bookTitle, bookAuthor, bookPages, bookRead, remove);
        main.appendChild(bookCard);

        
    });
};

addNewButton.addEventListener("click", () =>{
    addNewBookDialog.showModal();
});

add.addEventListener("click",(e) =>{
    e.preventDefault();
    addNewBookDialog.close();
    addBookToLibrary(title.value, author.value, pages.value, read.value);

    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = ""; 
});

addBookToLibrary("harry porter", "shaban", "293", "read");

console.log(myLibrary);
