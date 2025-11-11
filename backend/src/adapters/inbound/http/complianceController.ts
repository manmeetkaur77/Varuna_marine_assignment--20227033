import { Request, Response } from "express";
import { computeComplianceBalance } from "../../../core/application/computeCBService";
import { ComplianceRepository } from "../../outbound/postgres/complianceRepository";

const repo = new ComplianceRepository();

export const computeCB = async (req: Request, res: Response) => {
  try {
    const { shipId, actualIntensity, fuelConsumption, year } = req.query;

    if (!shipId || !actualIntensity || !fuelConsumption || !year) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const result = await computeComplianceBalance(
      String(shipId),
      Number(actualIntensity),
      Number(fuelConsumption),
      Number(year)
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in computeCB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCB = async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.query;

    if (!shipId || !year) {
      return res.status(400).json({ message: "Missing shipId or year" });
    }

    const record = await repo.getCB(String(shipId), Number(year));
    if (!record) return res.status(404).json({ message: "CB record not found" });

    res.status(200).json(record);
  } catch (error) {
    console.error("Error in getCB:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const complianceRepo = new ComplianceRepository();

export const calculateCompliance = async (req: Request, res: Response) => {
  try {
    const { shipId, year } = req.body;
    const result = await complianceRepo.calculateCompliance(shipId, year);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate compliance", details: err });
  }
};

