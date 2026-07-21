// Reuse getUserData, getUserPosts, getPostComments from promises.js
// (make sure promises.js is loaded before this file in index.html)

// Exercise 1: Converting to Async/Await
function getDataWithPromises() {
    return getUserData(1)
        .then(user => getUserPosts(user.id))
        .then(posts => getPostComments(posts[0].id))
        .then(comments => comments);
}

async function getDataWithAsync() {
    const user = await getUserData(1);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return comments;
}

getDataWithAsync().then(comments => console.log("Async/await result:", comments));

// Exercise 2: Error Handling with Try/Catch
async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        return { user, posts };
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;
    }
}

fetchUserData(1).then(result => console.log("fetchUserData result:", result));
fetchUserData(-1).catch(error => console.log("Caught expected error:", error));

// Exercise 3: Parallel with Async/Await
async function getAllUsersSequential() {
    console.time("sequential");
    const user1 = await getUserData(1);
    const user2 = await getUserData(2);
    const user3 = await getUserData(3);
    console.timeEnd("sequential");
    return [user1, user2, user3];
}

async function getAllUsersParallel() {
    console.time("parallel");
    const [u1, u2, u3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);
    console.timeEnd("parallel");
    return [u1, u2, u3];
}

getAllUsersSequential().then(users => console.log("Sequential:", users));
getAllUsersParallel().then(users => console.log("Parallel:", users));

// Build: Rewrite callback hell using async/await
async function getCommentsAsync() {
    try {
        const user = await getUserData(1);
        console.log("Async rewrite - User:", user);
        const posts = await getUserPosts(user.id);
        console.log("Async rewrite - Posts:", posts);
        const comments = await getPostComments(posts[0].id);
        console.log("Async rewrite - Comments:", comments);
        return comments;
    } catch (error) {
        console.error("Async rewrite - Error:", error);
    }
}
getCommentsAsync();