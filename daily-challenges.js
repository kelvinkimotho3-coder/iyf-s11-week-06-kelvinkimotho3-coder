// Day 1: Delayed Promise
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testDelay() {
    console.log("Waiting...");
    await delay(2000);
    console.log("This prints after 2 seconds");
}
testDelay();

// Day 2: Promise Chain with timing
function randomDelay(label) {
    return new Promise(resolve => {
        const ms = Math.floor(Math.random() * 1000) + 200;
        setTimeout(() => resolve(`${label} done after ${ms}ms`), ms);
    });
}

async function chainThree() {
    console.time("chain");
    const r1 = await randomDelay("Step 1");
    console.log(r1);
    const r2 = await randomDelay("Step 2");
    console.log(r2);
    const r3 = await randomDelay("Step 3");
    console.log(r3);
    console.timeEnd("chain");
}
chainThree();

// Day 3: Error Handling with default fallback
async function fetchUserWithFallback(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (response.status === 404) {
            return { id: 0, name: "Guest User", email: "guest@example.com" };
        }
        return await response.json();
    } catch (error) {
        return { id: 0, name: "Guest User", email: "guest@example.com" };
    }
}
fetchUserWithFallback(9999).then(user => console.log("Fallback user:", user));

// Day 4: Rewrite callback-based code with async/await

// Original callback-based version (from Task 11.1)
function loadUserCallback(userId, callback) {
    setTimeout(() => {
        const user = { id: userId, name: "Kelvin Kimotho", role: "Student" };
        callback(user);
    }, 1500);
}

loadUserCallback(1, function(user) {
    console.log("Callback version - User:", user);
});

// Rewritten using async/await
function loadUserPromise(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = { id: userId, name: "Kelvin Kimotho", role: "Student" };
            resolve(user);
        }, 1500);
    });
}

async function loadUserAsync(userId) {
    const user = await loadUserPromise(userId);
    console.log("Async/await version - User:", user);
    return user;
}

loadUserAsync(1);

// Day 5: Parallel Fetches with Promise.allSettled
async function fetchMultipleEndpoints() {
    const results = await Promise.allSettled([
        fetch("https://jsonplaceholder.typicode.com/users/1").then(r => r.json()),
        fetch("https://jsonplaceholder.typicode.com/posts/1").then(r => r.json()),
        fetch("https://jsonplaceholder.typicode.com/comments/1").then(r => r.json())
    ]);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Endpoint ${index + 1} succeeded:`, result.value);
        } else {
            console.log(`Endpoint ${index + 1} failed:`, result.reason);
        }
    });
}
fetchMultipleEndpoints();