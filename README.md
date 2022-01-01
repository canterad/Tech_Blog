# Tech Blog

Tech Blog for UNH Boot Camp # 14 Model-View-Controller (MVC).<br>
This repository was created for the Homework Assignment dealing with (MVC) Model-View-Controller.<br><br>

Developer: Duane Cantera<br>
Date: Jan. 4, 2022<br>
Assignment: #14 - MVC - Tech Blog<br><br>

This project consisted of building a CMS-style blog site similar to Wordpress site where developers
can publish their blog posts and comment on other developer's posts as well.  This application 
follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating
language, Sequelize as the ORM, and the express-session npm package for authentication. 
<br><br>

### maxAge Cookie Setting:
The maxAge cookie setting is set to 30,000 for five minutes.  If you are login to the site and you
refresh the page after 5 minutes you will see that you will be logged out.
<br><br>

### Database Seeded Data:
If you seed the database two users are added and they have the following credentials:<br>
User1: Username: name, Password: password<br>
User2: Username: canterad, Password: password
<br><br>

### The Following HTML Routes Are Called For Displaying Web Pages:
"Home Page" - HTML GET - Get all Posted Blogs" - "/"<br>
"Dashboard" - HTML GET -Get Blogs for current user" - "/dashboard" - Code uses session variable "user_id" to get blogs for current user.<br>
"Login - SignUp" - HTML GET - Display Login Page - "/login"<br>
"Logout" - HTML GET - Perform logout operation - "/logout"<br>
"New Post" - HTML GET - Display New Post Page - "/blog/0" - Pass in zero blog id value for new post.<br>
"Edit Delete Post" - HTML GET - Display Edit Post Page - "/blog/id" - Pass in blog id value of current blog.<br>
"Add New Comment Page" - HTML GET - Display New Comment Page - "/comment/:id/:blog_id" - Pass in comment id = 0 and blog id.<br>
"Display Comment Page" - HTML GET - Display Current Comment Page - "/comment/:id/:blog_id" - Pass in comment id and blog id = 0.<br><br> 

### The Following HTML Routes Are Called For Performing Operations:
"Create A New User" - HTML POST - "/api/users/"<br>
"Test If User Can Log In" - HTML POST - "/api/users/login"<br>
"Create A Blog Post" - HTML POST - "/api/blogs/"<br>
"Update A Blog Post" - HTML PUT - "/api/blogs/id"<br>
"Delete A Blog Post" - HTML DELETE - "/api/blogs/id"<br>
"Adding A Comment" - HTML POST - "/api/comments/"
<br><br>

### Session Variables Defined:
user_id - This is used to get all of the blogs for the current user on the Dashboard page.<br> 
logged_in - This is used to toggle the login and logout links. Used in withAuth function to test logged in status.<br>user_name - This is used save the current user name so the user name will be added to comments. 
<br><br> 

### Timing Problems Found When Login, Logout And Deleting A Blog Post Operation Performed:
I found that when I performed the log in and log out operation the main page got refreshed before the operation completed, so the correct log in status was not displayed correctly.  I also found when I performed the delete blog operation the Dashboard page got refreshed before the operation completed, so the blog that I just deleted was still being displayed.
<br><br>
SOLUTION: I was able to solve this problem by using the setTimeout command for one second before I called the document.location.replace command to display the new page.  
<br> 

### Display Format Problems With Using Textarea Element To Enter Text And Then Displaying Text In A Paragraph Element:
This occurs when you have added a new blog post:<br>
<img src="images/PostCommentDisplayed.jpg" height="100">
<br><br>
This occurs when you have added a new comment to a post:<br>
<img src="images/NewCommentAdded.jpg" height="200">
<br>
SOLUTION: I had to use the JavaScript command "replaceAll" and replace all '\n' characters with the paragraph "< br >" characters because we are going from text in the text area element to text in a paragraph element.  I also had to use triple brackets {{{ }}} so Handlebars does not HTML-escape the value.
 <p id="blog_content">{{{blog.content}}}</p>
<br>

### Passing Data To The Client:
I found that when I needed to perform operations on the Client Side I needed data that was not displayed in 
the document, such as the user id, blog id and username.  I was able to do this by using hidden fields
in some of my views:

`<!-- Save the blog id, user id values and username so have them on the client side. -->`<br>
`<input type="hidden" id="blogid" value="{{blogItem.id}}">`<br>
`<input type="hidden" id="userid" value="{{blogItem.user.id}}">`     
`<input type="hidden" id="username" value="{{UsernameItem}}">`<br>

I was able to get these values in my JavaScript code and use them when I needed to create a blog item<br>
that contained a user id value or when I needed these id values to perform an update or delete operation.
<br><br>

### Technologies Used:
Express.js, Node.js, Sequelize, dotenv, mysql2, express-handlebars, bcrypt, express-session and connect-session_sequelize.
<br><br>

### LINKS:

Git Hub Link To Code For Project:<br> 
https://github.com/canterad/Tech_Blog.git
<br><br>
Links to Heroku site:<br>

