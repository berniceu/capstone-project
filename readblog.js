
// render full blog

document.addEventListener('DOMContentLoaded', renderBlog)

function renderBlog(e){
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');
    const column = document.querySelector('.column');

    if(blogId){
        fetch(`http://localhost:5000/blogs/${blogId}`)
        .then(res => res.json())
        .then(blog => {
            column.innerHTML = `
        <h3>${blog.blogTitle}</h3>
        <h5>${blog.author}</h5>
        <div class='img-container'>
        <img src=${blog.image} class='readblog-img'/>
        </div>
        <div class='paragraph'>
        <p>${blog.blog}</p>
        </div>

    `
        })
        .catch(err => console.log(err))
    }
    

}