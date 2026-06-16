document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector('.gallery');

    fetch('/data/vinyls.json')
        .then(response => response.json())
        .then(albums => {
            albums.forEach(album => {
                const card = document.createElement('article');
                card.className = 'album';

                const frame = document.createElement('div');
                frame.className = 'frame';

                const cover = document.createElement('img');
                cover.className = 'cover';
                cover.src = album.cover;
                cover.alt = `${album.title} — ${album.artist}`;
                cover.loading = 'lazy';

                const info = document.createElement('div');
                info.className = 'info';

                const title = document.createElement('h2');
                title.className = 'title';
                title.textContent = album.title;

                const meta = document.createElement('p');
                meta.className = 'meta';
                meta.textContent = `${album.artist} · ${album.year} · ${album.duration}`;

                const tracklist = document.createElement('ol');
                tracklist.className = 'tracklist';
                album.tracklist.forEach(track => {
                    const li = document.createElement('li');
                    li.textContent = track;
                    tracklist.appendChild(li);
                });

                info.append(title, meta, tracklist);
                frame.append(cover, info);
                card.appendChild(frame);
                gallery.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching vinyls:', error);
        });
});
