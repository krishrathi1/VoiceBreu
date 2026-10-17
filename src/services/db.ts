export interface FamilyMember {
  id: string
  name: string
  relation: string
  age: string
  coverType: string
}

export interface TransactionRecord {
  id?: string
  name: string
  detail: string
  amount: string
  rawAmount: number
  kind: string
  tone: string
  type: "expense" | "income"
  category: string
  date: string
}

export interface UserRecord {
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
  familyMembers: FamilyMember[]
  transactions: TransactionRecord[]
}

const STORAGE_SESSION_KEY = "voicebrue_active_session"
const STORAGE_SESSION_KEY_LEGACY = "ringly_active_session"
const STORAGE_OFFLINE_USERS_KEY = "voicebrue_offline_users"
const STORAGE_OFFLINE_USERS_KEY_LEGACY = "ringly_offline_users"

function getOfflineUsers(): UserRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_OFFLINE_USERS_KEY) || localStorage.getItem(STORAGE_OFFLINE_USERS_KEY_LEGACY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveOfflineUsers(users: UserRecord[]) {
  try {
    localStorage.setItem(STORAGE_OFFLINE_USERS_KEY, JSON.stringify(users))
  } catch (err) {
    console.error("[Storage] Failed to save offline users", err)
  }
}

export const db = {
  /**
   * Get currently active logged-in user session from local storage
   */
  getActiveSession(): UserRecord | null {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY) || localStorage.getItem(STORAGE_SESSION_KEY_LEGACY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  },

  /**
   * Set or clear active session
   */
  setActiveSession(user: UserRecord | null) {
    try {
      if (user) {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_SESSION_KEY)
      }
    } catch (err) {
      console.error("[Storage] Failed to set active session", err)
    }
  },

  /**
   * Register a new user in database
   */
  async register(name: string, email: string, password?: string): Promise<UserRecord> {
    const cleanEmail = email.trim().toLowerCase()
    const cleanName = name.trim() || cleanEmail.split("@")[0]

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cleanName, email: cleanEmail, password }),
      })

      if (res.ok) {
        const data = await res.json()
        const user: UserRecord = data.user
        this.setActiveSession(user)
        // Also save to offline cache
        const offline = getOfflineUsers().filter((u) => u.email.toLowerCase() !== cleanEmail)
        saveOfflineUsers([...offline, user])
        return user
      } else {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || "Registration failed")
      }
    } catch (apiErr: any) {
      console.warn("[DB] API request failed, saving to local persistent DB:", apiErr)
      // Fallback local persistent registration
      const offline = getOfflineUsers()
      const existing = offline.find((u) => u.email.toLowerCase() === cleanEmail)
      if (existing) {
        this.setActiveSession(existing)
        return existing
      }

      const localUser: UserRecord = {
        id: `usr_${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        password: password || "password123",
        createdAt: new Date().toISOString(),
        balance: 0.0,
        currency: "INR",
        cardFrozen: false,
        cardPin: "8429",
        monthlyLimit: 5000,
        notifications: true,
        biometrics: true,
        hasCompletedFamilySetup: false,
        policyNumber: `RNG-FL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        sumInsured: 500000,
        familyMembers: [],
        transactions: [],
      }
      saveOfflineUsers([...offline, localUser])
      this.setActiveSession(localUser)
      return localUser
    }
  },

  /**
   * Log in user
   */
  async login(email: string, password?: string): Promise<UserRecord> {
    const cleanEmail = email.trim().toLowerCase()

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password }),
      })

      if (res.ok) {
        const data = await res.json()
        const user: UserRecord = data.user
        this.setActiveSession(user)
        const offline = getOfflineUsers().filter((u) => u.email.toLowerCase() !== cleanEmail)
        saveOfflineUsers([...offline, user])
        return user
      } else {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || "Account not found. Please create an account first.")
      }
    } catch (err: any) {
      if (err.message && err.message.includes("Account not found")) {
        throw err
      }
      if (err.message && err.message.includes("Incorrect password")) {
        throw err
      }
      console.warn("[DB] API login fallback to local cache:", err)
    }

    // Local DB fallback
    const offline = getOfflineUsers()
    const user = offline.find((u) => u.email.toLowerCase() === cleanEmail)
    if (user) {
      this.setActiveSession(user)
      return user
    }

    throw new Error("Account not found. Please create an account first.")
  },

  /**
   * Sync and update user in database
   */
  async syncUser(user: UserRecord): Promise<UserRecord> {
    this.setActiveSession(user)
    const offline = getOfflineUsers().filter((u) => u.id !== user.id && u.email !== user.email)
    saveOfflineUsers([...offline, user])

    try {
      fetch("/api/user/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      }).catch((err) => console.warn("[DB] Background sync error:", err))
    } catch {
      // Background sync non-blocking
    }

    return user
  },

  /**
   * Update active user details
   */
  async updateActiveUser(updates: Partial<UserRecord>): Promise<UserRecord | null> {
    const current = this.getActiveSession()
    if (!current) return null
    const updated: UserRecord = { ...current, ...updates }
    return this.syncUser(updated)
  },

  /**
   * Check connection to real server database
   */
  async checkConnection(): Promise<{ status: string; totalUsers: number; dbPath?: string }> {
    try {
      const res = await fetch("/api/db/health")
      if (res.ok) return await res.json()
    } catch {
      // offline
    }
    return { status: "local_cache", totalUsers: getOfflineUsers().length }
  },

  /**
   * Fetch user directly from server DB
   */
  async getUserByEmail(email: string): Promise<UserRecord | null> {
    try {
      const res = await fetch(`/api/user/${encodeURIComponent(email)}`)
      if (res.ok) {
        const data = await res.json()
        if (data.user) {
          this.setActiveSession(data.user)
          return data.user
        }
      }
    } catch (err) {
      console.warn("[DB] Failed to fetch user by email", err)
    }
    return null
  },

  /**
   * Log out
   */
  logout() {
    this.setActiveSession(null)
  },
}
