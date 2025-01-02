"use server" // marcar funções exportadas como Server Actions

/* importações */
import { z } from "zod" // biblioteca de validação de TS
import { sql } from "@vercel/postgres" // comunicação com banco de dados
import { revalidatePath } from "next/cache" // função que limpa o cache
import { redirect } from "next/navigation"

/** Formato de dados das faturas para o Zod. */
const FormSchema = z.object({
  /** ID da instância fatura. */
  id: z.string(),
  /** ID do cliente. */
  customerId: z.string({
    invalid_type_error: "Please select a customer.", // msg para tipo inválido
  }),
  /** Valor da fatura (em dólares). */
  amount: z.coerce
    .number() // converter string para number
    .gt(0, { message: "Please enter an amount greater than $0." }), // msg se não informar um número (padrão 0)
  /** Status da fatura (pago ou pendente). */
  status: z.enum(
    ["pending", "paid"], // dados aceitos
    { invalid_type_error: "Please select an invoice status." } // msg se entrada não for um dado aceito
  ),
  date: z.string(),
})

/** Função que retorna todas as faturas do db. */
const CreateInvoice = FormSchema.omit({ id: true, date: true })

/** Tipo de dados State. */
export type State = {
  errors?: {
    customerId?: string[]
    amount?: string[]
    status?: string[]
  }
}

/**
 * Função que cria uma nova fatura.
 * @param prevState Estado passado do hook `useActionState`.
 * @author Next.js
 */
export async function createInvoice(prevState: State, formData: FormData) {
  /** Dados do formulário de criar fatura após a validação. */
  const validatedFields = CreateInvoice.safeParse({
    /** ID do consumidor. */
    customerId: formData.get("customerId"),
    /** Valor da fatura. */
    amount: formData.get("amount"),
    /** Status da fatura. */
    status: formData.get("status"),
  })

  // Se validação falhar, retorne erros antecipadamente. Caso contrário, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    }
  }

  /* Preparar dados para inserção no db */
  const { customerId, amount, status } = validatedFields.data
  // Converter valor em centavos
  /** Valor em centavos. */
  const amountInCents = amount * 100
  // Obter data atual
  /** Data de criação da fatura. */
  const date = new Date().toISOString().split("T")[0]

  /* Inserir dados no db */
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
