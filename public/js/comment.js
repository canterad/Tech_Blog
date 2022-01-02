// Create variables for the Add Comment operation.
let btnAddComment = null;

// If we found the AddComment element in the document then setup the Event Listener.
btnAddComment = document.getElementById("AddComment");
if(btnAddComment != null)
{
  btnAddComment.addEventListener("click", AddComment);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: AddComment - This function performs a POST operation to create a new comment.
// It uses the following route: '/api/comments/'
// After the POST operation completes it call the command document.location.replace with the
// following url: /comment/id passing in the id of the new comment just created so the comment
// web page will get updated.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function AddComment()
{
  try
  {
    // Setup variables to default values.
    let blogid = null;
    let userid = null;
    let blogid_value = "0";
    let userid_value = "0";
    let add_comment_textbox = null;
    let comment = "";
    let data = null;
    let username = null;
    let username_value = "";
    let szResult = "";

    // Get the elements from hidden controls.
    blogid = document.getElementById("blogid");
    userid = document.getElementById("userid");
    username = document.getElementById("username");

    // Get the comment textbox control.
    add_comment_textbox = document.getElementById("add_comment_textbox");
 
    // Get the blog id, user id and username values.
    blogid_value = blogid.value;
    userid_value = userid.value;
    username_value = username.value;

    // Get the comment text entered by the user.
    comment = add_comment_textbox.value.trim();

    // if we have text perform a POST operation and send the comment to the server.
    if (comment)
    {
      // Replace all '\n' characters in the comment text with '<br>' characters.
      szResult = comment.replaceAll('\n', '<br>');

      // Append the username and current date to the comment.
      comment = szResult + '<br><br>' + "--" + username_value + ", " + new Date().toLocaleDateString(); 

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
  catch (err)
  {
    alert("The add comment operation failed.");    
  }
}


