document.addEventListener('DOMContentLoaded', function() {
  var bookmarkForm = document.getElementById('bookmarkForm');
  var bookmarkList = document.getElementById('bookmarkTableBody');
  var bookmarks = [];

  loadBookmarks();

  bookmarkForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if (siteURL === '' || !validateURL(siteURL)) {
      alert('Please enter a valid URL.');
      return;
    }

    var newBookmark = {
      name: siteName,
      url: siteURL
    };

    bookmarks.push(newBookmark);
    saveBookmarks();
    renderBookmarks();
    bookmarkForm.reset();
  });

  function validateURL(url) {
    var urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlRegex.test(url);
  }

  function renderBookmarks() {
    bookmarkList.innerHTML = ''; 
    bookmarks.forEach(function(bookmark, index) {
      var newRow = document.createElement('tr');
      newRow.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${bookmark.name}</td>
        <td><button class="btn btn-success" onclick="window.open('${bookmark.url}')"><i class="fa-regular fa-eye"></i> Visit</button></td>
        <td><button class="btn btn-danger" data-index="${index}"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
      `;
      bookmarkList.appendChild(newRow);


      newRow.querySelector('.btn-danger').addEventListener('click', function() {
        deleteBookmark(this.dataset.index);
      });
    });
  }

  function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    saveBookmarks();
    renderBookmarks();
  }

  function saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  function loadBookmarks() {
    var storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      bookmarks = JSON.parse(storedBookmarks);
      renderBookmarks();
    }
  }
});