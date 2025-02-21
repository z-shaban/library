const main = document.querySelector("main");
const addNewButton = document.querySelector("#addNewButton");
const addNewBookDialog = document.querySelector("#addNewBookDialog");
const closeButton = document.querySelector("#close-button");
const add = document.querySelector("#add");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const error = document.querySelectorAll(".error");



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
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = "";
    error.forEach(err => err.textContent = "");
});


add.addEventListener("click",(e) =>{
    e.preventDefault();

    showError()
    
    if(title.validity.valid && author.validity.valid && pages.validity.valid && read.validity.valid){
        addBookToLibrary(title.value, author.value, pages.value, read.value);
        addNewBookDialog.close(); 
        
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = "";
    }

 
});

function showError(){
      if(title.validity.valueMissing){
            error[0].textContent = "title cant be empty"
      } else {
        error[0].textContent = ""; 
    }
      if(author.validity.valueMissing){
        error[1].textContent ="author name cant be empty";
      } else {
        error[1].textContent = ""; // Clear error if valid
    }
      if(!pages.validity.valid){
       error[2].textContent= "enter a number greater than 1"
      } else {
        error[2].textContent = ""; // Clear error if valid
    }
      
      if(!read.validity.valid){
       error[3].textContent = "select an option"
      }else {
        error[3].textContent = ""; // Clear error if valid
    }
    }

addBookToLibrary("The Alchemist", "Paulo Coelho", "182", "yes");
addBookToLibrary("Vagabonds", "Eloghosa Osunde", "278", "no");


