import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("hello there")
  // console.log(await req.json())
  const data = await req.formData();
  const theFile: File | null = data.get("file") as unknown as File;

  console.log(data)
  console.log(theFile)



  
  const resp = await openai.createTranscription(
    theFile,
    "whisper-1"
 );

//  console.log(resp)
  return NextResponse.json({ output: "resp" }, { status: 200 })

};