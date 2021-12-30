let btnNewPost = null;

btnNewPost = document.getElementById("btnNewPost");
btnNewPost.addEventListener("click", GoToNewPost);

function GoToNewPost()
{
    // This command will cause the get route to be called for a blog.
    // Pass in the id value of zero, so the Create New Post blog page is displayed..
    document.location.replace('/blog/0');    
}

