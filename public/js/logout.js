/***********************************************************
let LogoutLink = null;
LogoutLink = document.getElementById("logout");
if (LogoutLink != null)
{
  LogoutLink.addEventListener("click", PerformLogout);
}
************************************************************/

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformLogout - This function is called when the logout link is clicked.
// The home page is displayed.
//////////////////////////////////////////////////////////////////////////////////////////////////////////
function PerformLogout()
{
  document.location.replace("/"); 
}


