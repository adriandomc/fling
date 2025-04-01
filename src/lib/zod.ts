import { object, string } from "zod"

export const signInSchema = object({
    email: string({ required_error: "El email es requerido" })
    .min(1, "El email es requerido")
    .email("Email inválido"),
    password: string({ required_error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener más de 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
});