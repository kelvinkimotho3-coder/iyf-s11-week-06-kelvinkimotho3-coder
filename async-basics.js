// 1: Synchronous vs Asynchronous
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");

console.log("--- Async example ---");
console.log("1 - Start");
setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);
console.log("3 - End");

// Predict the output exercise
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
setTimeout(() => console.log("D"), 100);
console.log("E");
// Actual order: A, C, E, B, D
// Synchronous code (A, C, E) always runs first, regardless of delay value.
// Then setTimeout callbacks run in order of their delay (0ms before 100ms).

// 2: Callback Pattern
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Data received:", data);
});

// Build: loadUser function
function loadUser(userId, callback) {
    console.log(`Looking up user ${userId}...`);
    setTimeout(() => {
        const user = { id: userId, name: "Kelvin Kimotho", role: "Student" };
        callback(user);
    }, 1500);
}

loadUser(1, function(user) {
    console.log("User loaded:", user);
});