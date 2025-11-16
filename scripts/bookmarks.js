document.addEventListener("DOMContentLoaded", () => {
    const bookmarksList = document.querySelector('.bookmarks');
    bookmarksList.innerHTML = ''; 

    fetch('/data/bookmarks.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(bookmark => {
                const li = document.createElement('li');
                
                const a = document.createElement('a');
                a.href = bookmark.url;
                a.textContent = bookmark.name;
                
                li.appendChild(a);
                bookmarksList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching bookmarks:', error);
            bookmarksList.innerHTML = '<li>Failed to load bookmarks.</li>';
        });
});