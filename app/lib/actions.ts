"use server" // marcar funções exportadas como Server Actions

/**
 * Função que cria uma nova fatura.
 * @author Next.js
 */
export async function createInvoice(formData: FormData) {
  /** Dados do formulário de criar fatura. */
  const rawFormData = {
    /** ID do consumidor. */
    customerId: formData.get("customerId"),
    /** Valor da fatura. */
    amount: formData.get("amount"),
    /** Status da fatura. */
    status: formData.get("status"),
  }

  // Teste
  console.log(rawFormData)
}
