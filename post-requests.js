async function createPost(title, body, userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, body, userId })
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}

// Test it
createPost("My First Post", "This is the content of my post.", 1)
    .then(newPost => console.log("Created:", newPost));

const postForm = document.getElementById("post-form");
const postResult = document.getElementById("post-result");

if (postForm) {
    postForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const title = document.getElementById("post-title").value;
        const body = document.getElementById("post-body").value;

        try {
            const newPost = await createPost(title, body, 1);
            postResult.innerHTML = `
                <p><strong>Post created!</strong></p>
                <p>ID: ${newPost.id}</p>
                <p>Title: ${newPost.title}</p>
                <p>Body: ${newPost.body}</p>
            `;
            postForm.reset();
        } catch (error) {
            postResult.textContent = `Error: ${error.message}`;
        }
    });
}