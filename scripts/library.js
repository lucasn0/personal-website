document.addEventListener("DOMContentLoaded", () => {
    const booksGrid = document.querySelector('.books');
    
    fetch('/data/library.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                // Create author element (<span>)
                const author = document.createElement('span');
                author.textContent = item.author;
                
                // Create book element (<p>)
                const book = document.createElement('p');
                book.textContent = item.book;
                
                // Append them to the grid
                booksGrid.appendChild(author);
                booksGrid.appendChild(book);
            });
        })
        .catch(error => {
            console.error('Error fetching library:', error);
            const errorMsg = document.createElement('span');
            errorMsg.textContent = 'Failed to load library.';
            booksGrid.appendChild(errorMsg);
        });
});