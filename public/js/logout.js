let LogoutLink = null;
LogoutLink = document.getElementById("logout");
if (LogoutLink != null)
{
  LogoutLink.addEventListener("click", PerformLogout);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformLogout - This function is called when the logout link is clicked.
// It calls the command setTimeout and after a second it calls the functionDoDocumentReplace
// which will bring up the home page.
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function PerformLogout()
{
  setTimeout(() => { DoDocumentReplace("/homeRoutes/"); }, 1000);    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: DoDocumentReplace - This function will call document.location.replace using the URL
// value passed in.  It will replace the current page with the page of the URL passed in. For this
// case it will be the home page.  I had to do this to delay the home page from being displayed because
// the session variables are not initialized yet, and have an undefined value so the home page
// does not display the login and logout items correctly until the session variable have be initialized. 
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function DoDocumentReplace(szURL)
{
  document.location.replace(szURL);
}
