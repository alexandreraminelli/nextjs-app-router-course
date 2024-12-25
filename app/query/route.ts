/* Importação das bibliotecas necessárias */
// Postgres: o cliente para conexão com o banco de dados Postgres usando a biblioteca fornecida pelo Vercel
import { db } from "@vercel/postgres"

/**
 * Conexão com o banco de dados Postgres.
 * A conexão é estabelecida com base na configuração definida pelo Vercel Postgres.
 * @author Next.js
 */
const client = await db.connect()

/**
 * Função que retorna a lista de faturas com o valor especificado (666) e o nome do cliente associado.
 * Executa uma query SQL para buscar as informações no banco de dados.
 *
 * @returns {Promise<Array>} - Retorna uma lista de objetos contendo a quantidade da fatura e o nome do cliente.
 * @author Next.js
 * @author Next.js
 */
async function listInvoices() {
  /**
   * Realiza a consulta SQL no banco de dados para buscar faturas com valor de 666.
   * A query faz um join entre as tabelas `invoices` e `customers` para obter os dados necessários.
   *
   * @author Next.js
   */
  const data = await client.sql`
     SELECT invoices.amount, customers.name
     FROM invoices
     JOIN customers ON invoices.customer_id = customers.id
     WHERE invoices.amount = 666;
   `

  // Retorna os resultados da consulta em formato de array.
  return data.rows
}

/**
 * Função de manipulação da requisição HTTP GET.
 * Chama a função `listInvoices` para obter os dados e retorna uma resposta no formato JSON.
 *
 * @returns {Promise<Response>} - Retorna uma resposta HTTP com os dados ou um erro no formato JSON.
 * @author Next.js
 */
export async function GET() {
  try {
    // Obtém a lista de faturas e retorna como resposta JSON.
    return Response.json(await listInvoices())
  } catch (error) {
    /* tratamento de erros */
    // Retorna uma resposta de erro JSON com status 500
    return Response.json({ error }, { status: 500 })
  }
}
