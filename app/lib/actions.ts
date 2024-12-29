"use server" // marcar funções exportadas como Server Actions

/* importações */
import { z } from "zod" // biblioteca de validação de TS
import { sql } from "@vercel/postgres" // comunicação com banco de dados
import { revalidatePath } from "next/cache" // função que limpa o cache
import { redirect } from "next/navigation"

/** Formato de dados das faturas para o Zod. */
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), // converter string para number
  status: z.enum(["pending", "paid"]),
  date: z.string(),
})

/** */
const CreateInvoice = FormSchema.omit({ id: true, date: true })

/**
 * Função que cria uma nova fatura.
 * @author Next.js
 */
export async function createInvoice(formData: FormData) {
  /** Dados do formulário de criar fatura. */
  const { customerId, amount, status } = CreateInvoice.parse({
    /** ID do consumidor. */
    customerId: formData.get("customerId"),
    /** Valor da fatura. */
    amount: formData.get("amount"),
    /** Status da fatura. */
    status: formData.get("status"),
  })

  // Converter valor em centavos
  /** Valor em centavos. */
  const amountInCents = amount * 100

  // Obter data atual
  /** Data de criação da fatura. */
  const date = new Date().toISOString().split("T")[0]

  // Adicionar dados no banco de dados
  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `

  // Limpar o cache
  revalidatePath("/dashboard/invoices")
  // Redirecionar usuário pra página de faturas
  redirect("/dashboard/invoices")
}
