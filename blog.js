const publishBtn = document.getElementById('publish');
const article = document.getElementById("story");
const articleTitle = document.getElementById("title");
const newArticleContainer = document.querySelector('.new-article-container');

//display write new post container

const newPostBtn = document.getElementById('new-post-button');
const hiddenPost = document.querySelector('.create-article.hidden');

if (newPostBtn){
    newPostBtn.addEventListener('click', () => {
        if (hiddenPost.style.display == 'none'){
            hiddenPost.style.display = 'block';
        } else {
            hiddenPost.style.display = 'none';
        }
    });
}


const blogForm = document.querySelector(".new-story-form");
blogForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = document.getElementById("title");
  const story = document.getElementById("story");

  const blogData = {
    blogTitle: title.value,
    blog: story.value,
  };

  const baseUrl = "http://localhost:5000/blogs";

  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      alert("blog created successfully");
    } else {
      console.log("blog not created");
    }
  } catch (err) {
    console.log(err);
  }
});

//retrieve and display

async function displayBlogs() {
  const baseUrl = "http://localhost:5000/blogs";

  await fetch(baseUrl)
    .then((res) => {
      if (!res.ok) {
        alert("Server error");
      }
      return res.json();
    })

    //.then(blogs => console.log(blogs))
    .then((blogs) =>
      blogs.forEach((blog) => {
        const blogsContainer = document.querySelector(".blogs-container");
        const blogsDiv = document.createElement("div");
        blogsDiv.classList.add("blogs");
        blogsDiv.dataset.id = blog._id
        blogsContainer.appendChild(blogsDiv);
        const blogTitle = document.createElement("div");
        blogTitle.classList.add("blog-title");
        blogTitle.textContent = `${blog.blogTitle}`;
        blogsDiv.appendChild(blogTitle);
        const blogParagraph = document.createElement("p");
        blogParagraph.textContent = `${blog.blog}`;
        blogsDiv.appendChild(blogParagraph);

        blogsDiv.innerHTML += `<i class="fa-solid fa-heart" id="heart"></i>
                             <span>0 Likes</span>
        
                            <i class="fa-solid fa-comment"></i>
                            <span>10 Comments</span>
        
                             <i class="fa-solid fa-pen edit-button""></i>
                             <span>Edit</span>
        
                          <i class="fa-solid fa-trash delete-button""></i>
                             <span>Delete</span>`;
      })
    );
}

displayBlogs();

//update blogs


const editBtn = document.querySelector('edit-button');

if(editBtn){
    editBtn.addEventListener('click', async function(){
    
        hiddenPost.style.display = 'block';
        const title = document.getElementById("title");
        const story = document.getElementById("story");
        const blogDiv = document.querySelector('.blogs');
        const blogId = blogDiv.dataset.id;
    
    
        const blogData = {
            blogTitle: title.value,
            blog: story.value,
        };
    
        try{
            const res = await fetch(`http://localhost:5000/blogs/${blogId}`, {
            method:'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(blogData),
    
        });
    
        if (res.ok){
            alert('blog updated successfully');
            displayBlogs();
        } else {
            alert('blog update failed')
        }
        } catch(err){
            console.log(err)
        }
        
    
    
    })
}

// delete


document.querySelector('.blogs-container').addEventListener('click', async function(e){
  const deleteBtn = e.target.closest('.delete-button');
  if(deleteBtn){
    const blogDiv = deleteBtn.closest('.blogs');
    const blogId = blogDiv.dataset.id;

    try{
      const res = await fetch(`http://localhost:5000/blogs/${blogId}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
      });

      if(res.ok){
          alert('deleted successfully')
      } else {
          alert('delete failed')
      }
  } catch(err){
      console.log(err)
  }
  }
})




