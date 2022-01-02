// Set up variables for buttons.  
let btnOperation = null;
let btnSwitch = null;

// Get the operation button and set up event listener.
btnOperation = document.getElementById("btnLogin");
if (btnOperation != null)
{
    btnOperation.addEventListener("click", PerformOperation);
}

// Get the switch button and set up the event listener.
btnSwitch = document.getElementById("btnSwitch");
if (btnSwitch != null)
{
  btnSwitch.addEventListener("click", PerformSwitch);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformSwitch - This function will change the text when the uses selects the switch button.
// Switches the text from login to sign up and from sign up back to login.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PerformSwitch()
{
    let OperationMode = null;
    let OperationValue = 0;
    let login_title_data = null;
    let LoginPassword = null;
    
    LoginPassword = document.getElementById("LoginPassword"); 
    login_title_data = document.getElementById("login_title_data");    
    OperationMode = document.getElementById("OperationMode");
    OperationValue = OperationMode.value;

    // If operation value is login, switch to Sign Up.
    if (OperationValue == 1)
    {
        // Set the OperationMode value.
        OperationMode.value = 2;
        btnOperation.innerText = "Sign Up!";
        btnSwitch.innerText = "Login instead";
        login_title_data.innerText = "Sign Up";  
        LoginPassword.innerHTML = "Password - Minimum of Eight Characters Required.";            
    }
    // Else switch operation from Sign Up to Login.
    else
    {
        // Set the OperationMode value.
        OperationMode.value = 1;
        btnOperation.innerText = "Login!";
        btnSwitch.innerText = "Sign Up instead";  
        login_title_data.innerText = "Login";  
        LoginPassword.innerHTML = "Password";                  
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformOperation: This function will get the operation mode value and get the username and password
// entered.  If the user
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function PerformOperation()
{
  let OperationMode = null;
  let OperationValue = 0;
  let txtUsername = null;
  let txtPassword = null;
  let szUsername = "";
  let szPassword = "";
  let szOperationName = "";

  // Get the Operation Mode value from the hidden field.
  OperationMode = document.getElementById("OperationMode");
  OperationValue = OperationMode.value;

  // Set the Operation Name value to use in alert messages.
  if (OperationValue == 1)
  {
      szOperationName = "Login";
  }
  else
  {
      szOperationName = "Sign Up";
  }

  // Get the Username element from the document.
  txtUsername = document.getElementById("txtUsername");
  
  // Get the Password element form the document.
  txtPassword = document.getElementById("txtPassword");

  // Get the Username value.  If don't have one warn the user.
  szUsername = txtUsername.value.trim();

  if (szUsername.length == 0)
  {
    alert("The " + szOperationName + " operation could not be performed.\r\n\r\nYou must enter a Username.");
    return;
  }

  // Get the Password value.  If don't have one warn the user.
  szPassword = txtPassword.value.trim();

  if (szPassword.length == 0)
  {
    alert("The " + szOperationName + " operation could not be performed.\r\n\r\nYou must enter a Password.");
    return;
  }

  // If user is signing up then test the password length, has to be 8 or more characters.
  if ((OperationValue == 2) && (szPassword.length < 8))
  {
    alert("The " + szOperationName + " operation could not be performed.\r\n\r\nYou must enter 8 characters for the Password.");
    return;    
  }

  // Test the Operation value and call the function to perform the operation.
  if (OperationValue == 1)
  {
    PerformLogIn(szUsername, szPassword);
  }
  else
  {
    PerformSignUp (szUsername, szPassword);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformLogIn - This function makes a post call to test if the user can log in.
// Had to use a setTimeout command because the session variables are not set when location replace command is
// executed.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function PerformLogIn(szUsername, szPassword)
{
  try
  {
    // Do Post call to test if user can log in.
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ szUsername, szPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    // User was able to login.  Do the location replace command.
    if (response.status == 200) 
    {
      document.location.replace("/");
    }
  }
  catch (err)
  { 
    if (response.status == 400)
    {
        // Get the message sent from the server.
        data = await response.json();
        alert("The Login Operation Failed.\r\n" + data.message);
    }
    else
    {
        alert ('Failed to log in.');  
    }      
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function: PerformSignUp - This function does a POST operation to create a new user.
// I am using a setTimeout command to wait for 1 second before doing the location replace command.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function PerformSignUp(szUsername, szPassword)
{
  try
  {
    let data = null;

    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ szUsername, szPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status == 200) 
    {
      document.location.replace("/");
    } 
  }
  catch (err)
  {
    if (response.status == 400)
    {
      // Get the id of the new comment record created.
      data = await response.json();
      alert("The Sign Up Operation Failed.\r\n" + data.message);
    }
    else
    {
      alert("The Sign Up Operation Failed.");  
    }
  }
}


