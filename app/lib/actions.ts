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

  // Tratamento de erros:
  try {
    // Adicionar dados no banco de dados
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`
  } catch (e) {
    /* se ocorrer um erro */
    return {
      message: "Database Error: Failed to Create Invoice.",
    }
  }

  // Limpar o cache
  revalidatePath("/dashboard/invoices")
  // Redirecionar usuário pra página de faturas
  redirect("/dashboard/invoices")
}

/** Formato de dados da fatura. */
const UpdateInvoice = FormSchema.omit({ id: true, date: true })

/**
 * Função que atualiza a fatura no DB.
 * @author Next.js
 */
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  })

  /** Valor monetário convertido para centavos. */
  const amountInCents = amount * 100

  // Tratamento de erros
  try {
    // Atualizar fatura no SQL
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}`
  } catch (e) {
    /* se ocorrer um erro */
    return {
      message: "Database Error: Failed to Update Invoice.",
    }
  }

  revalidatePath("/dashboard/invoices")
  // redirecionar pra página de faturas
  redirect("/dashboard/invoices")
}

/**
 * Função que deleta uma fatura do DB.
 * @author Next.js
 */
export async function deleteInvoice(id: string) {
throw new Error("Failed to Delete Invoice")

  // Tratamento de erros
  try {
    // Executar query SQL
    await sql`DELETE FROM invoices WHERE id = ${id}`
  } catch (e) {
    /* se ocorrer um erro */
    return {
      message: "Database Error: Failed to Delete Invoice.",
    }
  }
  // Recarregar cache
  revalidatePath("/dashboard/invoices")
}
