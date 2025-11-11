import cors from "cors";
import express from "express";
import { getAllRoutes, setBaseline, getComparison } from "../../adapters/inbound/http/routesController";
import { computeCB, getCB } from "../../adapters/inbound/http/complianceController";
import { bankCB, getBankRecords } from "../../adapters/inbound/http/bankingController";
import { createPool } from "../../adapters/inbound/http/poolingController";

const app = express();

app.use(express.json());
// ✅ Allow frontend to access backend


app.use(cors({ origin: "http://localhost:5173" })); // 👈 important
app.use(cors({
  origin: "http://localhost:5173", // frontend URL (change if different)
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend!" });
  });
  
// ✅ Register routes
app.get("/routes", getAllRoutes);
app.post("/routes/:id/baseline", setBaseline);
app.get("/routes/comparison", getComparison);

app.get("/banking/records", getBankRecords);
app.post("/banking/bank", bankCB);
app.post("/pools", createPool);

export default app;



