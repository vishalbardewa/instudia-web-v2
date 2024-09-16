import path from "path";
import fs from 'fs';
import { NextResponse } from "next/server";

export async function GET(req: any, {params}: any){
    const courseSlug = params.slug
    let res: any = {ok: false, message: 'Invalid Request'}
    const fileToRead = path.join(process.cwd(), '/app/courses.json');
    const data = JSON.parse(await fs.readFileSync(fileToRead, 'utf-8'));
    const course = data.courses.find((item: any) => item.slug === courseSlug);
    res = {
        courses: data,
        courseDetails: course,
        }

    return NextResponse.json(res)
}
