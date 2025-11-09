import express from "express";
import { getAllRoutes, setBaseline, getComparison } from "../../adapters/inbound/http/routesController";
import { computeCB } from "../../adapters/inbound/http/complianceController";
import { bankCB, getBankRecords } from "../../adapters/inbound/http/bankingController";
import { createPool } from "../../adapters/inbound/http/poolingController";




const app = express();
app.use(express.json());

app.get("/routes", getAllRoutes);
app.post("/routes/:id/baseline", setBaseline);
app.get("/routes/comparison", getComparison);

// app.get("/compliance/cb", computeCB);
// app.get("/banking/records", getBankRecords);
// app.post("/banking/bank", bankCB);

app.post("/pools", createPool);

export default app;
