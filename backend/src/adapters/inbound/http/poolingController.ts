import { Request, Response } from "express";

export const createPool = async (req: Request, res: Response) => {
  try {
    const { members } = req.body; // [{ shipId, cbBefore }]
    const total = members.reduce((sum: number, m: any) => sum + m.cbBefore, 0);

    if (total < 0) return res.status(400).json({ error: "Pool total must be non-negative" });

    const adjusted = members.map((m: any) => ({
      ...m,
      cbAfter: Math.max(0, m.cbBefore),
    }));

    res.json({ total, adjusted });
  } catch (e) {
    res.status(500).json({ error: "Failed to create pool" });
  }
};
