import { useMemo, useState, useRef, useEffect } from "react"
import { db, type FamilyMember } from "./services/db"

type IconName =
  | "home"
  | "card"
  | "transfer"
  | "chart"
  | "settings"
  | "search"
  | "bell"
  | "eye"
  | "eyeOff"
  | "arrowUp"
  | "arrowDown"
  | "plus"
  | "send"
  | "more"
  | "wallet"
  | "chevron"
  | "logout"
  | "check"
  | "x"
  | "lock"
  | "mail"
  | "user"
  | "faceId"
  | "sparkles"
  | "shield"
  | "heart"
  | "trash"
  | "database"
  | "users"

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9M9 20v-6h6v6" />
      </>
    ),
    card: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M3 10h18M7 15h3" />
      </>
    ),
    transfer: (
      <>
        <path d="M7 7h12l-3-3M17 17H5l3 3" />
        <path d="m19 7-3 3M5 17l3-3" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    arrowUp: (
      <>
        <path d="M12 19V5M6 11l6-6 6 6" />
      </>
    ),
    arrowDown: (
      <>
        <path d="M12 5v14M18 13l-6 6-6-6" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 6.5h14a2 2 0 0 1 2 2V19H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12" />
        <path d="M20 10h-5a2 2 0 0 0 0 4h5" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    logout: (
      <>
        <path d="M10 4H4v16h6M14 8l4 4-4 4M8 12h10" />
      </>
    ),
    check: <path d="M20 6 9 17l-5-5" />,
    x: <path d="M18 6 6 18M6 6l12 12" />,
    eyeOff: (
      <>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="7" r="4" />
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      </>
    ),
    faceId: (
      <>
        <path d="M7 3H5a2 2 0 0 0-2 2v2M17 3h2a2 2 0 0 1 2 2v2M7 21H5a2 2 0 0 1-2-2v-2M17 21h2a2 2 0 0 0 2-2v-2M9 9h.01M15 9h.01M9 14a3 3 0 0 0 6 0" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </>
    ),
    heart: (
      <>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

interface Transaction {
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

type PeriodType = "1W" | "1M" | "3M" | "1Y"

const cashFlowData: Record<
  PeriodType,
  {
    income: string
    expenses: string
    areaD: string
    incomeD: string
    expenseD: string
    point: { x: number; y: number }
    labels: [string, string, string]
  }
> = {
  "1W": {
    income: "$2,140",
    expenses: "$860",
    areaD: "M0 170 C60 160, 100 120, 180 135 S270 170, 350 110 S460 70, 520 85 S620 40, 700 55 L700 210 L0 210 Z",
    incomeD: "M0 170 C60 160, 100 120, 180 135 S270 170, 350 110 S460 70, 520 85 S620 40, 700 55",
    expenseD: "M0 185 C80 175, 140 160, 220 168 S330 180, 410 152 S530 145, 600 156 S670 130, 700 140",
    point: { x: 520, y: 85 },
    labels: ["Mon", "Thu", "Sun"],
  },
  "1M": {
    income: "$8,420",
    expenses: "$3,128",
    areaD: "M0 165 C55 154, 80 108, 135 119 S210 158, 260 126 S345 54, 400 78 S485 130, 540 92 S625 39, 700 48 L700 210 L0 210 Z",
    incomeD: "M0 165 C55 154, 80 108, 135 119 S210 158, 260 126 S345 54, 400 78 S485 130, 540 92 S625 39, 700 48",
    expenseD: "M0 181 C70 174, 105 156, 158 163 S245 176, 296 148 S378 137, 433 151 S515 163, 564 139 S645 117, 700 129",
    point: { x: 400, y: 78 },
    labels: ["Jun 1", "Jun 11", "Jun 21"],
  },
  "3M": {
    income: "$24,680",
    expenses: "$9,410",
    areaD: "M0 150 C70 140, 110 80, 190 95 S290 140, 380 90 S470 50, 530 65 S630 30, 700 40 L700 210 L0 210 Z",
    incomeD: "M0 150 C70 140, 110 80, 190 95 S290 140, 380 90 S470 50, 530 65 S630 30, 700 40",
    expenseD: "M0 175 C90 165, 150 150, 240 155 S340 165, 420 140 S540 135, 620 145 S670 120, 700 130",
    point: { x: 380, y: 90 },
    labels: ["Apr", "May", "Jun"],
  },
  "1Y": {
    income: "$98,400",
    expenses: "$38,200",
    areaD: "M0 140 C80 130, 130 70, 210 85 S310 130, 400 80 S490 40, 560 60 S640 25, 700 35 L700 210 L0 210 Z",
    incomeD: "M0 140 C80 130, 130 70, 210 85 S310 130, 400 80 S490 40, 560 60 S640 25, 700 35",
    expenseD: "M0 170 C95 160, 160 145, 250 150 S360 160, 440 135 S550 130, 630 140 S680 115, 700 125",
    point: { x: 560, y: 60 },
    labels: ["2025", "2026 H1", "2026 H2"],
  },
}

type SheetType =
  | null
  | "transfer"
  | "add_money"
  | "request"
  | "transaction_detail"
  | "notifications"
  | "currency"
  | "pin_view"
  | "limits"
  | "forgot_password"
  | "add_family_member"
  | "health_card"
  | "claim_desk"

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasCompletedFamilySetup, setHasCompletedFamilySetup] = useState(false)
  const [dbStatus, setDbStatus] = useState("Database Connecting...")
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signup")
  const [authEmail, setAuthEmail] = useState("")
  const [authPassword, setAuthPassword] = useState("")
  const [authName, setAuthName] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [authSuccess, setAuthSuccess] = useState(false)

  // Family Members for Health & Floater Insurance
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])

  // New member inputs for dashboard bottom sheet modal
  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberRelation, setNewMemberRelation] = useState("Spouse")
  const [newMemberAge, setNewMemberAge] = useState("")
  const [newMemberCover, setNewMemberCover] = useState("Health Floater ($500k)")

  const [activeNav, setActiveNav] = useState("Overview")
  const [balance, setBalance] = useState(0)
  const [currency, setCurrency] = useState("USD")
  const [period, setPeriod] = useState<PeriodType>("1M")
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [query, setQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState("")
  const [policyNumber, setPolicyNumber] = useState("")
  const [sumInsured, setSumInsured] = useState(500000)
  const [toast, setToast] = useState("")
  const [cardFrozen, setCardFrozen] = useState(false)
  const [cardPin] = useState("8429")
  const [monthlyLimit, setMonthlyLimit] = useState(5000)
  const [paymentType, setPaymentType] = useState("Send")
  const [notifications, setNotifications] = useState(true)
  const [biometrics, setBiometrics] = useState(true)
  const [activeSheet, setActiveSheet] = useState<SheetType>(null)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Initialize and restore active session from Database
  useEffect(() => {
    const session = db.getActiveSession()
    if (session && session.email) {
      setIsAuthenticated(true)
      setHasCompletedFamilySetup(session.hasCompletedFamilySetup)
      setUserName(session.name)
      setUserEmail(session.email)
      setBalance(session.balance)
      setCurrency(session.currency || "USD")
      setCardFrozen(session.cardFrozen || false)
      setMonthlyLimit(session.monthlyLimit || 5000)
      setNotifications(session.notifications ?? true)
      setBiometrics(session.biometrics ?? true)
      setPolicyNumber(session.policyNumber || "VB-FL-2026-7999")
      setSumInsured(session.sumInsured || 500000)
      if (session.familyMembers && session.familyMembers.length > 0) {
        setFamilyMembers(session.familyMembers)
      } else {
        setFamilyMembers([])
      }
      if (session.transactions && session.transactions.length > 0) {
        setTransactions(session.transactions as Transaction[])
      } else {
        setTransactions([])
      }
    } else {
      setIsAuthenticated(false)
      setHasCompletedFamilySetup(false)
      setFamilyMembers([])
      setTransactions([])
    }

    db.checkConnection().then((info) => {
      setDbStatus(
        info.status === "connected"
          ? "Database Live (data/db.json)"
          : "Persistent Storage",
      )
    })
  }, [])

  // Transfer form state
  const [actionAmount, setActionAmount] = useState("250.00")
  const [actionNote, setActionNote] = useState("")

  const carouselRef = useRef<HTMLDivElement>(null)

  const userFirstName = useMemo(() => {
    return userName.trim().split(" ")[0] || "User"
  }, [userName])

  const userInitials = useMemo(() => {
    return (
      userName
        .trim()
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0].toUpperCase())
        .slice(0, 2)
        .join("") || "U"
    )
  }, [userName])

  const pwdStrength = useMemo(() => {
    if (!authPassword) return 0
    let score = 0
    if (authPassword.length >= 6) score++
    if (authPassword.length >= 8 && /[0-9]/.test(authPassword)) score++
    if (/[A-Z]/.test(authPassword) || /[^A-Za-z0-9]/.test(authPassword)) score++
    return Math.min(score, 3)
  }, [authPassword])

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!authEmail) {
      notify("Please enter your email")
      return
    }
    setIsAuthLoading(true)
    try {
      const user = await db.login(authEmail, authPassword)
      setUserName(user.name)
      setUserEmail(user.email)
      setBalance(user.balance)
      setCurrency(user.currency || "USD")
      setCardFrozen(user.cardFrozen)
      setMonthlyLimit(user.monthlyLimit)
      setHasCompletedFamilySetup(user.hasCompletedFamilySetup)
      setPolicyNumber(user.policyNumber || "VB-FL-2026-7999")
      setSumInsured(user.sumInsured || 500000)
      if (user.familyMembers && user.familyMembers.length > 0) {
        setFamilyMembers(user.familyMembers)
      }
      if (user.transactions && user.transactions.length > 0) {
        setTransactions(user.transactions as Transaction[])
      }
      setIsAuthLoading(false)
      setIsAuthenticated(true)
      notify(`Welcome back, ${user.name}! (Loaded from DB)`)
    } catch (err: any) {
      setIsAuthLoading(false)
      notify(err.message || "Login failed")
    }
  }

  async function handleSignUp(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!authName || !authEmail) {
      notify("Please fill all required fields")
      return
    }
    setIsAuthLoading(true)
    try {
      const user = await db.register(authName, authEmail, authPassword)
      setUserName(user.name)
      setUserEmail(user.email)
      setBalance(user.balance)
      setCurrency(user.currency)
      setHasCompletedFamilySetup(false)
      setPolicyNumber(user.policyNumber || "VB-FL-2026-7999")
      setSumInsured(user.sumInsured || 500000)
      setIsAuthLoading(false)
      setIsAuthenticated(true)
      notify(`Account created & saved in DB! Welcome, ${user.name}!`)
    } catch (err: any) {
      setIsAuthLoading(false)
      notify(err.message || "Registration failed")
    }
  }

  async function handleFaceIdLogin() {
    if (!authEmail.trim()) {
      notify("Please enter your registered email address first")
      return
    }
    setIsAuthLoading(true)
    notify("Scanning Face ID...")
    try {
      const user = await db.login(authEmail, authPassword)
      setUserName(user.name)
      setUserEmail(user.email)
      setBalance(user.balance)
      setCurrency(user.currency || "USD")
      setHasCompletedFamilySetup(user.hasCompletedFamilySetup)
      setPolicyNumber(user.policyNumber || "VB-FL-2026-7999")
      setSumInsured(user.sumInsured || 500000)
      setFamilyMembers(user.familyMembers || [])
      setTransactions((user.transactions || []) as Transaction[])
      setTimeout(() => {
        setIsAuthLoading(false)
        setAuthSuccess(true)
        setTimeout(() => {
          setIsAuthenticated(true)
          setAuthSuccess(false)
          notify(`Face ID verified! Welcome back, ${user.name}!`)
        }, 500)
      }, 600)
    } catch {
      setIsAuthLoading(false)
      notify("Face ID login failed. Please register or check your credentials.")
    }
  }

  function addFamilyMemberRow() {
    setFamilyMembers((prev) => [
      ...prev,
      {
        id: `fam-${Date.now()}`,
        name: "",
        relation: "Child",
        age: "",
        coverType: "Health Floater ($500k)",
      },
    ])
  }

  function removeFamilyMemberRow(id: string) {
    const updated = familyMembers.filter((m) => m.id !== id)
    setFamilyMembers(updated)
    db.updateActiveUser({ familyMembers: updated })
  }

  function updateFamilyMemberRow(
    id: string,
    field: keyof FamilyMember,
    val: string,
  ) {
    const updated = familyMembers.map((m) => (m.id === id ? { ...m, [field]: val } : m))
    setFamilyMembers(updated)
  }

  function handleSaveFamilySetup(skip = false) {
    const validMembers = familyMembers.filter((m) => m.name.trim())
    setHasCompletedFamilySetup(true)
    // Persist in DB
    db.updateActiveUser({
      familyMembers: validMembers,
      hasCompletedFamilySetup: true,
    })
    if (skip) {
      notify("Family setup saved in DB. You can add members anytime from Overview!")
    } else {
      notify(
        validMembers.length > 0
          ? `Family Floater Protection saved in DB for ${validMembers.length + 1} members!`
          : `Protection saved in DB for ${userName}!`,
      )
    }
  }

  function handleAddMemberFromSheet() {
    if (!newMemberName.trim()) {
      notify("Please enter family member's name")
      return
    }
    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      name: newMemberName.trim(),
      relation: newMemberRelation,
      age: newMemberAge,
      coverType: newMemberCover,
    }
    const updated = [...familyMembers, newMember]
    setFamilyMembers(updated)
    setNewMemberName("")
    setActiveSheet(null)
    // Persist in DB
    db.updateActiveUser({ familyMembers: updated })
    notify(`${newMember.name} saved to Family Floater Policy in DB!`)
  }

  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }, [])

  const currentDateStr = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date())
  }, [])

  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + (Number(t.rawAmount) || 0), 0)
  }, [transactions])

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + (Number(t.rawAmount) || 0), 0)
  }, [transactions])

  const activeContacts = useMemo(() => {
    const valid = familyMembers.filter((m) => m && m.name && m.name.trim())
    const tones = ["green", "blue", "yellow", "purple", "orange"]
    return valid.map((m, idx) => ({
      id: m.id,
      name: m.name.trim(),
      initials:
        m.name
          .trim()
          .split(" ")
          .map((p) => p[0])
          .slice(0, 2)
          .join("")
          .toUpperCase() || m.name.slice(0, 2).toUpperCase(),
      tone: tones[idx % tones.length],
      relation: m.relation || "Family",
      age: m.age,
    }))
  }, [familyMembers])

  useEffect(() => {
    if (activeContacts.length > 0) {
      if (!selectedPerson || !activeContacts.find((c) => c.name === selectedPerson)) {
        setSelectedPerson(activeContacts[0].name)
      }
    } else {
      setSelectedPerson("")
    }
  }, [activeContacts])

  const pageTitles: Record<string, string> = {
    Overview: `${timeGreeting}, ${userFirstName}`,
    Cards: "Your cards & e-Health Pass",
    Payments: "Payments & Premiums",
    Analytics: "Insurance & Wealth Analytics",
    Settings: "Account & Policies",
  }

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, transactions],
  )

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(""), 2600)
  }

  function handleCarouselScroll() {
    if (!carouselRef.current) return
    const scrollLeft = carouselRef.current.scrollLeft
    const width = carouselRef.current.offsetWidth
    const index = Math.round(scrollLeft / width)
    setActiveCarouselIndex(Math.min(Math.max(index, 0), 2))
  }

  function scrollToCard(index: number) {
    if (!carouselRef.current) return
    const width = carouselRef.current.offsetWidth
    carouselRef.current.scrollTo({
      left: index * (width + 16),
      behavior: "smooth",
    })
    setActiveCarouselIndex(index)
  }

  function executeTransfer() {
    const amt = parseFloat(actionAmount) || 250
    if (amt > balance) {
      notify("Insufficient balance!")
      return
    }
    const newBal = balance - amt
    setBalance(newBal)
    const newTx: Transaction = {
      name: `Sent to ${selectedPerson}`,
      detail: `Transfer · Just now`,
      amount: `-$${amt.toFixed(2)}`,
      rawAmount: amt,
      kind: selectedPerson.charAt(0),
      tone: "purple",
      type: "expense",
      category: "Transfer",
      date: "Today",
    }
    const updated = [newTx, ...transactions]
    setTransactions(updated)
    setActiveSheet(null)
    // Persist in DB
    db.updateActiveUser({ balance: newBal, transactions: updated })
    notify(`$${amt.toFixed(2)} sent to ${selectedPerson}! (Saved in DB)`)
    setActionNote("")
  }

  function executeAddMoney() {
    const amt = parseFloat(actionAmount) || 500
    const newBal = balance + amt
    setBalance(newBal)
    const newTx: Transaction = {
      name: "Top-up Deposit",
      detail: "Add money · Just now",
      amount: `+$${amt.toFixed(2)}`,
      rawAmount: amt,
      kind: "+",
      tone: "green",
      type: "income",
      category: "Deposit",
      date: "Today",
    }
    const updated = [newTx, ...transactions]
    setTransactions(updated)
    setActiveSheet(null)
    // Persist in DB
    db.updateActiveUser({ balance: newBal, transactions: updated })
    notify(`$${amt.toFixed(2)} added! (Saved in DB)`)
  }

  function executeRequest() {
    const amt = parseFloat(actionAmount) || 100
    setActiveSheet(null)
    notify(`Payment request for $${amt.toFixed(2)} sent to ${selectedPerson}!`)
  }

  return (
    <div className="app-shell">
      <main
        className={`dashboard ${
          !isAuthenticated
            ? "auth-layout auth-screen-fit"
            : !hasCompletedFamilySetup
            ? "auth-layout onboarding-layout"
            : ""
        }`}
      >
        {/* Render Auth View when not logged in */}
        {!isAuthenticated ? (
          <div className="auth-wrapper">
            <div className="auth-hero">
              <div className="auth-brand-row">
                <div className="auth-logo-badge">
                  <span className="auth-logo-orbit" />
                  <img
                    src="/voicebrue-shield.png"
                    alt="VoiceBrue"
                    style={{ width: "26px", height: "30px", objectFit: "contain" }}
                  />
                </div>
                <div className="auth-brand-info">
                  <div className="auth-brand-name">
                    <span style={{ color: "#123a52" }}>Voice</span>
                    <span style={{ color: "#20a996" }}>Brue</span>
                  </div>
                  <div className="auth-tagline-kicker">INSURANCE, EXPLAINED</div>
                </div>
              </div>
              <div className="auth-tagline">
                Modern banking & family health insurance protection.
              </div>
            </div>

            {/* Segmented Switcher */}
            <div className="auth-tabs-container">
              <div
                className={`auth-tab-pill ${authTab === "signup" ? "signup" : ""}`}
              />
              <button
                type="button"
                className={`auth-tab-btn ${authTab === "signin" ? "active" : ""}`}
                onClick={() => setAuthTab("signin")}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${authTab === "signup" ? "active" : ""}`}
                onClick={() => setAuthTab("signup")}
              >
                Create Account
              </button>
            </div>

            {/* Auth Form Card */}
            <div className="auth-card">
              <form
                className="auth-form"
                onSubmit={authTab === "signin" ? handleLogin : handleSignUp}
              >
                {authTab === "signup" && (
                  <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <div className="input-field-wrap">
                      <span className="input-icon">
                        <Icon name="user" size={17} />
                      </span>
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Enter your full name"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <div className="input-field-wrap">
                    <span className="input-icon">
                      <Icon name="mail" size={17} />
                    </span>
                    <input
                      className="input-field"
                      type="email"
                      placeholder="name@example.com"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Password</label>
                  <div className="input-field-wrap">
                    <span className="input-icon">
                      <Icon name="lock" size={17} />
                    </span>
                    <input
                      className="input-field"
                      type={showPassword ? "text" : "password"}
                      placeholder={
                        authTab === "signup"
                          ? "Create a password (min 6 chars)"
                          : "Enter your password"
                      }
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-pwd-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      <Icon name={showPassword ? "eyeOff" : "eye"} size={17} />
                    </button>
                  </div>

                  {authTab === "signup" && (
                    <div className="pwd-strength-wrap">
                      <div className="pwd-strength-bars">
                        <div
                          className={`pwd-strength-seg ${
                            pwdStrength >= 1
                              ? pwdStrength === 1
                                ? "weak"
                                : pwdStrength === 2
                                ? "medium"
                                : "strong"
                              : ""
                          }`}
                        />
                        <div
                          className={`pwd-strength-seg ${
                            pwdStrength >= 2
                              ? pwdStrength === 2
                                ? "medium"
                                : "strong"
                              : ""
                          }`}
                        />
                        <div
                          className={`pwd-strength-seg ${
                            pwdStrength >= 3 ? "strong" : ""
                          }`}
                        />
                      </div>
                      <div className="pwd-strength-text">
                        <span>Security strength:</span>
                        <strong>
                          {pwdStrength === 0
                            ? "Too weak"
                            : pwdStrength === 1
                            ? "Weak"
                            : pwdStrength === 2
                            ? "Good"
                            : "Strong & Secure ✓"}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                {authTab === "signin" && (
                  <div className="auth-row-options">
                    <label className="remember-label">
                      <input
                        type="checkbox"
                        className="remember-checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span>Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="forgot-btn"
                      onClick={() => setActiveSheet("forgot_password")}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className={`auth-submit-btn ${isAuthLoading ? "loading" : ""}`}
                  disabled={isAuthLoading}
                >
                  {isAuthLoading ? (
                    <span className="auth-spinner" />
                  ) : authSuccess ? (
                    <span>✓ Verified! Welcome {authName || "User"}</span>
                  ) : authTab === "signin" ? (
                    <span>Sign In to VoiceBrue →</span>
                  ) : (
                    <span>Create Free Account →</span>
                  )}
                </button>

                <button
                  type="button"
                  className="biometric-box"
                  onClick={handleFaceIdLogin}
                >
                  <span className="biometric-scan-line" />
                  <Icon name="faceId" size={18} />
                  <span>Quick Face ID / Biometrics</span>
                </button>

                <div className="auth-divider">or continue with</div>

                <div className="social-grid">
                  <button
                    type="button"
                    className="social-btn"
                    onClick={() => {
                      setIsAuthLoading(true)
                      notify("Connecting to Google...")
                      setTimeout(() => {
                        setIsAuthLoading(false)
                        setIsAuthenticated(true)
                        notify(`Signed in via Google! Welcome ${userName}.`)
                      }, 600)
                    }}
                  >
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    className="social-btn"
                    onClick={() => {
                      setIsAuthLoading(true)
                      notify("Connecting to Apple...")
                      setTimeout(() => {
                        setIsAuthLoading(false)
                        setIsAuthenticated(true)
                        notify(`Signed in via Apple! Welcome ${userName}.`)
                      }, 600)
                    }}
                  >
                    <span>Apple</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : !hasCompletedFamilySetup ? (
          /* SIMPLE CLEAN ADD FAMILY MEMBERS ONBOARDING */
          <div className="family-onboarding">
            <div className="family-header">
              <div className="family-shield-icon">
                <Icon name="users" size={26} />
              </div>
              <h2 className="family-title">Add Family Members</h2>
              <p className="family-subtitle">
                Add your family members now, or skip and add anytime later.
              </p>
            </div>

            {/* Additional Family Members Section */}
            <div className="family-section-head">
              <strong>Family Members ({familyMembers.length})</strong>
              {familyMembers.length > 0 && (
                <button
                  type="button"
                  className="add-member-top-btn"
                  onClick={addFamilyMemberRow}
                >
                  <Icon name="plus" size={14} /> Add Member
                </button>
              )}
            </div>

            <div className="family-list">
              {familyMembers.length === 0 ? (
                <div className="family-empty-box">
                  <div className="family-empty-icon">
                    <Icon name="users" size={28} />
                  </div>
                  <h3>No family members added yet</h3>
                  <p>
                    You can add your family members now (spouse, child, parent) or skip and add anytime later.
                  </p>
                  <button
                    type="button"
                    className="add-family-btn"
                    onClick={addFamilyMemberRow}
                  >
                    <Icon name="plus" size={16} /> Add Family Member
                  </button>
                </div>
              ) : (
                familyMembers.map((member, idx) => (
                  <div className="member-item-card" key={member.id}>
                    <div className="member-card-header">
                      <span className="member-index-pill">Member #{idx + 1}</span>
                      <button
                        type="button"
                        className="remove-member-btn"
                        onClick={() => removeFamilyMemberRow(member.id)}
                        aria-label="Remove member"
                        title="Remove member"
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>

                    <div className="member-simple-inputs">
                      <div className="input-group">
                        <label className="input-label">Full Name</label>
                        <input
                          className="member-input"
                          type="text"
                          placeholder="Enter family member's name"
                          value={member.name}
                          onChange={(e) =>
                            updateFamilyMemberRow(member.id, "name", e.target.value)
                          }
                        />
                      </div>

                      <div className="member-grid-2">
                        <div className="input-group">
                          <label className="input-label">Relationship</label>
                          <select
                            className="member-select"
                            value={member.relation}
                            onChange={(e) =>
                              updateFamilyMemberRow(
                                member.id,
                                "relation",
                                e.target.value,
                              )
                            }
                          >
                            <option value="Spouse">Spouse</option>
                            <option value="Son">Son</option>
                            <option value="Daughter">Daughter</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="input-group">
                          <label className="input-label">Age</label>
                          <input
                            className="member-input"
                            type="number"
                            placeholder="Age"
                            value={member.age}
                            onChange={(e) =>
                              updateFamilyMemberRow(member.id, "age", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {familyMembers.length > 0 && (
                <button
                  type="button"
                  className="add-more-members-btn"
                  onClick={addFamilyMemberRow}
                >
                  <Icon name="plus" size={16} /> + Add Another Family Member
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="family-action-buttons">
              <button
                type="button"
                className="family-submit-btn"
                onClick={() => handleSaveFamilySetup(false)}
              >
                <span>{familyMembers.length > 0 ? "Save & Continue →" : "Continue →"}</span>
              </button>
              <button
                type="button"
                className="family-skip-btn"
                onClick={() => handleSaveFamilySetup(true)}
              >
                Skip for now / Add later
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Topbar Header */}
            <header className="topbar">
          <div className="brand-header">
            <div className="brand-mark" aria-hidden="true">
              <img
                src="/voicebrue-shield.png"
                alt="VoiceBrue"
              />
            </div>
            <div className="user-greeting">
              <div className="eyebrow">{currentDateStr}</div>
              <div className="page-title">{pageTitles[activeNav]}</div>
            </div>
          </div>
          <div className="top-actions">
            <button
              className="icon-button"
              aria-label="View notifications"
              onClick={() => setActiveSheet("notifications")}
            >
              <Icon name="bell" size={19} />
              <span className="notification-dot" />
            </button>
            <button
              className="mobile-avatar"
              aria-label="Open profile and settings"
              onClick={() => setActiveNav("Settings")}
            >
              {userInitials}
            </button>
          </div>
        </header>

        {/* OVERVIEW TAB */}
        {activeNav === "Overview" && (
          <div className="page-view">
            {/* Horizontal Swipe Carousel: Balance Card + Stat Cards */}
            <section
              className="overview-grid"
              ref={carouselRef}
              onScroll={handleCarouselScroll}
            >
              {/* Card 1: Balance Card */}
              <article className="balance-card">
                <span className="balance-orbit balance-orbit-a" />
                <span className="balance-orbit balance-orbit-b" />
                <div className="balance-top">
                  <div className="balance-label-group">
                    <span className="balance-label">Total balance</span>
                    <button
                      className="eye-button"
                      aria-label="Toggle balance visibility"
                      onClick={() => setBalanceVisible(!balanceVisible)}
                    >
                      <Icon name="eye" size={17} />
                    </button>
                  </div>
                  <button
                    className="currency-pill"
                    onClick={() => setActiveSheet("currency")}
                  >
                    {currency} <Icon name="chevron" size={13} />
                  </button>
                </div>

                <div className="balance-amount">
                  {balanceVisible
                    ? `$${balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "$••,•••.••"}
                </div>

                <div className="balance-change">
                  <span>+8.2%</span> from last month
                </div>

                <div className="balance-actions">
                  <button
                    onClick={() => {
                      setActionAmount("250.00")
                      setActiveSheet("transfer")
                    }}
                  >
                    <span>
                      <Icon name="arrowUp" size={17} />
                    </span>
                    Transfer
                  </button>
                  <button
                    onClick={() => {
                      setActionAmount("500.00")
                      setActiveSheet("add_money")
                    }}
                  >
                    <span>
                      <Icon name="plus" size={17} />
                    </span>
                    Add money
                  </button>
                  <button
                    onClick={() => {
                      setActionAmount("150.00")
                      setActiveSheet("request")
                    }}
                  >
                    <span>
                      <Icon name="arrowDown" size={17} />
                    </span>
                    Request
                  </button>
                </div>
              </article>

              {/* Card 2: Income Card */}
              <article className="stat-card">
                <div className="stat-head">
                  <div className="stat-icon income">
                    <Icon name="arrowDown" size={18} />
                  </div>
                  <button
                    aria-label="More options"
                    onClick={() =>
                      notify(
                        `Total income: $${totalIncome.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}`,
                      )
                    }
                  >
                    <Icon name="more" size={16} />
                  </button>
                </div>
                <div>
                  <div className="stat-label">Income</div>
                  <div className="stat-value">
                    $
                    {totalIncome.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <div className="stat-meta positive">
                  <span>From live transactions</span>
                </div>
              </article>

              {/* Card 3: Expenses Card */}
              <article className="stat-card">
                <div className="stat-head">
                  <div className="stat-icon expense">
                    <Icon name="arrowUp" size={18} />
                  </div>
                  <button
                    aria-label="More options"
                    onClick={() =>
                      notify(
                        `Total expenses: $${totalExpenses.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}`,
                      )
                    }
                  >
                    <Icon name="more" size={16} />
                  </button>
                </div>
                <div>
                  <div className="stat-label">Expenses</div>
                  <div className="stat-value">
                    $
                    {totalExpenses.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <div className="stat-meta negative">
                  <span>From live transactions</span>
                </div>
              </article>
            </section>

            {/* Carousel Dots Indicator */}
            <div className="carousel-dots">
              <button
                className={`dot ${activeCarouselIndex === 0 ? "active" : ""}`}
                onClick={() => scrollToCard(0)}
                aria-label="Scroll to Balance"
              />
              <button
                className={`dot ${activeCarouselIndex === 1 ? "active" : ""}`}
                onClick={() => scrollToCard(1)}
                aria-label="Scroll to Income"
              />
              <button
                className={`dot ${activeCarouselIndex === 2 ? "active" : ""}`}
                onClick={() => scrollToCard(2)}
                aria-label="Scroll to Expenses"
              />
            </div>

            {/* FAMILY INSURANCE PROTECTION PANEL */}
            <article className="insurance-dashboard-panel">
              <div className="insurance-panel-header">
                <div className="insurance-title-wrap">
                  <div className="insurance-icon-badge">
                    <Icon name="shield" size={20} />
                  </div>
                  <div>
                    <strong>Family Floater Protection</strong>
                    <span>
                      Policy #{policyNumber || "VB-FL-2026-7999"} · $
                      {sumInsured.toLocaleString("en-US")} Sum Insured
                    </span>
                  </div>
                </div>
                <div className="insurance-active-tag">
                  <Icon name="check" size={12} /> Active Cover
                </div>
              </div>

              {/* Insured Members Horizontal Pills */}
              <div className="insurance-members-scroll">
                <div className="insured-member-pill">
                  <div className="insured-member-avatar">{userInitials}</div>
                  <div className="insured-member-meta">
                    <strong>{userName}</strong>
                    <span>Self (Primary)</span>
                  </div>
                </div>

                {familyMembers
                  .filter((m) => m && m.name && m.name.trim())
                  .map((m) => (
                    <div className="insured-member-pill" key={m.id}>
                      <div
                        className="insured-member-avatar"
                        style={{ background: "var(--green-dark)", color: "#fff" }}
                      >
                        {m.name.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="insured-member-meta">
                        <strong>{m.name}</strong>
                        <span>
                          {m.relation} · Age {m.age || "—"}
                        </span>
                      </div>
                    </div>
                  ))}

                {familyMembers.filter((m) => m && m.name && m.name.trim()).length === 0 && (
                  <button
                    type="button"
                    className="insured-member-pill"
                    style={{
                      border: "1.5px dashed var(--green-dark)",
                      background: "rgba(32, 169, 150, 0.06)",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setNewMemberName("")
                      setActiveSheet("add_family_member")
                    }}
                  >
                    <div
                      className="insured-member-avatar"
                      style={{
                        background: "var(--green-dark)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name="plus" size={16} />
                    </div>
                    <div className="insured-member-meta">
                      <strong style={{ color: "var(--green-dark)" }}>+ Add Member</strong>
                      <span>No family added yet</span>
                    </div>
                  </button>
                )}
              </div>

              <div className="insurance-quick-actions">
                <button
                  type="button"
                  className="insurance-action-btn"
                  onClick={() => {
                    setNewMemberName("")
                    setActiveSheet("add_family_member")
                  }}
                >
                  <Icon name="plus" size={15} />
                  <span>+ Add Member</span>
                </button>
                <button
                  type="button"
                  className="insurance-action-btn"
                  onClick={() => setActiveSheet("health_card")}
                >
                  <Icon name="card" size={15} />
                  <span>Digital Health Card</span>
                </button>
              </div>
            </article>

            {/* Cash Flow Panel */}
            <article className="panel cashflow-panel">
              <div className="panel-heading">
                <div>
                  <div className="panel-title">Cash flow</div>
                  <div className="panel-subtitle">
                    Your income and spending activity
                  </div>
                </div>
                <div className="period-tabs">
                  {(["1W", "1M", "3M", "1Y"] as const).map((item) => (
                    <button
                      className={period === item ? "selected" : ""}
                      key={item}
                      onClick={() => setPeriod(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="chart-summary">
                <div>
                  <span className="legend-dot green" />
                  Income{" "}
                  <strong>
                    $
                    {totalIncome.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>
                <div>
                  <span className="legend-dot dark" />
                  Expenses{" "}
                  <strong>
                    $
                    {totalExpenses.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>
              </div>

              <div className="chart-area">
                <div className="y-labels">
                  <span>$4k</span>
                  <span>$3k</span>
                  <span>$2k</span>
                  <span>$1k</span>
                  <span>$0</span>
                </div>
                <div className="chart-plot">
                  <div className="grid-line line-1" />
                  <div className="grid-line line-2" />
                  <div className="grid-line line-3" />
                  <div className="grid-line line-4" />
                  <div className="grid-line line-5" />
                  <svg
                    viewBox="0 0 700 210"
                    preserveAspectRatio="none"
                    aria-label="Cash flow curve chart"
                  >
                    <defs>
                      <linearGradient
                        id="incomeFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--green)"
                          stopOpacity=".26"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--green)"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      className="area-fill"
                      d={cashFlowData[period].areaD}
                    />
                    <path
                      className="income-line"
                      d={cashFlowData[period].incomeD}
                    />
                    <path
                      className="expense-line"
                      d={cashFlowData[period].expenseD}
                    />
                    <circle
                      cx={cashFlowData[period].point.x}
                      cy={cashFlowData[period].point.y}
                      r="5.5"
                      className="chart-point"
                    />
                  </svg>
                  <div className="x-labels">
                    <span>{cashFlowData[period].labels[0]}</span>
                    <span>{cashFlowData[period].labels[1]}</span>
                    <span>{cashFlowData[period].labels[2]}</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Recent Transactions Panel */}
            <article className="panel transactions-panel">
              <div className="panel-heading">
                <div>
                  <div className="panel-title">Recent transactions</div>
                  <div className="panel-subtitle">
                    {filteredTransactions.length} transactions found
                  </div>
                </div>
                <button
                  className="text-button"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  {showSearch ? "Close search" : "View all"}{" "}
                  <Icon name="chevron" size={14} />
                </button>
              </div>

              {showSearch && (
                <div className="mobile-search-bar">
                  <Icon name="search" size={16} />
                  <input
                    placeholder="Search by merchant or category..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                  {query && (
                    <button className="clear-btn" onClick={() => setQuery("")}>
                      ×
                    </button>
                  )}
                </div>
              )}

              <div className="transaction-list">
                {filteredTransactions.map((item) => (
                  <button
                    className="transaction-row"
                    key={item.name + item.amount}
                    onClick={() => {
                      setSelectedTransaction(item)
                      setActiveSheet("transaction_detail")
                    }}
                  >
                    <span className={`merchant-logo ${item.tone}`}>
                      {item.kind}
                    </span>
                    <span className="transaction-copy">
                      <strong>{item.name}</strong>
                      <span>{item.detail}</span>
                    </span>
                    <span className={`transaction-amount ${item.type}`}>
                      {item.amount}
                    </span>
                    <Icon name="chevron" size={15} />
                  </button>
                ))}
                {filteredTransactions.length === 0 && (
                  <div className="empty-state">
                    No transactions match “{query}”
                  </div>
                )}
              </div>
            </article>

            {/* Quick Send Panel */}
            <article className="panel quick-send">
              <div className="panel-heading compact">
                <div>
                  <div className="panel-title">Quick send</div>
                  <div className="panel-subtitle">Send to family in seconds</div>
                </div>
                <button
                  className="add-contact"
                  aria-label="Add family member"
                  onClick={() => {
                    setNewMemberName("")
                    setActiveSheet("add_family_member")
                  }}
                  title="Add family member"
                >
                  <Icon name="plus" size={17} />
                </button>
              </div>

              {activeContacts.length > 0 ? (
                <>
                  <div className="people-row">
                    {activeContacts.map((person) => (
                      <button
                        className={`person ${
                          selectedPerson === person.name ? "selected" : ""
                        }`}
                        key={person.id}
                        onClick={() => setSelectedPerson(person.name)}
                      >
                        <span className={`avatar ${person.tone}`}>
                          {person.initials}
                        </span>
                        <span>{person.name.split(" ")[0]}</span>
                      </button>
                    ))}
                    <button
                      className="person"
                      onClick={() => {
                        setNewMemberName("")
                        setActiveSheet("add_family_member")
                      }}
                      title="Add another member"
                    >
                      <span
                        className="avatar"
                        style={{
                          background: "rgba(32, 169, 150, 0.12)",
                          color: "var(--green-dark)",
                          border: "1.5px dashed var(--green-dark)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon name="plus" size={16} />
                      </span>
                      <span>+ Add</span>
                    </button>
                  </div>
                  <div className="send-box">
                    <div>
                      <span>Amount</span>
                      <strong>$250.00</strong>
                    </div>
                    <span className="send-currency">
                      USD <Icon name="chevron" size={13} />
                    </span>
                  </div>
                  <button
                    className="send-button"
                    onClick={() => {
                      setActionAmount("250.00")
                      setActiveSheet("transfer")
                    }}
                  >
                    Send to {selectedPerson || "Family Member"}{" "}
                    <Icon name="send" size={16} />
                  </button>
                </>
              ) : (
                <div
                  style={{
                    padding: "24px 16px",
                    textAlign: "center",
                    background: "#f8faf9",
                    borderRadius: 16,
                    border: "1px dashed var(--line)",
                    marginTop: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--text-main)",
                    }}
                  >
                    No family members added yet
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--muted)",
                      margin: "4px 0 16px",
                    }}
                  >
                    Add your family members to quickly transfer money to them.
                  </div>
                  <button
                    type="button"
                    style={{
                      background: "var(--green-dark)",
                      color: "#fff",
                      border: "none",
                      padding: "9px 20px",
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    onClick={() => {
                      setNewMemberName("")
                      setActiveSheet("add_family_member")
                    }}
                  >
                    <Icon name="plus" size={15} />
                    <span>+ Add Member</span>
                  </button>
                </div>
              )}
            </article>
          </div>
        )}

        {/* CARDS TAB */}
        {activeNav === "Cards" && (
          <div className="page-view">
            <div className="page-intro">
              <div className="section-kicker">Card management</div>
              <div className="section-title">Everything your wallet needs</div>
              <div className="section-copy">
                Manage limits, security, and card details from one place.
              </div>
            </div>

            <div className="cards-page-grid">
              <div className="card-showcase">
                <article
                  className={`large-bank-card ${cardFrozen ? "frozen" : ""}`}
                >
                  <div className="card-top">
                    <div className="card-brand">
                      <div className="brand-mark small">
                        <img
                          src="/voicebrue-shield.png"
                          alt="VoiceBrue"
                        />
                      </div>
                      VoiceBrue
                    </div>
                    <span className="contactless">)))</span>
                  </div>
                  <div className="showcase-chip" />
                  <div className="showcase-number">
                    5423&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;7876
                  </div>
                  <div className="card-bottom">
                    <div>
                      <span>Card holder</span>
                      <strong>{userName}</strong>
                    </div>
                    <div>
                      <span>Expires</span>
                      <strong>12/28</strong>
                    </div>
                    <div className="mastercard">
                      <i />
                      <i />
                    </div>
                  </div>
                  <span className="card-orbit card-orbit-one" />
                  <span className="card-orbit card-orbit-two" />
                  {cardFrozen && (
                    <div className="frozen-label">Card frozen</div>
                  )}
                </article>
                <div className="card-dots">
                  <span className="active" />
                  <span />
                </div>
              </div>

              <article className="panel card-controls">
                <div className="panel-title">Card controls</div>
                <div className="control-list">
                  <button
                    onClick={() => {
                      const next = !cardFrozen
                      setCardFrozen(next)
                      db.updateActiveUser({ cardFrozen: next })
                      notify(next ? "Card frozen (Saved in DB)" : "Card is active (Saved in DB)")
                    }}
                  >
                    <span className="control-icon">
                      <Icon name="card" size={18} />
                    </span>
                    <span>
                      <strong>
                        {cardFrozen ? "Unfreeze card" : "Freeze card"}
                      </strong>
                      <small>Temporarily disable purchases</small>
                    </span>
                    <span className={`switch ${cardFrozen ? "on" : ""}`}>
                      <i />
                    </span>
                  </button>

                  <button onClick={() => setActiveSheet("pin_view")}>
                    <span className="control-icon">
                      <Icon name="eye" size={18} />
                    </span>
                    <span>
                      <strong>View PIN</strong>
                      <small>Securely reveal your card PIN</small>
                    </span>
                    <Icon name="chevron" size={16} />
                  </button>

                  <button onClick={() => setActiveSheet("limits")}>
                    <span className="control-icon">
                      <Icon name="chart" size={18} />
                    </span>
                    <span>
                      <strong>Spending limits</strong>
                      <small>
                        ${monthlyLimit.toLocaleString("en-US")} monthly limit
                      </small>
                    </span>
                    <Icon name="chevron" size={16} />
                  </button>
                </div>
              </article>

              <article className="panel card-activity">
                <div className="panel-heading">
                  <div>
                    <div className="panel-title">Card activity</div>
                    <div className="panel-subtitle">
                      Latest purchases on •••• 7876
                    </div>
                  </div>
                </div>
                <div className="transaction-list">
                  {transactions.slice(0, 4).map((item) => (
                    <button
                      className="transaction-row"
                      key={item.name}
                      onClick={() => {
                        setSelectedTransaction(item)
                        setActiveSheet("transaction_detail")
                      }}
                    >
                      <span className={`merchant-logo ${item.tone}`}>
                        {item.kind}
                      </span>
                      <span className="transaction-copy">
                        <strong>{item.name}</strong>
                        <span>{item.detail}</span>
                      </span>
                      <span className={`transaction-amount ${item.type}`}>
                        {item.amount}
                      </span>
                      <Icon name="chevron" size={15} />
                    </button>
                  ))}
                </div>
              </article>
            </div>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {activeNav === "Payments" && (
          <div className="page-view">
            <div className="page-intro">
              <div className="section-kicker">Move money</div>
              <div className="section-title">Fast, simple payments</div>
              <div className="section-copy">
                Send, request, or schedule money securely with zero fees.
              </div>
            </div>

            <div className="payments-grid">
              <article className="panel payment-builder">
                <div className="segmented-control">
                  {(["Send", "Request", "Schedule"] as const).map((item) => (
                    <button
                      className={paymentType === item ? "active" : ""}
                      key={item}
                      onClick={() => setPaymentType(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="payment-heading">{paymentType} money</div>
                <div className="payment-subheading">
                  Choose a recent contact or enter new details.
                </div>

                <div className="payment-people">
                  {activeContacts.map((person) => (
                    <button
                      className={`person ${
                        selectedPerson === person.name ? "selected" : ""
                      }`}
                      key={person.id}
                      onClick={() => setSelectedPerson(person.name)}
                    >
                      <span className={`avatar ${person.tone}`}>
                        {person.initials}
                      </span>
                      <span>{person.name.split(" ")[0]}</span>
                    </button>
                  ))}
                  <button
                    className="person"
                    onClick={() => {
                      setNewMemberName("")
                      setActiveSheet("add_family_member")
                    }}
                  >
                    <span className="avatar add-person">
                      <Icon name="plus" size={18} />
                    </span>
                    <span>+ Add</span>
                  </button>
                </div>

                <label className="field-label">Amount</label>
                <div className="large-amount">
                  <span>$</span>
                  <input
                    type="number"
                    value={actionAmount}
                    onChange={(e) => setActionAmount(e.target.value)}
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      fontSize: 26,
                      fontWeight: 800,
                      width: "100%",
                    }}
                  />
                  <button onClick={() => setActiveSheet("currency")}>
                    {currency} <Icon name="chevron" size={13} />
                  </button>
                </div>

                {/* Quick amount chips */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 10,
                  }}
                >
                  {["50", "100", "250", "500"].map((amt) => (
                    <button
                      key={amt}
                      style={{
                        border: "1px solid var(--line)",
                        borderRadius: 10,
                        padding: "6px 12px",
                        fontSize: 10,
                        fontWeight: 700,
                        background:
                          actionAmount === amt ? "var(--green)" : "white",
                        color: actionAmount === amt ? "white" : "var(--ink)",
                      }}
                      onClick={() => setActionAmount(amt)}
                    >
                      +${amt}
                    </button>
                  ))}
                </div>

                <label className="field-label">Note</label>
                <input
                  className="note-input"
                  placeholder="What's this for? (optional)"
                  value={actionNote}
                  onChange={(e) => setActionNote(e.target.value)}
                />

                <button
                  className="send-button payment-submit"
                  onClick={
                    paymentType === "Send"
                      ? executeTransfer
                      : paymentType === "Request"
                        ? executeRequest
                        : () => notify("Payment scheduled successfully!")
                  }
                >
                  {paymentType} to {selectedPerson}{" "}
                  <Icon name="chevron" size={16} />
                </button>
              </article>

              <div className="payment-side">
                <article className="panel recipient-card">
                  {selectedPerson ? (
                    <>
                      <div
                        className={`avatar ${
                          activeContacts.find((p) => p.name === selectedPerson)?.tone || "green"
                        }`}
                      >
                        {
                          activeContacts.find((p) => p.name === selectedPerson)
                            ?.initials || selectedPerson.slice(0, 2).toUpperCase()
                        }
                      </div>
                      <div>
                        <strong>{selectedPerson}</strong>
                        <span>
                          {activeContacts.find((p) => p.name === selectedPerson)
                            ?.relation
                            ? `${activeContacts.find((p) => p.name === selectedPerson)?.relation} · Covered`
                            : "Family Member"}
                        </span>
                      </div>
                      <span className="verified">✓</span>
                    </>
                  ) : (
                    <div style={{ padding: "8px 0", color: "var(--muted)", fontSize: 13 }}>
                      No recipient selected. Click "+ Add" to include a family member.
                    </div>
                  )}
                </article>

                <article className="panel payment-summary">
                  <div className="panel-title">Payment summary</div>
                  <div className="summary-row">
                    <span>Amount</span>
                    <strong>${parseFloat(actionAmount || "0").toFixed(2)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Transfer fee</span>
                    <strong className="positive">Free (0.00)</strong>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <strong>
                      ${parseFloat(actionAmount || "0").toFixed(2)}
                    </strong>
                  </div>
                  <div className="secure-note">
                    Protected by VoiceBrue Instant Transfer
                  </div>
                </article>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeNav === "Analytics" && (
          <div className="page-view">
            <div className="page-intro">
              <div className="section-kicker">Financial insights</div>
              <div className="section-title">Know where your money goes</div>
              <div className="section-copy">
                Your spending is 2.1% lower than last month.
              </div>
            </div>

            <div className="analytics-stats">
              <article className="panel insight-stat">
                <span>Net income</span>
                <strong>$5,291.40</strong>
                <small className="positive">↑ 14.8%</small>
              </article>
              <article className="panel insight-stat">
                <span>Avg daily spend</span>
                <strong>$104.29</strong>
                <small className="negative">↑ 3.2%</small>
              </article>
              <article className="panel insight-stat">
                <span>Savings rate</span>
                <strong>38.6%</strong>
                <small className="positive">↑ 5.4%</small>
              </article>
            </div>

            <div className="analytics-grid">
              <article className="panel analytics-chart">
                <div className="panel-heading">
                  <div>
                    <div className="panel-title">Spending overview</div>
                    <div className="panel-subtitle">Last six months</div>
                  </div>
                </div>
                <div className="bar-chart">
                  {[58, 73, 49, 82, 66, 42].map((height, index) => (
                    <div className="bar-column" key={index}>
                      <div>
                        <span style={{ height: `${height}%` }} />
                      </div>
                      <small>
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
                      </small>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel category-panel">
                <div className="panel-title">Top categories</div>
                <div className="donut">
                  <div>
                    <strong>$3,128</strong>
                    <span>Total spent</span>
                  </div>
                </div>
                <div className="category-list">
                  <div>
                    <span>
                      <i className="cat-dot shopping" />
                      Shopping
                    </span>
                    <strong>36% ($1,126)</strong>
                  </div>
                  <div>
                    <span>
                      <i className="cat-dot food" />
                      Food & drinks
                    </span>
                    <strong>28% ($876)</strong>
                  </div>
                  <div>
                    <span>
                      <i className="cat-dot bills" />
                      Bills
                    </span>
                    <strong>21% ($657)</strong>
                  </div>
                  <div>
                    <span>
                      <i className="cat-dot other" />
                      Other
                    </span>
                    <strong>15% ($469)</strong>
                  </div>
                </div>
              </article>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeNav === "Settings" && (
          <div className="page-view">
            <div className="page-intro">
              <div className="section-kicker">Account preferences</div>
              <div className="section-title">Make VoiceBrue yours</div>
              <div className="section-copy">
                Update your profile, security, and notification settings.
              </div>
            </div>

            <div className="settings-grid">
              <article className="panel settings-profile">
                <div className="settings-avatar">
                  {userInitials}
                  <button onClick={() => notify("Photo updated!")}>
                    <Icon name="plus" size={14} />
                  </button>
                </div>
                <div>
                  <strong>{userName}</strong>
                  <span>{userEmail} · Primary Policyholder</span>
                </div>
              </article>

              <article className="panel settings-panel">
                <div className="settings-group-title">Insurance & Security</div>

                <button
                  className="setting-row"
                  onClick={() => {
                    setNewMemberName("")
                    setActiveSheet("add_family_member")
                  }}
                >
                  <span className="control-icon">
                    <Icon name="shield" size={18} />
                  </span>
                  <span>
                    <strong>Family Insurance Cover</strong>
                    <small>
                      {familyMembers.filter((m) => m.name.trim()).length + 1}{" "}
                      family members covered
                    </small>
                  </span>
                  <Icon name="chevron" size={16} />
                </button>

                <button
                  className="setting-row"
                  onClick={() => {
                    const next = !biometrics
                    setBiometrics(next)
                    db.updateActiveUser({ biometrics: next })
                    notify(
                      next
                        ? "Face ID login enabled"
                        : "Biometric login disabled",
                    )
                  }}
                >
                  <span className="control-icon">
                    <Icon name="eye" size={18} />
                  </span>
                  <span>
                    <strong>Biometric login</strong>
                    <small>Use Face ID / Touch ID to sign in</small>
                  </span>
                  <span className={`switch ${biometrics ? "on" : ""}`}>
                    <i />
                  </span>
                </button>

                <button
                  className="setting-row"
                  onClick={() => {
                    const next = !notifications
                    setNotifications(next)
                    db.updateActiveUser({ notifications: next })
                    notify(
                      next
                        ? "Push notifications active"
                        : "Notifications muted",
                    )
                  }}
                >
                  <span className="control-icon">
                    <Icon name="bell" size={18} />
                  </span>
                  <span>
                    <strong>Push notifications</strong>
                    <small>Transactions, alerts, and security</small>
                  </span>
                  <span className={`switch ${notifications ? "on" : ""}`}>
                    <i />
                  </span>
                </button>

                <button
                  className="setting-row"
                  onClick={() => setActiveSheet("currency")}
                >
                  <span className="control-icon">
                    <Icon name="wallet" size={18} />
                  </span>
                  <span>
                    <strong>Primary Currency</strong>
                    <small>Currently {currency}</small>
                  </span>
                  <Icon name="chevron" size={16} />
                </button>

                <button
                  className="setting-row"
                  onClick={() => {
                    db.logout()
                    setIsAuthenticated(false)
                    setHasCompletedFamilySetup(false)
                    setAuthEmail("")
                    setAuthPassword("")
                    setAuthName("")
                    setUserName("")
                    setUserEmail("")
                    setFamilyMembers([])
                    setTransactions([])
                    setActiveNav("Overview")
                    notify("You have signed out safely")
                  }}
                >
                  <span className="control-icon danger-icon">
                    <Icon name="logout" size={18} />
                  </span>
                  <span>
                    <strong>Sign out</strong>
                    <small>Sign out of this device</small>
                  </span>
                  <Icon name="chevron" size={16} />
                </button>
              </article>

              {/* DATABASE STORAGE STATUS CARD */}
              <article
                className="panel"
                style={{
                  border: "1px solid rgba(53, 190, 75, 0.4)",
                  background: "#f9fcf9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "var(--green-soft)",
                      color: "var(--green-dark)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon name="database" size={18} />
                  </div>
                  <div>
                    <strong
                      style={{
                        fontSize: 13,
                        color: "var(--ink)",
                        display: "block",
                      }}
                    >
                      Persistent Database Active
                    </strong>
                    <span style={{ fontSize: 10, color: "var(--muted)" }}>
                      Storage File: data/db.json
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--muted)",
                    lineHeight: 1.5,
                    marginBottom: 10,
                  }}
                >
                  All accounts, family insurance members, balance, and transaction history are automatically saved to permanent database storage.
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 10,
                    borderTop: "1px solid var(--line)",
                    paddingTop: 8,
                  }}
                >
                  <span style={{ color: "var(--green-dark)", fontWeight: 700 }}>
                    ● {dbStatus}
                  </span>
                  <button
                    type="button"
                    style={{
                      border: 0,
                      background: "transparent",
                      color: "var(--green-dark)",
                      fontWeight: 800,
                      fontSize: 10,
                    }}
                    onClick={() => {
                      db.checkConnection().then((info) => {
                        notify(
                          `Database verified! ${info.totalUsers} registered account(s).`,
                        )
                      })
                    }}
                  >
                    Verify Sync ↻
                  </button>
                </div>
              </article>
            </div>
          </div>
        )}

        {/* Fixed Mobile Bottom Navigation Bar */}
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <button
            className={activeNav === "Overview" ? "active" : ""}
            onClick={() => setActiveNav("Overview")}
          >
            <Icon name="home" size={20} />
            <span>Overview</span>
          </button>
          <button
            className={activeNav === "Cards" ? "active" : ""}
            onClick={() => setActiveNav("Cards")}
          >
            <Icon name="card" size={20} />
            <span>Cards</span>
          </button>
          <button
            className={activeNav === "Payments" ? "active" : ""}
            onClick={() => setActiveNav("Payments")}
          >
            <Icon name="transfer" size={20} />
            <span>Payments</span>
          </button>
          <button
            className={activeNav === "Analytics" ? "active" : ""}
            onClick={() => setActiveNav("Analytics")}
          >
            <Icon name="chart" size={20} />
            <span>Analytics</span>
          </button>
        </nav>
          </>
        )}

        {/* Toast Alert */}
        {toast && (
          <div className="toast">
            <span>✓</span>
            {toast}
          </div>
        )}

        {/* BOTTOM SHEET MODALS */}
        {activeSheet && (
          <>
            <div
              className="sheet-backdrop"
              onClick={() => setActiveSheet(null)}
            />
            <div className="sheet-drawer">
              <div className="sheet-handle" />

              {/* TRANSFER SHEET */}
              {activeSheet === "transfer" && (
                <div>
                  <div className="sheet-header">
                    <div className="sheet-title">Transfer Money</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="payment-people" style={{ margin: "10px 0" }}>
                    {activeContacts.map((person) => (
                      <button
                        className={`person ${
                          selectedPerson === person.name ? "selected" : ""
                        }`}
                        key={person.id}
                        onClick={() => setSelectedPerson(person.name)}
                      >
                        <span className={`avatar ${person.tone}`}>
                          {person.initials}
                        </span>
                        <span>{person.name.split(" ")[0]}</span>
                      </button>
                    ))}
                    <button
                      className="person"
                      onClick={() => {
                        setNewMemberName("")
                        setActiveSheet("add_family_member")
                      }}
                    >
                      <span className="avatar add-person">
                        <Icon name="plus" size={18} />
                      </span>
                      <span>+ Add</span>
                    </button>
                  </div>

                  <label className="field-label">Amount</label>
                  <div className="large-amount">
                    <span>$</span>
                    <input
                      type="number"
                      value={actionAmount}
                      onChange={(e) => setActionAmount(e.target.value)}
                      style={{
                        border: 0,
                        outline: 0,
                        background: "transparent",
                        fontSize: 26,
                        fontWeight: 800,
                        width: "100%",
                      }}
                    />
                    <button onClick={() => setActiveSheet("currency")}>
                      {currency}
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    {["50", "100", "250", "500"].map((amt) => (
                      <button
                        key={amt}
                        style={{
                          border: "1px solid var(--line)",
                          borderRadius: 10,
                          padding: "6px 12px",
                          fontSize: 10,
                          fontWeight: 700,
                          background:
                            actionAmount === amt ? "var(--green)" : "white",
                          color: actionAmount === amt ? "white" : "var(--ink)",
                        }}
                        onClick={() => setActionAmount(amt)}
                      >
                        +${amt}
                      </button>
                    ))}
                  </div>

                  <label className="field-label">Note</label>
                  <input
                    className="note-input"
                    placeholder="For dinner, rent, etc."
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                  />

                  <button
                    className="send-button"
                    style={{ marginTop: 20 }}
                    onClick={executeTransfer}
                  >
                    Confirm Transfer of ${actionAmount} to {selectedPerson}
                  </button>
                </div>
              )}

              {/* ADD MONEY SHEET */}
              {activeSheet === "add_money" && (
                <div>
                  <div className="sheet-header">
                    <div className="sheet-title">Add Money</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="control-list" style={{ marginTop: 0 }}>
                    <button
                      style={{ padding: "12px 0" }}
                      onClick={() => {
                        setActionAmount("500.00")
                        executeAddMoney()
                      }}
                    >
                      <span className="control-icon">
                        <Icon name="card" size={18} />
                      </span>
                      <span>
                        <strong>Instant Debit Card (•••• 4129)</strong>
                        <small>No fees · Instant delivery</small>
                      </span>
                      <Icon name="chevron" size={16} />
                    </button>
                    <button
                      style={{ padding: "12px 0" }}
                      onClick={() => {
                        setActionAmount("1000.00")
                        executeAddMoney()
                      }}
                    >
                      <span className="control-icon">
                        <Icon name="wallet" size={18} />
                      </span>
                      <span>
                        <strong>Apple Pay / Google Pay</strong>
                        <small>One-tap deposit</small>
                      </span>
                      <Icon name="chevron" size={16} />
                    </button>
                    <button
                      style={{ padding: "12px 0" }}
                      onClick={() => {
                        setActionAmount("250.00")
                        executeAddMoney()
                      }}
                    >
                      <span className="control-icon">
                        <Icon name="home" size={18} />
                      </span>
                      <span>
                        <strong>Bank Transfer (ACH)</strong>
                        <small>Chase Checking •••• 9102</small>
                      </span>
                      <Icon name="chevron" size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* REQUEST MONEY SHEET */}
              {activeSheet === "request" && (
                <div>
                  <div className="sheet-header">
                    <div className="sheet-title">Request Payment</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="payment-people" style={{ margin: "10px 0" }}>
                    {activeContacts.map((person) => (
                      <button
                        className={`person ${
                          selectedPerson === person.name ? "selected" : ""
                        }`}
                        key={person.id}
                        onClick={() => setSelectedPerson(person.name)}
                      >
                        <span className={`avatar ${person.tone}`}>
                          {person.initials}
                        </span>
                        <span>{person.name.split(" ")[0]}</span>
                      </button>
                    ))}
                    <button
                      className="person"
                      onClick={() => {
                        setNewMemberName("")
                        setActiveSheet("add_family_member")
                      }}
                    >
                      <span className="avatar add-person">
                        <Icon name="plus" size={18} />
                      </span>
                      <span>+ Add</span>
                    </button>
                  </div>

                  <label className="field-label">Request Amount</label>
                  <div className="large-amount">
                    <span>$</span>
                    <input
                      type="number"
                      value={actionAmount}
                      onChange={(e) => setActionAmount(e.target.value)}
                      style={{
                        border: 0,
                        outline: 0,
                        background: "transparent",
                        fontSize: 26,
                        fontWeight: 800,
                        width: "100%",
                      }}
                    />
                  </div>

                  <button
                    className="send-button"
                    style={{ marginTop: 20 }}
                    onClick={executeRequest}
                  >
                    Send Request to {selectedPerson}
                  </button>
                </div>
              )}

              {/* TRANSACTION DETAIL SHEET */}
              {activeSheet === "transaction_detail" && selectedTransaction && (
                <div>
                  <div className="sheet-header">
                    <div className="sheet-title">Transaction Details</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      padding: "12px 0 20px",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <div
                      className={`merchant-logo ${selectedTransaction.tone}`}
                      style={{
                        width: 54,
                        height: 54,
                        fontSize: 18,
                        margin: "0 auto 12px",
                      }}
                    >
                      {selectedTransaction.kind}
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 800 }}>
                      {selectedTransaction.amount}
                    </div>
                    <div
                      style={{
                        color: "var(--muted)",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {selectedTransaction.name}
                    </div>
                  </div>

                  <div className="summary-row" style={{ marginTop: 14 }}>
                    <span>Status</span>
                    <strong className="positive">✓ Completed</strong>
                  </div>
                  <div className="summary-row">
                    <span>Date & Time</span>
                    <strong>{selectedTransaction.date} · 11:42 AM</strong>
                  </div>
                  <div className="summary-row">
                    <span>Category</span>
                    <strong>{selectedTransaction.category}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Payment Method</span>
                    <strong>VoiceBrue Card •••• 7876</strong>
                  </div>
                  <div className="summary-row">
                    <span>Transfer Fee</span>
                    <strong className="positive">Free ($0.00)</strong>
                  </div>

                  <button
                    className="send-button"
                    style={{ marginTop: 20 }}
                    onClick={() => {
                      notify("Receipt downloaded to phone")
                      setActiveSheet(null)
                    }}
                  >
                    Download Receipt PDF
                  </button>
                </div>
              )}

              {/* NOTIFICATIONS SHEET */}
              {activeSheet === "notifications" && (
                <div>
                  <div className="sheet-header">
                    <div className="sheet-title">Notifications</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="control-list" style={{ marginTop: 0 }}>
                    <div
                      style={{
                        padding: "12px 0",
                        borderBottom: "1px solid var(--line)",
                      }}
                    >
                      <strong style={{ fontSize: 12 }}>
                        Salary deposited (+$4,250.00)
                      </strong>
                      <div
                        style={{
                          color: "var(--muted)",
                          fontSize: 10,
                          marginTop: 3,
                        }}
                      >
                        Payroll deposit from Acme Corp cleared.
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "12px 0",
                        borderBottom: "1px solid var(--line)",
                      }}
                    >
                      <strong style={{ fontSize: 12 }}>
                        Card statement ready
                      </strong>
                      <div
                        style={{
                          color: "var(--muted)",
                          fontSize: 10,
                          marginTop: 3,
                        }}
                      >
                        Your monthly statement for May is ready to view.
                      </div>
                    </div>
                    <div style={{ padding: "12px 0" }}>
                      <strong style={{ fontSize: 12 }}>
                        Security verification
                      </strong>
                      <div
                        style={{
                          color: "var(--muted)",
                          fontSize: 10,
                          marginTop: 3,
                        }}
                      >
                        New login from iPhone 15 Pro, Dallas, TX.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PIN VIEW SHEET */}
              {activeSheet === "pin_view" && (
                <div style={{ textAlign: "center" }}>
                  <div className="sheet-header">
                    <div className="sheet-title">Your Card PIN</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <div
                    style={{
                      margin: "24px 0",
                      display: "flex",
                      justifyContent: "center",
                      gap: 14,
                    }}
                  >
                    {cardPin.split("").map((digit, idx) => (
                      <span
                        key={idx}
                        style={{
                          width: 48,
                          height: 56,
                          borderRadius: 14,
                          background: "var(--green-soft)",
                          color: "var(--green-dark)",
                          fontSize: 24,
                          fontWeight: 800,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        {digit}
                      </span>
                    ))}
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: 11 }}>
                    Keep this PIN confidential. Do not share it with anyone.
                  </p>
                  <button
                    className="send-button"
                    style={{ marginTop: 22 }}
                    onClick={() => setActiveSheet(null)}
                  >
                    Done
                  </button>
                </div>
              )}

              {/* SPENDING LIMITS SHEET */}
              {activeSheet === "limits" && (
                <div>
                  <div className="sheet-header">
                    <div className="sheet-title">Monthly Spending Limit</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: 28,
                      fontWeight: 800,
                      margin: "18px 0 8px",
                    }}
                  >
                    ${monthlyLimit.toLocaleString("en-US")}
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      color: "var(--muted)",
                      fontSize: 11,
                      marginBottom: 20,
                    }}
                  >
                    Drag to adjust your monthly virtual card limit
                  </p>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="500"
                    value={monthlyLimit}
                    onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--green)" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "var(--muted)",
                      fontSize: 10,
                      marginTop: 8,
                    }}
                  >
                    <span>$1,000</span>
                    <span>$10,000</span>
                  </div>
                  <button
                    className="send-button"
                    style={{ marginTop: 24 }}
                    onClick={() => {
                      db.updateActiveUser({ monthlyLimit })
                      notify(
                        `Limit updated to $${monthlyLimit.toLocaleString(
                          "en-US",
                        )} (Saved in DB)`,
                      )
                      setActiveSheet(null)
                    }}
                  >
                    Save Limit
                  </button>
                </div>
              )}

              {/* CURRENCY SHEET */}
              {activeSheet === "currency" && (
                <div>
                  <div className="sheet-header">
                    <div className="sheet-title">Select Currency</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="control-list" style={{ marginTop: 0 }}>
                    {[
                      { code: "USD", name: "United States Dollar ($)" },
                      { code: "EUR", name: "Euro (€)" },
                      { code: "GBP", name: "British Pound (£)" },
                      { code: "INR", name: "Indian Rupee (₹)" },
                    ].map((curr) => (
                      <button
                        key={curr.code}
                        style={{
                          padding: "12px 0",
                          fontWeight: currency === curr.code ? 800 : 500,
                          color:
                            currency === curr.code
                              ? "var(--green-dark)"
                              : "inherit",
                        }}
                        onClick={() => {
                          setCurrency(curr.code)
                          db.updateActiveUser({ currency: curr.code })
                          setActiveSheet(null)
                          notify(`Currency set to ${curr.code} (Saved in DB)`)
                        }}
                      >
                        <span>
                          <strong>{curr.code}</strong>
                          <small>{curr.name}</small>
                        </span>
                        {currency === curr.code && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FORGOT PASSWORD SHEET */}
              {activeSheet === "forgot_password" && (
                <div>
                  <div className="sheet-header">
                    <div className="sheet-title">Reset Password</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: 12,
                      margin: "8px 0 16px",
                      lineHeight: 1.5,
                    }}
                  >
                    Enter your account email below. We'll send a 6-digit verification code to securely restore your VoiceBrue access.
                  </p>
                  <div className="input-group">
                    <label className="input-label">Account Email</label>
                    <div className="input-field-wrap">
                      <span className="input-icon">
                        <Icon name="mail" size={17} />
                      </span>
                      <input
                        className="input-field"
                        type="email"
                        defaultValue={authEmail}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <button
                    className="send-button"
                    style={{ marginTop: 20 }}
                    onClick={() => {
                      notify("Reset verification link sent to your email!")
                      setActiveSheet(null)
                    }}
                  >
                    Send Reset Link
                  </button>
                </div>
              )}

              {/* ADD FAMILY MEMBER SHEET */}
              {activeSheet === "add_family_member" && (
                <div>
                  <div className="sheet-header">
                    <div className="sheet-title">Add Family Member</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: 11,
                      margin: "6px 0 16px",
                      lineHeight: 1.5,
                    }}
                  >
                    Add a family member to your VoiceBrue Comprehensive Floater Insurance Policy ($500,000 Cashless Cover).
                  </p>

                  <div className="input-group" style={{ marginBottom: 12 }}>
                    <label className="input-label">Member Full Name</label>
                    <div className="input-field-wrap">
                      <span className="input-icon">
                        <Icon name="user" size={17} />
                      </span>
                      <input
                        className="input-field"
                        type="text"
                        placeholder="Enter family member's name"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1fr",
                      gap: 10,
                      marginBottom: 12,
                    }}
                  >
                    <div className="input-group">
                      <label className="input-label">Relationship</label>
                      <select
                        className="member-select"
                        value={newMemberRelation}
                        onChange={(e) => setNewMemberRelation(e.target.value)}
                      >
                        <option value="Spouse">Spouse</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label className="input-label">Age</label>
                      <input
                        className="member-input"
                        type="number"
                        placeholder="e.g. 28"
                        value={newMemberAge}
                        onChange={(e) => setNewMemberAge(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-group" style={{ marginBottom: 18 }}>
                    <label className="input-label">Insurance Plan Cover</label>
                    <div className="member-cover-chips" style={{ marginTop: 4 }}>
                      {[
                        "Health Floater ($500k)",
                        "Term Life ($250k)",
                        "Critical Care ($100k)",
                      ].map((cov) => (
                        <button
                          key={cov}
                          type="button"
                          className={`cover-chip-btn ${
                            newMemberCover === cov ? "active" : ""
                          }`}
                          onClick={() => setNewMemberCover(cov)}
                        >
                          {cov}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    className="send-button"
                    onClick={handleAddMemberFromSheet}
                  >
                    Save & Add to Policy
                  </button>
                </div>
              )}

              {/* DIGITAL HEALTH INSURANCE CARD SHEET */}
              {activeSheet === "health_card" && (
                <div>
                  <div className="sheet-header">
                    <div className="sheet-title">Digital Health Card</div>
                    <button
                      className="sheet-close"
                      onClick={() => setActiveSheet(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="policy-badge-card" style={{ marginTop: 10 }}>
                    <div className="policy-card-top">
                      <span className="policy-number-label">VOICEBRUE HEALTH PASS</span>
                      <span className="policy-sum-chip">Cashless TPA</span>
                    </div>
                    <div style={{ margin: "14px 0 6px" }}>
                      <div
                        style={{
                          fontSize: 10,
                          color: "#adb2ae",
                          textTransform: "uppercase",
                        }}
                      >
                        Primary Insured
                      </div>
                      <div
                        style={{
                          fontSize: 19,
                          fontWeight: 800,
                          color: "var(--white)",
                        }}
                      >
                        {userName}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#35be4b",
                          fontWeight: 700,
                          marginTop: 2,
                        }}
                      >
                        Policy ID: {policyNumber || "VB-FL-2026-9842"}
                      </div>
                    </div>
                    <div className="policy-card-details">
                      <div>
                        <span style={{ fontSize: 9, color: "#9ba19d" }}>
                          Covered Members
                        </span>
                        <strong style={{ display: "block", fontSize: 12 }}>
                          {familyMembers.filter((m) => m.name.trim()).length + 1}{" "}
                          Persons Included
                        </strong>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: 9, color: "#9ba19d" }}>
                          Hospital Network
                        </span>
                        <strong style={{ display: "block", fontSize: 12 }}>
                          12,500+ Cashless
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <div
                      className="panel-title"
                      style={{ fontSize: 12, marginBottom: 8 }}
                    >
                      Included Covered Persons
                    </div>
                    <div className="control-list" style={{ marginTop: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 0",
                          borderBottom: "1px solid var(--line)",
                          fontSize: 12,
                        }}
                      >
                        <strong>{userName}</strong>
                        <span
                          style={{
                            color: "var(--green-dark)",
                            fontWeight: 700,
                          }}
                        >
                          Self · Primary
                        </span>
                      </div>
                      {familyMembers
                        .filter((m) => m.name.trim())
                        .map((m) => (
                          <div
                            key={m.id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "8px 0",
                              borderBottom: "1px solid var(--line)",
                              fontSize: 12,
                            }}
                          >
                            <strong>{m.name}</strong>
                            <span style={{ color: "var(--muted)" }}>
                              {m.relation} · Age {m.age || "—"}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <button
                    className="send-button"
                    style={{ marginTop: 18 }}
                    onClick={() => {
                      notify("Digital Health E-Card downloaded successfully!")
                      setActiveSheet(null)
                    }}
                  >
                    Download Official PDF Card
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
