import { Request, Response } from "express";
import { BankingRepository } from "../../outbound/postgres/bankingRepository";

const bankRepo = new BankingRepository();

// 🏦 Bank Surplus CB
export const bankCB = async (req: Request, res: Response) => {
  try {
    const { shipId, year, amount } = req.body;

    if (!shipId || !year || !amount) {
      return res.status(400).json({ error: "shipId, year, and amount are required" });
    }

    const entry = await bankRepo.bankSurplus(shipId, year, amount);
    res.json(entry);
  } catch (e: any) {
    console.error("Error in bankCB:", e);
    res.status(500).json({ error: "Failed to bank CB", details: e.message });
  }
};

// 📜 Fetch banked records (filtered or all)
export const getBankRecords = async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.query as { shipId?: string; year?: string };

    // 🟢 Allow showing all if params are missing
    const records = await bankRepo.getBanked(
      shipId,
      year ? parseInt(year) : undefined
    );

    res.status(200).json(records);
  } catch (e) {
    console.error("Error in getBankRecords:", e);
    res.status(500).json({ error: "Failed to fetch bank records" });
  }
};
// ✅ Apply stored surplus to offset deficit
export const applyBankedCB = async (req: Request, res: Response) => {
  try {
    const { shipId, year, deficit } = req.body;

    if (!shipId || !year || !deficit) {
      return res.status(400).json({ error: "shipId, year, and deficit are required" });
    }

    const result = await bankRepo.applyBankedCB(shipId, Number(year), Number(deficit));
    res.json(result);
  } catch (e: any) {
    console.error("Error in applyBankedCB:", e);
    res.status(500).json({ error: "Failed to apply banked CB", details: e.message });
  }
};

