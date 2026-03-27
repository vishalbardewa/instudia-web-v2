import { NextResponse } from 'next/server';
import mammoth from 'mammoth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No valid file physically uploaded to endpoint.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    let extractedText = '';

    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      try {
        const PDFParser = require("pdf2json");
        const pdfParser = new PDFParser(null, 1);
        
        const extracted = await new Promise<string>((resolve, reject) => {
          pdfParser.on("pdfParser_dataError", (errData: any) => reject(new Error(errData.parserError)));
          pdfParser.on("pdfParser_dataReady", () => {
            resolve(pdfParser.getRawTextContent().replace(/\r\n/g, "\n"));
          });
          pdfParser.parseBuffer(buffer);
        });
        
        extractedText = extracted;
      } catch (pdfErr: any) {
        console.error('PDF Parse Internal Backend Error:', pdfErr);
        return NextResponse.json({ error: `PDF Engine Crash: ${pdfErr.message || 'Event stream execution failed.'}` }, { status: 500 });
      }
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      file.name.toLowerCase().endsWith('.docx')
    ) {
      const parsed = await mammoth.extractRawText({ buffer });
      extractedText = parsed.value;
    } else if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) {
      extractedText = buffer.toString('utf-8');
    } else {
      return NextResponse.json({ error: 'Unsupported file extension. Please upload a standard PDF, DOCX, or TXT file.' }, { status: 400 });
    }

    // Apply strict semantic cleanup to drop massively nested newline spacing
    extractedText = extractedText.replace(/\n{3,}/g, '\n\n').trim();
    
    if (!extractedText) {
      return NextResponse.json({ error: 'Failed to extract any text from the document. The file might be an image instead of a text-layer document.' }, { status: 400 });
    }

    return NextResponse.json({ text: extractedText });
  } catch (error: any) {
    console.error('File Extractor Error:', error);
    return NextResponse.json({ error: `Backend stream resolution failed: ${error.message || 'Unknown native node error.'}` }, { status: 500 });
  }
}
