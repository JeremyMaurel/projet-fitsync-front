// localStorage will store the logged status (true or false) in order to keep it if pages are reloaded and the state looses it

// adding a status 'logged' to which we will assign a string value 'yes' when user login and empty string when user logout
export function addLoggedStatusToLocalStorage(loggedStatus: string) {
  localStorage.setItem('logged', loggedStatus);
}

export function getItemLoggedStatusFromLocalStorage() {
  const logged = localStorage.getItem('logged');

  // We then test the value of logged to return a boolean called loggedStatus
  let loggedStatus;
  if (logged === 'yes') {
    loggedStatus = true;
  } else {
    loggedStatus = false;
  }
  return loggedStatus;
}
