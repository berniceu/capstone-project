const loader = document.querySelector(".loader");
const commentIcon = document.querySelector(".fa-comment");
const newCommentContainer = document.querySelector(".comment-section.hidden");
const row = document.querySelector(".row");

commentIcon.addEventListener("click", () => {
  newCommentContainer.style.display = "block";
});
// render full blog

document.addEventListener("DOMContentLoaded", renderBlog);

function renderBlog(e) {
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("id");
  const column = document.querySelector(".column");

  if (blogId) {
    loader.style.display = "flex";
    fetch(`https://my-brand-api-x8z4.onrender.com/blogs/getBlog/${blogId}`)
      .then((res) => res.json())
      .then((blog) => {
        const formattedBlog = blog.blog
          .replace(/\n/g, "<br>")
          .replace(/===(.*)===/g, "<h4>$1</h4>");
        column.innerHTML = `
        <h3>${blog.blogTitle}</h3>
        <h5>${blog.author}</h5>
        <div class='img-container'>
        <img src=${blog.blogImage} class='readblog-img'/>
        </div>
        <div class='paragraph'>
        <p>${formattedBlog}</p>
        </div>

    `;
      })
      .catch((err) => console.log(err))
      .finally(() => (loader.style.display = "none"));
  }
}

function getComments() {
  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("id");

  if (blogId) {
    fetch(`https://my-brand-api-x8z4.onrender.com/blogs/getComment/${blogId}`)
      .then((res) => {
        if (!res.ok) {
          console.log(err);
        }
        return res.json();
      })
      .then((comments) => {
        comments.forEach((comment) => {
          const commentDiv = document.createElement("div");
          commentDiv.dataset.id = comment._id;
          commentDiv.classList.add("comment-div");

          commentDiv.innerHTML = `<h5>${comment.name}</h5>
            <p>${comment.comment}</p>
            <button class="button">delete</button>`;

          row.appendChild(commentDiv);
          const deleteBtn = commentDiv.querySelector(".button");
          deleteBtn.addEventListener("click", async () => {
            const commentId = commentDiv.dataset.id;
            const baseUrl = `https://my-brand-api-x8z4.onrender.com/blogs/deleteComment/${commentId}`;

            try {
              const res = await fetch(baseUrl, { method: "DELETE" });
              if (res.ok) {
                alert("message deleted successfully");
                window.location.reload();
              } else {
                console.log("failed to delete comment");
              }
            } catch (err) {
              console.log(err);
            }
          });
        });
      });
  }
}

window.addEventListener("DOMContentLoaded", getComments);


const commentForm = document.querySelector(".comment-form");
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const commenterName = document.querySelector(".commenter-name");
  const commentText = document.querySelector(".comment-text");

  const params = new URLSearchParams(window.location.search);
  const blogId = params.get("id");

  const comment = {
    name: commenterName.value,
    comment: commentText.value,
  };

  const baseUrl = `https://my-brand-api-x8z4.onrender.com/blogs/addComment/${blogId}`;

  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    if (res.ok) {
      window.location.reload();
      alert("comment added successfully");
    } else {
      console.log("comment not created");
    }
  } catch (err) {
    console.log(err);
  }
});
