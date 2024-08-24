const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fetch books and members when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    fetchMembers();
});

// Fetch books and members when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    fetchMembers();
});

function fetchBooks() {
    database.ref('books').on('value', (snapshot) => {
        const books = snapshot.val();
        displayBooks(books);
    });
}

function fetchMembers() {
    database.ref('members').on('value', (snapshot) => {
        const members = snapshot.val();
        displayMembers(members);
    });
}

function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    for (let id in books) {
        const book = books[id];
        bookList.innerHTML += `<div>${book.title} by ${book.author}</div>`;
    }
}

function displayMembers(members) {
    const memberList = document.getElementById('member-list');
    memberList.innerHTML = '';
    for (let id in members) {
        const member = members[id];
        memberList.innerHTML += `<div>${member.name}, Joined: ${member.membershipDate}</div>`;
    }
}


function addBook(book) {
    const newBookKey = database.ref().child('books').push().key;
    book.id = newBookKey;
    database.ref('books/' + newBookKey).set(book);
}

function updateBook(bookId, updatedBook) {
    database.ref('books/' + bookId).update(updatedBook);
}

function deleteBook(bookId) {
    database.ref('books/' + bookId).remove();
}


function addMember(member) {
    const newMemberKey = database.ref().child('members').push().key;
    member.id = newMemberKey;
    database.ref('members/' + newMemberKey).set(member);
}

function updateMember(memberId, updatedMember) {
    database.ref('members/' + memberId).update(updatedMember);
}

function deleteMember(memberId) {
    database.ref('members/' + memberId).remove();
}


function filterBooksByGenre(genre) {
    database.ref('books').orderByChild('genre').equalTo(genre).on('value', (snapshot) => {
        const filteredBooks = snapshot.val();
        displayBooks(filteredBooks);
    });
}

function filterMembersByStatus(status) {
    database.ref('members').orderByChild('active').equalTo(status).on('value', (snapshot) => {
        const filteredMembers = snapshot.val();
        displayMembers(filteredMembers);
    });
}
function sortBooksByTitle() {
    database.ref('books').orderByChild('title').on('value', (snapshot) => {
        const sortedBooks = snapshot.val();
        displayBooks(sortedBooks);
    });
}

function sortMembersByDate() {
    database.ref('members').orderByChild('membershipDate').on('value', (snapshot) => {
        const sortedMembers = snapshot.val();
        displayMembers(sortedMembers);
    });
}

function fetchPaginatedBooks(limit, startAt) {
    database.ref('books').orderByKey().startAt(startAt).limitToFirst(limit).on('value', (snapshot) => {
        const books = snapshot.val();
        displayBooks(books);
    });
}

function fetchPaginatedMembers(limit, startAt) {
    database.ref('members').orderByKey().startAt(startAt).limitToFirst(limit).on('value', (snapshot) => {
        const members = snapshot.val();
        displayMembers(members);
    });
}


function saveStateToLocalStorage(state) {
    localStorage.setItem('libraryState', JSON.stringify(state));
}

function loadStateFromLocalStorage() {
    const state = localStorage.getItem('libraryState');
    return state ? JSON.parse(state) : {};
}
