const blogForm = document.querySelector('.new-story-form');
blogForm.addEventListener('submit', async function (e){
    e.preventDefault()

    const title = document.getElementById('title');
    const story = document.getElementById('story');
    
    const blogData = {
        blogTitle: title.value,
        blog:story.value,

    }

    const baseUrl = 'http://localhost:5000/blogs'

    try{
        const res = await fetch(baseUrl, {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(blogData)
        })

        if(res.ok){
            alert('blog created successfully')
        } else {
            console.log('blog not created')
        }

    }catch(err){
        console.log(err)
    }
} )

//retrieve and display
