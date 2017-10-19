window.onload = function() {
  getBooks()
  randomWord()
}


function randomWord(){
  const randWords = ["BOOKS!", "Books are the best!", "READ!", "How fun is reading...AMIRITE"]
  const getDiv = document.getElementById('interval-stuff')
  const headOne = document.createElement('h2')
  getDiv.appendChild(headOne)

  setInterval(function () {
    headOne.innerText = randWords[Math.floor(Math.random()*randWords.length)]
  }, 3000);
}


const bookResults = document.getElementById('book-result')

function getBooks() {
  console.log('hello')
  const searchBooks = document.getElementById('search-submit')
  searchBooks.addEventListener('submit', (e) => {
    e.preventDefault() //
    bookResults.innerHTML = ""
    const searchInput = document.getElementById('search-input').value
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
    .then(res => res.json())
    .then(json => displayBooks(json))
  })
}

function displayBooks(json){
  json.items.forEach(book => {
    const bookDiv = document.createElement('div')
    let counter = 0

    bookDiv.innerHTML = `<ul><li>Author: ${book.volumeInfo.authors[0]}</li>
    <li>Title: ${book.volumeInfo.title}</li>
    <li>Page Count: ${book.volumeInfo.pageCount}</li>
    <li><img src="${book.volumeInfo.imageLinks.thumbnail}"></li></ul>`

    const likeButton = document.createElement('button')
    const numOfLikes = document.createElement('h2')
    likeButton.innerText = "LIKE ME"
    numOfLikes.innerHTML = counter

    bookDiv.appendChild(likeButton)
    bookDiv.appendChild(numOfLikes)

    likeButton.addEventListener('click', function(event){
      numOfLikes.innerHTML = ++counter
    })

    let commentForm = document.createElement('form')
    let commentInput = document.createElement('input')
    let commentButton = document.createElement('input')
    commentInput.setAttribute('id', 'user-comment')
    commentButton.setAttribute('type', 'submit')

    let displayComments = document.createElement('ul')

    commentForm.appendChild(commentInput)
    commentForm.appendChild(commentButton)
    bookDiv.appendChild(commentForm)
    bookDiv.appendChild(displayComments)

    commentForm.addEventListener('submit', e => {
      e.preventDefault()
      const commentHandler = document.createElement('li')
      commentHandler.innerText = commentInput.value
      displayComments.appendChild(commentHandler)
      commentHandler.value = ''
    })





    bookResults.appendChild(bookDiv)
  })

}
