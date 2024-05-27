// préparer des fonctions qui mettent et recupère le JWT en localStorage

// ajoute le token
export function addTokenAndPseudoToLocalStorage(token: string, pseudo: string) {
  // on ajoute dans le localStorage le token, il y restera meme après fermeture du navigateur.
  localStorage.setItem('jwt', token);
  localStorage.setItem('pseudo', pseudo);
}

// recupère le token si il existe (sinon renvoi null)
export function getTokenAndPseudoFromLocalStorage() {
  const jwt = localStorage.getItem('jwt');
  const pseudo = localStorage.getItem('pseudo');

  // on renvoi soit le jwt soit null si il existe pas en localStorage
  return { jwt, pseudo };
}
