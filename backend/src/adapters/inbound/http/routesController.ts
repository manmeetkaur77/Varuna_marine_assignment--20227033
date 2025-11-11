import { Request, Response } from "express";
import { RouteRepository } from "../../outbound/postgres/routeRepository";
import { percentDiff } from "../../../shared/utils/formulas";

const repo = new RouteRepository();

export const getAllRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await repo.getAll();
    res.json(routes);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch routes" });
  }
};

export const setBaseline = async (req: Request, res: Response) => {
  try {
    const route = await repo.setBaseline(req.params.id);
    res.json(route);
  } catch (e) {
    res.status(500).json({ error: "Failed to set baseline" });
  }
};


import { computeCB, getCB } from "../../../adapters/inbound/http/complianceController";



export const getComparison = async (req: Request, res: Response) => {
  try {
    const baseline = await repo.getBaseline();
    if (!baseline) return res.status(400).json({ error: "No baseline found" });

    const routes = await repo.getAll();
    const comparisons = routes
      .filter(r => r.routeId !== baseline.routeId)
      .map(r => ({
        routeId: r.routeId,
        ghgIntensity: r.ghgIntensity,
        percentDiff: percentDiff(r.ghgIntensity, baseline.ghgIntensity),
        compliant: r.ghgIntensity <= 89.3368
      }));

    res.json({ baseline, comparisons });
  } catch (e) {
    res.status(500).json({ error: "Failed to compute comparison" });
  }
};


