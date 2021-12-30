let LogoutLink = null;
LogoutLink = document.getElementById("logout");
LogoutLink.addEventListener("click", PerformLogout);

function PerformLogout()
{
  setTimeout(() => { DoDocumentReplace("/"); }, 500);    
}

function DoDocumentReplace(szURL)
{
  document.location.replace(szURL);
}


// OLD CODE BELOW:


/*************************************************************************
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);

// Code cut and pasted from activity below:

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout').addEventListener('click', logout);
***********************************************************************************/