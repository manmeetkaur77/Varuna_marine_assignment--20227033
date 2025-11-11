import { Request, Response } from "express";
import { BankingRepository } from "../../outbound/postgres/bankingRepository";

const bankRepo = new BankingRepository();

export const bankCB = async (req: Request, res: Response) => {
  try {
    const { shipId, year, amount } = req.body;
    const entry = await bankRepo.bankSurplus(shipId, year, amount);
    res.json(entry);
  } catch (e: any) {
    console.error("Error in bankCB:", e);  // ✅ This line shows the real issue
    res.status(500).json({ error: "Failed to bank CB", details: e.message });
  }
};

// 🧾 Fetch banked records
export const getBankRecords = async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.query as { shipId: string; year: string };

    if (!shipId || !year) {
      return res.status(400).json({ error: "Missing shipId or year" });
    }

    const records = await bankRepo.getBanked(shipId, parseInt(year));
    res.status(200).json(records);
  } catch (e) {
    console.error("Error in getBankRecords:", e);
    res.status(500).json({ error: "Failed to fetch bank records" });
  }
};
