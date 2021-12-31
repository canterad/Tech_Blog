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
// Function: PerformCreate - This function 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function PerformCreate()
{
    let user_id = 0;
    let title = "";
    let content = "";
    let userid = null;
    let PostCommentTextbox = null;
    let txtTitle = null;
    let data = null;

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

    const response = await fetch('/api/blogs/', {
      method: 'POST',
      body: JSON.stringify({ user_id, title, content  }),
      headers: { 'Content-Type': 'application/json' },
    });   

    if (response.status == 200) 
    {
        // This command will cause the get route to be called for the dashboard.
        document.location.replace('/dashboard');      
    }
    else
    {
          // Display the message sent from the server. 
          data = await response.json();
          alert(data.message);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformUpdate:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function PerformUpdate()
{ 
  let user_id = 0;
  let title = "";
  let content = "";
  let userid = null;
  let PostCommentTextbox = null;
  let txtTitle = null;
  let blog_id = 0;
  let blogid = null;

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
  else
  {
        // Display the message sent from the server. 
        data = await response.json();
        alert(data.message);
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformDelete:
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function PerformDelete()
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
      // Had to use setTimeout so wait half a second before the dashboard page is displayed.
      setTimeout(() => { DoDocumentReplace("/dashboard"); }, 500);      
  }
  else
  {
      // Display the message sent from the server. 
      data = await response.json();
      alert(data.message);
  }  
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: DoDocumentReplace - This function does a document.location.replace command for the URL passed in.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DoDocumentReplace(szURL)
{
  document.location.replace(szURL);
}