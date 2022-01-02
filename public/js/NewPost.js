// Declare Variables.
let btnNewPost = null;

// If we have the element in the document then setup the event listener.
btnNewPost = document.getElementById("btnNewPost");
if (btnNewPost != null)
{
    btnNewPost.addEventListener("click", GoToNewPost);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: GoToNewPost - This function was added so when the New Post button is selected the user
// is taken to the blog page and passing in a value of zero so the create mode is setup for the blog page.
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function GoToNewPost()
{
    // This command will cause the get route to be called for a blog.
    // Pass in the id value of zero, so the Create New Post blog page is displayed..
    document.location.replace('/homeRoutes/blog/0');    
}

