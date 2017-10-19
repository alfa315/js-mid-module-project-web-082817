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

function queryAPI(e) {
  e.preventDefault()
  bookResults.innerHTML = ""
  const searchInputVal = document.getElementById('search-input').value
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputVal}`)
  .then(res => res.json())
  .then(json => displayBooks(json))
}

function getBooks() {
  // console.log('hello')
  const searchBooksButton = document.getElementById('search-submit')
  searchBooksButton.addEventListener('submit', queryAPI)
}

function displayBooks(json){
  json.items.forEach(book => {
    const bookDiv = document.createElement('div')

    bookDiv.innerHTML = `
    <ul>
      <li id="find-more-by-author">${book.volumeInfo.authors[0]}
        <button type="button" id="button-test">More By Author</button>
      </li>
      <li>Title: ${book.volumeInfo.title}</li>
      <li>Page Count: ${book.volumeInfo.pageCount}</li>
      <li>
        <img src="${book.volumeInfo.imageLinks.thumbnail}">
      </li>
    </ul>`

    const likeButton = document.createElement('button')
    const numOfLikes = document.createElement('h2')
    likeButton.innerText = "LIKE ME"
    numOfLikes.innerHTML = 0

    bookDiv.appendChild(likeButton)
    bookDiv.appendChild(numOfLikes)

    likeButton.addEventListener('click', function(event){
      numOfLikes.innerHTML = ++numOfLikes.innerHTML
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

    const moreByAuthor = document.getElementById("button-test")
    moreByAuthor.addEventListener('click', e => {
      e.preventDefault()
      const clicked = event.target
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${clicked.parentElement.firstChild}`)
      .then(res => res.json())
      .then(json => console.log(json))
    })
  })

}


window.onload = function() {
  getBooks()
  randomWord()
}
