import fs from 'fs/promises';
import path from 'path';

export async function logError(context: string, error: any) {
  try {
    const errorDetails = error instanceof Error ? error.stack || error.message : JSON.stringify(error);
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${context}]\n${errorDetails}\n\n`;

    const logDir = path.join(process.cwd(), '.logs');
    
    // Create the .logs directory if it does not exist
    try {
      await fs.access(logDir);
    } catch {
      await fs.mkdir(logDir, { recursive: true });
    }

    const logFile = path.join(logDir, 'ats-errors.log');
    await fs.appendFile(logFile, logMessage, 'utf-8');
  } catch (loggerErr) {
    // Failsafe so the logger itself doesn't crash the running process entirely
    console.error('Failed to write to error log file:', loggerErr);
  }
}
