document.addEventListener("DOMContentLoaded", () => {
    const bookmarksList = document.querySelector('.bookmarks');
    
    // Clear any static content (like a "loading...")
    bookmarksList.innerHTML = ''; 

    fetch('/data/bookmarks.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(bookmark => {
                // Create the <li> element
                const li = document.createElement('li');
                
                // Create the <a> element
                const a = document.createElement('a');
                a.href = bookmark.url;
                a.textContent = bookmark.name;
                
                // Append <a> to <li>, and <li> to <ul.bookmarks>
                li.appendChild(a);
                bookmarksList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching bookmarks:', error);
            bookmarksList.innerHTML = '<li>Failed to load bookmarks.</li>';
        });
});