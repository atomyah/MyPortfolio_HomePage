import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "やあ、元気？" });
}
