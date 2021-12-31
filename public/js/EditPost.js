let btnPostCreate = null;
let btnPostUpdate = null;
let btnPostDelete = null;

btnPostCreate = document.getElementById("btnPostCreate");
if (btnPostCreate != null)
{
  btnPostCreate.addEventListener("click", PerformCreate);
}

btnPostUpdate = document.getElementById("btnPostUpdate");
if (btnPostUpdate != null)
{
  btnPostUpdate.addEventListener("click", PerformUpdate);
}

btnPostDelete = document.getElementById("btnPostDelete");
if (btnPostDelete != null)
{
  btnPostDelete.addEventListener("click", PerformDelete);
}

async function PerformCreate()
{
  alert("Got to PerformCreate function.");     
}

async function PerformUpdate()
{
  alert("Got to PerformUpdate function.");
}

async function PerformDelete()
{
  alert("Got to PerformDelete function.");
}

