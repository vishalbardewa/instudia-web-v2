import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  let res: any = { ok: false, message: "Invalid Request" };
  const fileToRead = path.join(process.cwd(), "/app/courses.json");
  const data = JSON.parse(await fs.readFileSync(fileToRead, "utf-8"));
  res = {
    courses: data,
  };

  return NextResponse.json(res);
}
