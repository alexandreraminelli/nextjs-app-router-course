/* Importação das bibliotecas necessárias */
// Bcrypt: Biblioteca para criptografar senhas.
import bcrypt from "bcrypt"
// Response: Biblioteca para retornar respostas.
import { db } from "@vercel/postgres"
// Dados de placeholder: Dados de exemplo para inserir no banco de dados.
import {
  invoices, // faturas
  customers, // clientes
  revenue, // receitas
  users, // usuários
} from "../lib/placeholder-data"

/** Constante que conecta o banco de dados. */
const client = await db.connect()

/**
 * Função que insere usuários no banco de dados.
 * @author Next.js
 */
async function seedUsers() {
  // Cria a extensão uuid-ossp no SQL
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
  // Cria a tabela users no SQL
  await client.sql`
     CREATE TABLE IF NOT EXISTS users (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email TEXT NOT NULL UNIQUE,
       password TEXT NOT NULL
     );
   `

  /**
   * Insere os usuários no banco de dados.
   * @returns {Promise} Retorna os usuários inseridos no banco de dados.
   * @param {Array} users - Array de usuários.
   * @param {String} user.id - ID do usuário.
   * @author Next.js
   */
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      // Criptografa a senha do usuário
      const hashedPassword = await bcrypt.hash(user.password, 10)
      // Retorna a query SQL para inserir o usuário no banco de dados
      return client.sql`
         INSERT INTO users (id, name, email, password)
         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
         ON CONFLICT (id) DO NOTHING;
       `
    })
  )

  // Retorna os usuários inseridos no banco de dados
  return insertedUsers
}

/**
 * Função para inserir faturas no banco de dados.
 * @returns {Promise} Retorna as faturas inseridas no banco de dados.
 * @author Next.js
 */
async function seedInvoices() {
  // Cria a extensão uuid-ossp
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

  // Cria a tabela invoices
  await client.sql`
     CREATE TABLE IF NOT EXISTS invoices (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       customer_id UUID NOT NULL,
       amount INT NOT NULL,
       status VARCHAR(255) NOT NULL,
       date DATE NOT NULL
     );
   `
  /**
   * Insere as faturas no banco de dados.
   */
  const insertedInvoices = await Promise.all(
    // Mapeia as faturas e insere no banco de dados
    invoices.map(
      // Insere a fatura no banco de dados
      (invoice) => client.sql`
         INSERT INTO invoices (customer_id, amount, status, date)
         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
         ON CONFLICT (id) DO NOTHING;
       `
    )
  )

  // Retorna as faturas inseridas no banco de dados
  return insertedInvoices
}

/**
 * Função para inserir clientes no banco de dados
 * @returns {Promise} Retorna os clientes inseridos no banco de dados
 * @author Next.js
 */
async function seedCustomers() {
  // Cria a extensão uuid-ossp
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

  // Cria a tabela customers
  await client.sql`
     CREATE TABLE IF NOT EXISTS customers (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       image_url VARCHAR(255) NOT NULL
     );
   `
  /**
   * Insere os clientes no banco de dados.
   * @returns {Promise} Retorna os clientes inseridos no banco de dados.
   * @author Next.js
   */
  const insertedCustomers = await Promise.all(
    // Mapeia os clientes e insere no banco de dados
    customers.map(
      // Insere o cliente no banco de dados
      (customer) => client.sql`
         INSERT INTO customers (id, name, email, image_url)
         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
         ON CONFLICT (id) DO NOTHING;
       `
    )
  )

  // Retorna os clientes inseridos no banco de dados
  return insertedCustomers
}

/**
 * Função para inserir receitas no banco de dados
 * @returns {Promise} Retorna as receitas inseridas no banco de dados
 * @author Next.js
 */
async function seedRevenue() {
  // Cria a tabela revenue
  await client.sql`
     CREATE TABLE IF NOT EXISTS revenue (
       month VARCHAR(4) NOT NULL UNIQUE,
       revenue INT NOT NULL
     );
   `
  /**
   * Insere as receitas no banco de dados.
   * @returns {Promise} Retorna as receitas inseridas no banco de dados.
   * @author Next.js
   */
  const insertedRevenue = await Promise.all(
    // Mapeia as receitas e insere no banco de dados
    revenue.map(
      // Insere a receita no banco de dados
      (rev) => client.sql`
         INSERT INTO revenue (month, revenue)
         VALUES (${rev.month}, ${rev.revenue})
         ON CONFLICT (month) DO NOTHING;
       `
    )
  )

  // Retorna as receitas inseridas no banco de dados
  return insertedRevenue
}

/**
 * Função principal que executa as funções de inserção e retorna uma resposta.
 * @returns {Promise} Retorna uma resposta com a mensagem de sucesso ou erro.
 * @author Next.js
 */
export async function GET() {
  // Retorna uma resposta com a mensagem de sucesso ou erro
  try {
    /* Tenta executar as funções de inserção */
    await client.sql`BEGIN` // Inicia uma transação
    await seedUsers() // Insere os usuários
    await seedCustomers() // Insere os clientes
    await seedInvoices() // Insere as faturas
    await seedRevenue() // Insere as receitas
    await client.sql`COMMIT` // Confirma a transação

    // Retorna uma resposta com a mensagem de sucesso
    return Response.json({ message: "Database seeded successfully" })
  } catch (error) {
    /* Tratamento de erro */
    await client.sql`ROLLBACK` // Reverte a transação em caso de erro
    // Retorna uma resposta com a mensagem de erro
    return Response.json({ error }, { status: 500 })
  }
}
