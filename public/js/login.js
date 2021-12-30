let btnOperation = null;
let btnSwitch = null;
 
btnOperation = document.getElementById("btnLogin");
btnOperation.addEventListener("click", PerformOperation);

btnSwitch = document.getElementById("btnSwitch");
btnSwitch.addEventListener("click", PerformSwitch);

function PerformSwitch()
{
    let OperationMode = null;
    let OperationValue = 0;
    let login_title_data = null;
    
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
    }
    // Else switch operation from Sign Up to Login.
    else
    {
        // Set the OperationMode value.
        OperationMode.value = 1;
        btnOperation.innerText = "Login!";
        btnSwitch.innerText = "Sign Up instead";  
        login_title_data.innerText = "Login";      
    }
}

function PerformOperation()
{
  alert("Got to PerformOperation function.");
}