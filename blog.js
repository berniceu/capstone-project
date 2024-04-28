const publishBtn = document.getElementById("publish");
const article = document.getElementById("story");
const articleTitle = document.getElementById("title");
const newArticleContainer = document.querySelector(".new-article-container");
const loader = document.querySelector('.loader');




//display write new post container

const newPostBtn = document.getElementById("new-post-button");
const hiddenPost = document.querySelector(".create-article.hidden");

if (newPostBtn && hiddenPost) {
  newPostBtn.addEventListener("click", () => {
    if (hiddenPost.style.display == "none") {
      hiddenPost.style.display = "block";
    } else {
      hiddenPost.style.display = "none";
    }
  });
}

const blogForm = document.querySelector(".new-story-form");
blogForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (publishBtn.textContent == "Publish") {
    

    const title = document.getElementById("title").value;
    const story = document.getElementById("story").value;
    const author = document.getElementById("author").value;
    const image = document.getElementById("blog-image").files[0];

    const formData = new FormData();
    formData.append("blogTitle", title);
    formData.append("blog", story);
    formData.append("author", author);
    formData.append("blogImage", image);

    const baseUrl = "https://my-brand-api-x8z4.onrender.com/blogs/createBlog";



const res = await fetch(baseUrl, {
  method: "POST",
  body: formData,
});

if (res.ok) {
  alert("Blog created successfully");
  location.reload();
} else {
  const data = await res.text();
  console.log("Error creating blog:", data);
}
  }})

//retrieve and display

async function displayBlogs() {
  const baseUrl = "https://my-brand-api-x8z4.onrender.com/blogs/getAllBlogs";
  
  loader.style.display = 'flex';
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
        blogsDiv.dataset.id = blog._id;
        newArticleContainer.appendChild(blogsDiv);
        const blogTitle = document.createElement("div");
        blogTitle.classList.add("blog-title");
        blogTitle.innerHTML = `<h3>
          <a href='/readblog.html?id=${blog._id}' class='blog-link'>${blog.blogTitle} </a>
        </h3>`;
        blogsDiv.appendChild(blogTitle);
        console.log(blog.author);
        const blogAuthor = document.createElement("p");
        blogAuthor.textContent = `${blog.author}`;
        blogsDiv.appendChild(blogAuthor);

        blogsDiv.innerHTML += `<i class="fa-solid fa-heart" id="heart"></i>
                             <span>0 Likes</span>
        
                            <i class="fa-solid fa-comment"></i>
                            <span>0 Comments</span>
        
                             <i class="fa-solid fa-pen edit-button""></i>
                             <span>Edit</span>
        
                          <i class="fa-solid fa-trash delete-button""></i>
                             <span>Delete</span>`;
      })
    )
    .finally(() => loader.style.display = 'none')
}

document.addEventListener("DOMContentLoaded", displayBlogs);

//update blogs

const blogsContainer = document.querySelector(".blogs-container");

blogsContainer.addEventListener("click", async function (e) {
  const editBtn = e.target.closest(".edit-button");
  const deleteBtn = e.target.closest(".delete-button");

  if (editBtn) {
    const blogDiv = editBtn.closest(".blogs");
    const blogId = blogDiv.dataset.id;

    try {
      const res = await fetch(
        `https://my-brand-api-x8z4.onrender.com/blogs/getBlog/${blogId}`
      );
      if (!res.ok) {
        console.log("failed to fetch blog");
      }
      const blogData = await res.json();

      hiddenPost.style.display = "block";
      publishBtn.textContent = "update";
      const title = document.getElementById("title");
      const story = document.getElementById("story");
      const author = document.getElementById("author");
  

      title.value = blogData.blogTitle;
      story.value = blogData.blog;
      author.value = blogData.author;


      if (publishBtn.textContent == "update") {
        publishBtn.addEventListener("click", async function (e) {
          e.preventDefault();
          const title = document.getElementById("title");
          const story = document.getElementById("story");
          const author = document.getElementById("author");

          try {
            const updateRes = await fetch(
              `https://my-brand-api-x8z4.onrender.com/blogs/updateBlog/${blogId}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  blogTitle: title.value,
                  blog: story.value,
                  author: author.value,

                }),
              }
            );

            if (updateRes.ok) {
              alert("blog updated successfully");

              location.reload();

              hiddenPost.style.display = "none";
            } else {
              alert("blog update failed");
            }
          } catch (err) {
            console.log(err);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // delete blogs

  if (deleteBtn) {
    const blogDiv = deleteBtn.closest(".blogs");
    const blogId = blogDiv.dataset.id;

    try {
      const res = await fetch(
        `https://my-brand-api-x8z4.onrender.com/blogs/deleteBlog/${blogId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.ok) {
        location.reload();
        alert("deleted successfully");
      } else {
        alert("delete failed");
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//get queries

const queriesDiv = document.querySelector(".queries-div");

const createPopup = () => {
  const popup = document.createElement('div');
  popup.classList.add('popup');

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close');
  closeBtn.innerHTML = '&times;';

  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if(e.target === popup){
      popup.style.display = 'none';
    }
  })

  const moreInfoDiv = document.createElement('div');
  moreInfoDiv.classList.add('more-info');

  popup.appendChild(closeBtn);
  popup.appendChild(moreInfoDiv);

  return popup;


}


async function displayQueries() {
  const baseUrl = "https://my-brand-api-x8z4.onrender.com/queries/getquery";

  try{
    
    const res = await fetch(baseUrl);

    if(!res.ok){
      console.log('Server error');
      return;
    }

    const queryData = await res.json();
    const popup = createPopup();
    document.body.appendChild(popup);

    queryData.forEach((query) => {
      const queryElement = document.createElement("div");
      queryElement.classList.add('queries');
      
      queryElement.innerHTML = `<div class="user">
      <h3>${query.name}</h3>
      <h4>${query.email}</h4>
      </div>
      <p>${query.query}</p>
      <button class="button">View More</button>`;

      queriesDiv.appendChild(queryElement);

      const viewMoreBtn = queryElement.querySelector('.button');
      viewMoreBtn.addEventListener('click', () => {
        const popupContent = `<span class="close">&times</span>
        <div class="user">
            <h3>${query.name}</h3>
            <h4>${query.email}</h4>
        </div>
  
        <p>
           ${query.query}
        </p>`;

        const moreInfoDiv = popup.querySelector('.more-info');
        moreInfoDiv.innerHTML = popupContent;

        popup.style.display = 'block';

        popup.innerHTML = '';
        popup.appendChild(moreInfoDiv);

      });

  });

    

    


  } catch(err){
    console.log('Could not fetch data')
  }
}

document.addEventListener('DOMContentLoaded', displayQueries)
