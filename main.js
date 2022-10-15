let selectId = null;

async function getPosts()
{
    const response = await fetch('http://local.api.posts.ru/posts');
    const posts = await response.json();

    document.querySelector('.post-list').innerHTML = '';

    posts.forEach((post) => {
        document.querySelector('.post-list').innerHTML += `
            <div class="card m-3" style="width: 40%">
                <div class="card-body">
                    <h5 class="card-title">${ post.title }</h5>
                    <p class="card-text">${ post.body }</p>
                    <a href="#" class="card-link">more</a>
                    <a href="#" class="card-link" onclick="removePost(${post.id})">remove</a>
                    <a href="#" class="card-link" onclick="selectPost('${post.id}', '${post.title}', '${post.body}')">select</a>
                </div>
            </div>
        `
    })
}

async function addPost()
{
    const title = document.getElementById('title').value,
        body = document.getElementById('body').value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);

    const response = await fetch('http://local.api.posts.ru/posts', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (data.status === true) {
        await getPosts();
    }
}

async function removePost(postId)
{
    const response = await fetch(`http://local.api.posts.ru/posts/${postId}`, {
        method: "DELETE",
    });

    const data = await response.json();

    if (data.status === true) {
        getPosts();
    }
}

function selectPost(id, title, body)
{
    selectId = id;
    document.getElementById('title-edit').value = title;
    document.getElementById('body-edit').value = body;
}

async function updatePost() {
    const title = document.getElementById('title-edit').value,
        body = document.getElementById('body-edit').value;

    const data = {
        title: title,
        body: body
    };

    const response = await fetch(`http://local.api.posts.ru/posts/${selectId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.status === true) {
        await getPosts();
    }
}

getPosts();