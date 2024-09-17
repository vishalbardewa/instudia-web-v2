import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: any) {
  

  return NextResponse.json({message: "Working"});
}
