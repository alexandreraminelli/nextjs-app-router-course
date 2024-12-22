/*
 * Este arquivo contém definições de tipo para seus dados.
 * Ele descreve a forma dos dados e que tipo de dados cada propriedade deve aceitar.
 * Para simplicidade do ensino, estamos definindo esses tipos manualmente.
 * No entanto, esses tipos são gerados automaticamente se você estiver usando um ORM como o Prisma.
 */
export type User = {
  id: string
  name: string
  email: string
  password: string
}

export type Customer = {
  id: string
  name: string
  email: string
  image_url: string
}

export type Invoice = {
  id: string
  customer_id: string
  amount: number
  date: string
  // Em TypeScript, isso é chamado de tipo de união de string.
  // Isso significa que a propriedade "status" só pode ser uma das duas strings: 'pending' ou 'paid'.
  status: "pending" | "paid"
}

export type Revenue = {
  month: string
  revenue: number
}

export type LatestInvoice = {
  id: string
  name: string
  image_url: string
  email: string
  amount: string
}

// O banco de dados retorna um número para amount, mas depois formatamos para uma string com a função formatCurrency
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number
}

export type InvoicesTable = {
  id: string
  customer_id: string
  name: string
  email: string
  image_url: string
  date: string
  amount: number
  status: "pending" | "paid"
}

export type CustomersTableType = {
  id: string
  name: string
  email: string
  image_url: string
  total_invoices: number
  total_pending: number
  total_paid: number
}

export type FormattedCustomersTable = {
  id: string
  name: string
  email: string
  image_url: string
  total_invoices: number
  total_pending: string
  total_paid: string
}

export type CustomerField = {
  id: string
  name: string
}

export type InvoiceForm = {
  id: string
  customer_id: string
  amount: number
  status: "pending" | "paid"
}
