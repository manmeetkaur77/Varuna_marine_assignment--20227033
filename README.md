# ⚓ FuelEU Maritime Compliance Dashboard

## 🚀 Overview
This project implements core compliance mechanisms inspired by **EU Regulation 2023/1805** on reducing greenhouse gas (GHG) intensity of maritime fuels.  

It provides an interactive dashboard for managing vessel routes, comparing fuel emissions, and handling compliance credits under the **FuelEU Maritime** framework.

Users can:
- View and compare **GHG intensities** of different shipping routes.  
- Set a **baseline route** for emission comparison.  
- Manage **Compliance Balances (CB)** through *Article 20 – Banking*.  
- Create **Pooling agreements** between ships as per *Article 21 – Pooling*.  

Each tab in the dashboard represents a specific part of the regulation logic.

---

## 🧩 Features
| Tab | Description |
|------|--------------|
| **Routes** | Displays all shipping routes with vessel type, fuel type, and emission data. Allows setting a route as the baseline. |
| **Compare** | Compares GHG intensity of other routes against the baseline. Highlights compliance based on regulatory targets. |
| **Banking** | Implements *Article 20 – Banking* to store (bank) positive compliance balances and apply them to future deficits. |
| **Pooling** | Implements *Article 21 – Pooling* where ships can share their compliance balances collectively. |

---

## 🧠 System Architecture
**Frontend:** React + TypeScript (Vite)  
**Backend:** Express + Node.js  
**Database:** PostgreSQL (accessed via Prisma ORM)  
**Visualization:** Recharts (for interactive graphs)  

---

## ⚙️ Folder Structure
```
fuel-eu/
│
├── backend/
│   ├── src/
│   │   ├── controllers/         # Route logic handlers
│   │   ├── outbound/postgres/   # Repository layer (Prisma)
│   │   ├── services/            # Business logic
│   │   └── index.ts             # App entry
│   └── prisma/                  # Schema and migrations
│
├── frontend/
│   ├── src/
│   │   ├── pages/               # RoutesTab, CompareTab, BankingTab, PoolingTab
│   │   ├── adapters/            # API clients and hooks
│   │   └── components/          # UI elements
│   └── vite.config.ts
│
└── README.md
```

---

## 🧰 Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/fuel-eu.git
cd fuel-eu
```

### 2️⃣ Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3️⃣ Start PostgreSQL
```bash
brew services start postgresql@14
```

### 4️⃣ Apply migrations and seed data
```bash
cd backend
npx prisma migrate dev
```

### 5️⃣ Start the backend
```bash
npm run dev
```

### 6️⃣ Start the frontend
```bash
cd ../frontend
npm run dev
```

---

## 🧾 Example API Endpoints
| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/routes` | GET | Fetch all routes |
| `/api/routes/:id/baseline` | POST | Set a baseline route |
| `/api/routes/comparison` | GET | Compare baseline vs others |
| `/api/banking/bank` | POST | Bank surplus compliance balance |
| `/api/banking/apply` | POST | Apply banked CB to a deficit |
| `/api/pools` | POST | Create pooling agreements |
| `/api/compliance/cb?year=YYYY` | GET | Fetch compliance balance |
| `/api/compliance/adjusted-cb?year=YYYY` | GET | Fetch adjusted CB per ship |

---

## 📊 How the Dashboard Works
1. **Routes Tab** — Lists vessel routes and emissions. Users can mark one as the baseline.  
2. **Compare Tab** — Shows how each route compares to the baseline in terms of GHG intensity.  
3. **Banking Tab** — Lets users bank surplus compliance credits and apply them when needed.  
4. **Pooling Tab** — Enables multiple ships to share compliance credits collectively to maintain overall balance.

---

## 💡 Key Formulas
**Percent Difference**  
\[
\text{percentDiff} = \left(\frac{\text{comparison}}{\text{baseline}} - 1\right) \times 100
\]

**Compliance Target**  
Target = 2 % below baseline intensity (e.g., if baseline = 91.16 gCO₂e/MJ, then target = 89.3368 gCO₂e/MJ)

---

## 🧑‍💻 Author
**Manmeet Kaur**  
B.Tech, MNNIT Allahabad  
Focused on AI-driven sustainability and full-stack web development.

---

## 📜 License
This project is open-source and available for educational or research purposes under the MIT License.
