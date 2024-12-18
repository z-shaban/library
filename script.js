const main = document.querySelector("main");
const addNewButton = document.querySelector("#addNewButton");
const addNewBookDialog = document.querySelector("#addNewBookDialog");
const closeButton = document.querySelector("#close-button");
const add = document.querySelector("#add");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");



let myLibrary = [];

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggle(){
        if (this.read == "yes"){
            this.read = "no"
        }
        else{
            this.read = "yes";
        }
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
        const remove = document.createElement("button");

        bookCard.classList.add("book-card");
        bookTitle.classList.add("book-title")
        bookAuthor.classList.add("book-author");
        bookPages.classList.add("book-pages");
        bookRead.classList.add("book-read");
        readText.classList.add("read-text");
        readButton.classList.add("read-button");
        remove.classList.add("remove");
        

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

closeButton.addEventListener("click", () =>{
    addNewBookDialog.close();
});


add.addEventListener("click",(e) =>{
    e.preventDefault();
    
    if (title.value == "" || author.value == "" || pages.value == "" || read.value == "") {
        alert("Please fill in all required fields."); 
    } else{
        addBookToLibrary(title.value, author.value, pages.value, read.value);
        addNewBookDialog.close();
    }
    
    

    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = ""; 
});



addBookToLibrary("The Alchemist", "Paulo Coelho", "182", "yes");
addBookToLibrary("Vagabonds", "Eloghosa Osunde", "278", "no");

