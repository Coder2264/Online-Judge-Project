import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split('.')[0];
  const classPath = path.dirname(filepath);

  return new Promise((resolve, reject) => {
    exec(
      `javac "${filepath}" && java -cp "${classPath}" "${jobId}" < "${inputPath}"`,
      { cwd: outputPath },
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        } else {
          resolve(stdout);
        }
      }
    );
  });
};

export default executeJava;
