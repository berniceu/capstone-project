const loader = document.querySelector('.loader');

// render full blog

document.addEventListener('DOMContentLoaded', renderBlog)

function renderBlog(e){
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');
    const column = document.querySelector('.column');

    if(blogId){
        loader.style.display = 'flex';
        fetch(`https://my-brand-api-x8z4.onrender.com/blogs/getBlog/${blogId}`)
        .then(res => res.json())
        .then(blog => {
            const formattedBlog = blog.blog.replace(/\n/g, '<br>').replace(/\n===(.*)===\n/g, '<h4>$1</h4>');
            column.innerHTML = `
        <h3>${blog.blogTitle}</h3>
        <h5>${blog.author}</h5>
        <div class='img-container'>
        <img src=${blog.blogImage} class='readblog-img'/>
        </div>
        <div class='paragraph'>
        <p>${formattedBlog}</p>
        </div>

    `
        })
        .catch(err => console.log(err))
        .finally(() => loader.style.display = 'none')
    }
}