import cors from "cors";
import express from "express";
import { getAllRoutes, setBaseline, getComparison } from "../../adapters/inbound/http/routesController";
import { computeCB, getCB } from "../../adapters/inbound/http/complianceController";
import { bankCB, getBankRecords, applyBankedCB} from "../../adapters/inbound/http/bankingController";
import { createPool } from "../../adapters/inbound/http/poolingController";

const app = express();

app.use(express.json());
// ✅ Allow frontend to access backend


app.use(cors({ origin: "*" })); // 👈 important
app.use(cors({
  origin: "*", // frontend URL (change if different)
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend!" });
  });
  
// ✅ Register routes
// ✅ Prefix all routes with /api
app.get("/api/routes", getAllRoutes);
app.post("/api/routes/:id/baseline", setBaseline);
app.get("/api/routes/comparison", getComparison);


app.post("/api/banking/bank", bankCB);
app.get("/api/banking/records", getBankRecords);
app.post("/api/banking/apply", applyBankedCB);
app.post("/api/pools", createPool);


export default app;

