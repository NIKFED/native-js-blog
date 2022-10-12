async function getPosts() {
    const response = await fetch('https://my-json-server.typicode.com/NIKFED/json-server/posts');
    const posts = await response.json();

    posts.forEach((post) => {
        document.querySelector('.post-list').innerHTML += `
            <div class="card m-3" style="width: 40%">
                <div class="card-body">
                    <h5 class="card-title">${ post.title }</h5>
                    <p class="card-text">${ post.body }</p>
                    <a href="#" class="card-link">more</a>
                </div>
            </div>
        `
    })
}

getPosts();