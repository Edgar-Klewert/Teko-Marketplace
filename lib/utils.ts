import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para carregar o modelo 3D personalizado
export async function loadCustomModel(modelPath: string) {
  try {
    // Esta é uma função placeholder para carregar seu modelo 3D personalizado
    // Você precisará implementar a lógica real de carregamento do modelo
    console.log(`Carregando modelo 3D de: ${modelPath}`)
    return {
      success: true,
      model: modelPath,
    }
  } catch (error) {
    console.error("Erro ao carregar modelo 3D:", error)
    return {
      success: false,
      error: "Falha ao carregar o modelo 3D",
    }
  }
}
