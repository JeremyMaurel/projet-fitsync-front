export function calculatePasswordStrength(passwordToAnalyze: string): number {
  let strength = 0;
  if (/[A-Z]/.test(passwordToAnalyze)) {
    strength += 1;
  }
  if (/[0-9]/.test(passwordToAnalyze)) {
    strength += 1;
  }
  if (/[^A-Za-z0-9]/.test(passwordToAnalyze)) {
    strength += 1;
  }
  if (/[a-z]/.test(passwordToAnalyze)) {
    strength += 1;
  }
  if (passwordToAnalyze.length >= 8) {
    strength += 1;
  }
  return (strength / 5) * 100;
}

export function isPasswordValid(passwordToValidate: string): boolean {
  // Ajoutez ici toute logique supplémentaire pour vérifier la validité du mot de passe
  return calculatePasswordStrength(passwordToValidate) === 100;
}
