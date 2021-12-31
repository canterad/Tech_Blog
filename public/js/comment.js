let btnAddComment = null;
 
btnAddComment = document.getElementById("AddComment");
if(btnAddComment != null)
{
  btnAddComment.addEventListener("click", AddComment);
}

async function AddComment()
{
  // Setup variables to default values.
  let blogid = null;
  let userid = null;
  let blogid_value = "0";
  let userid_value = "0";
  let add_comment_textbox = null;
  let comment = "";
  let data = null;

  // Get the elements.
  blogid = document.getElementById("blogid");
  userid = document.getElementById("userid");
  add_comment_textbox = document.getElementById("add_comment_textbox");

  // Get the blog id and user id values.
  blogid_value = blogid.value;
  userid_value = userid.value;

  // Get the comment text entered by the user.
  comment = add_comment_textbox.value.trim();
    
  // if we have text perform a POST operation and send the comment to the server.
  if (comment)
  {
     const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify({ comment, blogid_value, userid_value }),
      headers: { 'Content-Type': 'application/json' },
    });   

    if (response.status !== 200) 
    {
      alert("The comment was not save.  The Submit operation failed.");
      return;
    }

    // Get the id of the new comment record created.
    data = await response.json();

    // This command will cause the get route to be called for a comment.
    // Pass in the id of the comment record created and a blog id value of zero.
    document.location.replace('/comment/' + data[0].id.toString() + "/0" );
  }
  // else - tell the user the comment was not entered.
  else
  {
    alert("The comment control is blank. You must enter a comment.");
  }
}


