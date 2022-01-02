// Create variables for the button elements.
let btnPostCreate = null;
let btnPostUpdate = null;
let btnPostDelete = null;

// If the Create button exists in the document then setup event listener for button click operation.
btnPostCreate = document.getElementById("btnPostCreate");
if (btnPostCreate != null)
{
  btnPostCreate.addEventListener("click", PerformCreate);
}

// If the Update button exists in the document then setup event listener for button click operation.
btnPostUpdate = document.getElementById("btnPostUpdate");
if (btnPostUpdate != null)
{
  btnPostUpdate.addEventListener("click", PerformUpdate);
}

// If the Delete button exists in the document then setup event listener for button click operation.
btnPostDelete = document.getElementById("btnPostDelete");
if (btnPostDelete != null)
{
  btnPostDelete.addEventListener("click", PerformDelete);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformCreate - This function will perform the create operation for a Blog Post.  It calls a POST
// route for a blog post: /api/blogs/.  After the create operation is completed it executes the command
// document.location.replace to bring up the Dashboard page.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function PerformCreate()
{
  try
  {
    let user_id = 0;
    let title = "";
    let content = "";
    let userid = null;
    let PostCommentTextbox = null;
    let txtTitle = null;
    let data = null;
    let szResult = "";

    // Get the elements by their Id values.
    userid = document.getElementById("userid");
    PostCommentTextbox = document.getElementById("PostCommentTextbox");
    txtTitle = document.getElementById("txtTitle");

    // Get the user id value from the hidden field and get the data the user entered.
    user_id = userid.value;

    // Get the content text entered by the user.
    content = PostCommentTextbox.value.trim();

    // Get the title text entered by the user.
    title = txtTitle.value.trim();

    // If the user did not enter a title, tell them about it and exit.
    if (title.length == 0)
    {
      alert("The create operation cannot be performed.\r\nYou must enter a title.");
      return;
    }

    // If the user did not enter content, tell them about it and exit.
    if (content.length == 0)
    {
      alert("The create operation cannot be performed.\r\nYou must enter content.");
      return;
    }

    // Have to replace all '\n' characters with the '<br>' character.
    szResult = content.replaceAll('\n', '<br>');
    content = szResult;

    const response = await fetch('/api/blogs/', {
      method: 'POST',
      body: JSON.stringify({ user_id, title, content  }),
      headers: { 'Content-Type': 'application/json' },
    });   

    if (response.status == 200) 
    {
        // This command will cause the get route to be called for the dashboard.
        document.location.replace('/homeRoutes/dashboard');      
    }
  }
  catch (err)
  {
    // Display the message sent from the server. 
    data = await response.json();
    alert(data.message);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformUpdate: This function performs the Update operation for the Blog Post.
// It does a PUT operation using the following route: /api/blogs/
// After the update operation completes it displays a message to the user telling them that
// the update operation was successful.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function PerformUpdate()
{
  try
  { 
    let user_id = 0;
    let title = "";
    let content = "";
    let userid = null;
    let PostCommentTextbox = null;
    let txtTitle = null;
    let blog_id = 0;
    let blogid = null;
    let szResult = "";

    // Get the elements by their Id values.
    userid = document.getElementById("userid");
    blogid = document.getElementById("blogid");
    PostCommentTextbox = document.getElementById("PostCommentTextbox");
    txtTitle = document.getElementById("txtTitle");

    // Get the user id value from the hidden field.
    user_id = userid.value;

    // Get the blog id value from the hidden field.
    blog_id = blogid.value;

    // Get the content text entered by the user.
    content = PostCommentTextbox.value.trim();

    // Get the title text entered by the user.
    title = txtTitle.value.trim();

    // If the user did not enter a title, tell them about it and exit.
    if (title.length == 0)
    {
      alert("The update operation cannot be performed.\r\nYou must enter a title.");
      return;
    }

    // If the user did not enter content, tell them about it and exit.
    if (content.length == 0)
    {
      alert("The update operation cannot be performed.\r\nYou must enter content.");
      return;
    }

    // Have to replace all '\n' characters with the '<br>' character.
    szResult = content.replaceAll('\n', '<br>');
    content = szResult;

    const response = await fetch('/api/blogs/' + blog_id.toString(), {
      method: 'PUT',
      body: JSON.stringify({ user_id, title, content  }),
      headers: { 'Content-Type': 'application/json' },
    });   

    if (response.status == 200) 
    {
        // Display the message sent from the server. 
        data = await response.json(); 
        alert(data.message);   
    }
  }
  catch (err)
  {
    // Display the message sent from the server. 
    data = await response.json();
    alert(data.message);
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformDelete: This operation performs the delete operation for a blog post.
// It performs a DELETE operation passing in the route: /api/blogs/.
// After the delete operation completes it excutes the command document.location.replace
// to display the Dashboard page.  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function PerformDelete()
{
  try
  {
    let blog_id = 0;
    let blogid = null;

    // Get the blog id element for the document.
    blogid = document.getElementById("blogid"); 
  
    // Get the blog id value from the hidden field.
    blog_id = blogid.value; 
  
    const response = await fetch('/api/blogs/' + blog_id.toString(), 
    {
      method: 'DELETE',
    });     

    if (response.status == 200) 
    {
      // This command will cause the get route to be called for the dashboard.
      document.location.replace("/homeRoutes/dashboard");
    }
  }
  catch (err)
  {
    // Display the message sent from the server. 
    data = await response.json();
    alert(data.message);
  }  
}

