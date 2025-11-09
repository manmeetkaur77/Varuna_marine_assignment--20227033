import { Request, Response } from "express";
import { BankingRepository } from "../../outbound/postgres/bankingRepository";

const bankRepo = new BankingRepository();

export const bankCB = async (req: Request, res: Response) => {
  try {
    const { shipId, year, amount } = req.body;
    const entry = await bankRepo.bankSurplus(shipId, year, amount);
    res.json(entry);
  } catch (e) {
    res.status(500).json({ error: "Failed to bank CB" });
  }
};

export const getBankRecords = async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.query as { shipId: string; year: string };
    const records = await bankRepo.getBanked(shipId, parseInt(year));
    res.json(records);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch bank records" });
  }
};
