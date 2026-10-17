import fs from "node:fs"
import path from "node:path"
import type { Plugin, ViteDevServer } from "vite"
import type { IncomingMessage, ServerResponse } from "node:http"

interface UserRecord {
  id: string
  name: string
  email: string
  password?: string
  createdAt: string
  balance: number
  currency: string
  cardFrozen: boolean
  cardPin: string
  monthlyLimit: number
  notifications: boolean
  biometrics: boolean
  hasCompletedFamilySetup: boolean
  policyNumber: string
  sumInsured: number
  familyMembers: Array<{
    id: string
    name: string
    relation: string
    age: string
    coverType: string
  }>
  transactions: Array<{
    id: string
    name: string
    detail: string
    amount: string
    rawAmount: number
    kind: string
    tone: string
    type: "expense" | "income"
    category: string
    date: string
  }>
}

interface DatabaseSchema {
  users: UserRecord[]
}

const DB_FILE_PATH = path.resolve(process.cwd(), "data", "db.json")

function readDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const initial: DatabaseSchema = { users: [] }
      fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true })
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), "utf-8")
      return initial
    }
    const raw = fs.readFileSync(DB_FILE_PATH, "utf-8")
    return JSON.parse(raw) as DatabaseSchema
  } catch (err) {
    console.error("[DB Error] Failed to read database:", err)
    return { users: [] }
  }
}

function writeDatabase(data: DatabaseSchema): boolean {
  try {
    fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true })
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8")
    return true
  } catch (err) {
    console.error("[DB Error] Failed to write database:", err)
    return false
  }
}

function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = ""
    req.on("data", (chunk) => {
      body += chunk
    })
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        resolve({})
      }
    })
  })
}

function sendJson(res: ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.end(JSON.stringify(data))
}

export function databasePlugin(): Plugin {
  return {
    name: "voicebrue-database-plugin",
    configureServer(server: ViteDevServer) {
      server.watcher.unwatch(DB_FILE_PATH)
      server.watcher.unwatch(path.resolve(process.cwd(), "data"))
      server.watcher.unwatch("**/data/**")

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ""

        // Handle CORS preflight
        if (req.method === "OPTIONS" && url.startsWith("/api/")) {
          res.statusCode = 204
          res.setHeader("Access-Control-Allow-Origin", "*")
          res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
          res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
          res.end()
          return
        }

        // 1. Health check & DB dump
        if (url === "/api/db/health" && req.method === "GET") {
          const db = readDatabase()
          return sendJson(res, 200, {
            status: "connected",
            dbPath: DB_FILE_PATH,
            totalUsers: db.users.length,
            timestamp: new Date().toISOString(),
          })
        }

        // 2. Register user
        if (url === "/api/auth/register" && req.method === "POST") {
          const body = await parseJsonBody(req)
          const { name, email, password } = body

          if (!email) {
            return sendJson(res, 400, { error: "Email is required" })
          }

          const db = readDatabase()
          const cleanEmail = String(email).trim().toLowerCase()
          const existing = db.users.find((u) => u.email.toLowerCase() === cleanEmail)

          if (existing) {
            return sendJson(res, 400, {
              error: "An account with this email already exists. Please sign in.",
            })
          }

          const newUser: UserRecord = {
            id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            name: name ? String(name).trim() : cleanEmail.split("@")[0],
            email: cleanEmail,
            password: password ? String(password) : "password123",
            createdAt: new Date().toISOString(),
            balance: 15420.0,
            currency: "USD",
            cardFrozen: false,
            cardPin: "8429",
            monthlyLimit: 5000,
            notifications: true,
            biometrics: true,
            hasCompletedFamilySetup: false,
            policyNumber: `RNG-FL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            sumInsured: 500000,
            familyMembers: [],
            transactions: [
              {
                id: `tx_${Date.now()}`,
                name: "Welcome Credit",
                detail: "Welcome Bonus · Today",
                amount: "+$15,420.00",
                rawAmount: 15420.0,
                kind: "$",
                tone: "lime",
                type: "income",
                category: "Bonus",
                date: new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
              },
            ],
          }

          db.users.push(newUser)
          writeDatabase(db)
          return sendJson(res, 201, { success: true, user: newUser })
        }

        // 3. Login user
        if (url === "/api/auth/login" && req.method === "POST") {
          const body = await parseJsonBody(req)
          const { email, password } = body

          if (!email) {
            return sendJson(res, 400, { error: "Email is required" })
          }

          const db = readDatabase()
          const cleanEmail = String(email).trim().toLowerCase()
          const user = db.users.find((u) => u.email.toLowerCase() === cleanEmail)

          if (!user) {
            return sendJson(res, 404, {
              error: "Account not found with this email. Please create an account first.",
            })
          }

          if (password && user.password && user.password !== password) {
            return sendJson(res, 401, {
              error: "Incorrect password. Please try again.",
            })
          }

          return sendJson(res, 200, { success: true, user })
        }

        // 4. Update / Sync User Data (Family Members, Balance, Settings, Transactions)
        if (url === "/api/user/sync" && req.method === "POST") {
          const body = await parseJsonBody(req)
          const user = body.user || body

          if (!user || (!user.id && !user.email)) {
            return sendJson(res, 400, { error: "User payload required" })
          }

          const db = readDatabase()
          const cleanEmail = String(user.email || "").toLowerCase()
          const index = db.users.findIndex(
            (u) => u.id === user.id || (cleanEmail && u.email.toLowerCase() === cleanEmail)
          )

          if (index >= 0) {
            db.users[index] = { ...db.users[index], ...user }
          } else {
            db.users.push(user)
          }

          writeDatabase(db)
          return sendJson(res, 200, { success: true, user: index >= 0 ? db.users[index] : user })
        }

        // 5. Fetch single user by email
        if (url.startsWith("/api/user/") && req.method === "GET") {
          const emailQuery = decodeURIComponent(url.replace("/api/user/", "")).toLowerCase()
          const db = readDatabase()
          const user = db.users.find((u) => u.email.toLowerCase() === emailQuery)
          if (!user) {
            return sendJson(res, 404, { error: "User not found" })
          }
          return sendJson(res, 200, { user })
        }

        // Proceed to Vite next middleware
        next()
      })
    },
  }
}
