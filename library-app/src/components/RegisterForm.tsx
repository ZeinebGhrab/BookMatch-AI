import { RegisterFormProps } from './interfaces/types';

export function RegisterForm({ username, isLoading, onRegister }: RegisterFormProps) {
  return (
    <div className="text-center p-4">
      <p className="mb-3">Vous n'êtes pas encore inscrit. Voulez-vous vous inscrire ?</p>
      <button 
        onClick={onRegister}
        disabled={!username || isLoading}
        className="btn btn-success btn-lg"
      >
        {isLoading ? 'Inscription...' : "S'inscrire"}
      </button>
    </div>
  );
}