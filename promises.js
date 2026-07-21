// 1: Callback Hell (for demonstration)
function getUserDataCallback(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "John" });
    }, 1000);
}

function getUserPostsCallback(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 1000);
}

function getPostCommentsCallback(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing" }
        ]);
    }, 1000);
}

// The pyramid of doom:
getUserDataCallback(1, function(user) {
    console.log("Callback Hell - User:", user);
    getUserPostsCallback(user.id, function(posts) {
        console.log("Callback Hell - Posts:", posts);
        getPostCommentsCallback(posts[0].id, function(comments) {
            console.log("Callback Hell - Comments:", comments);
        });
    });
});

// 2: Promises
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    setTimeout(() => {
        if (success) {
            resolve("It worked!");
        } else {
            reject("Something went wrong");
        }
    }, 1000);
});

myPromise
    .then(result => console.log("Success:", result))
    .catch(error => console.log("Error:", error));

// Refactored to Promises
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Thanks for sharing" }
            ]);
        }, 1000);
    });
}

// Exercise 1: Chain Promises
getUserData(1)
    .then(user => {
        console.log("Chained - User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Chained - Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Chained - Comments:", comments);
    })
    .catch(error => {
        console.error("Chained - Error:", error);
    });

// Exercise 2: Promise.all
const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log("All users (Promise.all):", results);
    })
    .catch(error => {
        console.error("One failed:", error);
    });

// Exercise 3: Promise.race
const fast = new Promise(resolve => setTimeout(() => resolve("Fast!"), 100));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow!"), 500));

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner (Promise.race):", result);
    });

// Build: Fetch data for 3 users simultaneously, display all at once
function loadThreeUsers() {
    Promise.all([getUserData(1), getUserData(2), getUserData(3)])
        .then(users => {
            console.log("All 3 users loaded simultaneously:", users);
        })
        .catch(error => console.error("Error loading users:", error));
}
loadThreeUsers();