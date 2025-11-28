document.addEventListener("DOMContentLoaded", () => {
    const booksGrid = document.querySelector('.books');
    
    fetch('/data/library.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const author = document.createElement('span');
                author.textContent = item.author;
                
                const book = document.createElement('p');
                book.textContent = item.book;

                const rating = document.createElement('span');
                const starCount = item.rating || 0;
                rating.textContent = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
                
                booksGrid.appendChild(author);
                booksGrid.appendChild(book);
                booksGrid.appendChild(rating);
            });
        })
        .catch(error => {
            console.error('Error fetching library:', error);
            const errorMsg = document.createElement('span');
            errorMsg.textContent = 'Failed to load library.';
            booksGrid.appendChild(errorMsg);
        });
});