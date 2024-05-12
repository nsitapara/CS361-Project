import { NextResponse } from "next/server";
import {redirect} from "next/navigation";

// export async function GET() {
//   return NextResponse.json({hello:"world"})
// }

export async function  GET(request: Request) {
  const data = await request.json()
  console.log(data)
    return redirect('http://localhost:3000/dashboard')
}