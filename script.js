const main = document.querySelector("main");
const addNewButton = document.querySelector("#addNewButton");
const addNewBookDialog = document.querySelector("#addNewBookDialog");
const add = document.querySelector("#add");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");


let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggle = function(){
    if (this.read == "yes"){
        this.read = "no"
    }
    else{
        this.read = "yes";
    }
}

function addBookToLibrary(title, author, pages, read){
    let newBook= new Book (title, author, pages, read);

    myLibrary.push(newBook);
    displayBooks();
    console.log(myLibrary);
}

function displayBooks(){
    main.innerHTML = ""
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        const bookTitle = document.createElement("h3");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookRead = document.createElement("div");
        const readText = document.createElement("span");
        const readButton = document.createElement("button");
        const remove = document.createElement("button")

        bookCard.setAttribute("data-index", index);

        bookTitle.textContent ="TITLE: " + book.title;
        bookAuthor.textContent = "AUTHOR: " + book.author;
        bookPages.textContent = "NUMBER OF PAGES: " + book.pages;
        readText.textContent = "READ: ";
        readButton.textContent = book.read;
        remove.textContent = "REMOVE";

        bookRead.append(readText, readButton);
        bookCard.append(bookTitle, bookAuthor, bookPages, bookRead, remove);
        main.appendChild(bookCard);
        
        const myIndex = parseInt(bookCard.getAttribute("data-index"), 10);

        remove.addEventListener("click", ()=>{
            let newLibrary = myLibrary.filter((book, index) => index !== myIndex);
            myLibrary = newLibrary;
            console.log(newLibrary);
            bookCard.remove();
        });

        readButton.addEventListener("click", ()=>{
            book.toggle();
            readButton.textContent = book.read;
        });
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



addBookToLibrary("harry porter", "shaban", "293", "yes");


