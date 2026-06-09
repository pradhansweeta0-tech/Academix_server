import { Request, Response } from "express";

import { getMyResult } from "./result.service";

export const getMyResultController = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await getMyResult(user.id);

  res.json({
    success: true,
    data: result,
  });
};
