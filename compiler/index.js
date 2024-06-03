import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { promisify } from 'util';

import generateFile from './generateFile.js';
import generateInputFile from './generateInputFile.js';

import executeCpp from './executeCpp.js';
import executeC from './executeC.js';
import executeJava from './executeJava.js';
import executePython from './executePython.js';

//Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;

const unlinkAsync = promisify(fs.unlink);

app.get('/', (req, res) => {
    res.send('Welcome to compiler API');
});



app.post('/run', async (req, res) => {
    const { language = 'cpp', code, input } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: 'Empty code!' });
    }

    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    let output;

    try {
        switch (language) {
            case 'c':
                output = await executeC(filePath, inputPath);
                break;
            case 'java':
                output = await executeJava(filePath, inputPath);
                break;
            case 'python':
                output = await executePython(filePath, inputPath);
                break;
            default:
                output = await executeCpp(filePath, inputPath);
                break;
        }

        res.json({ output });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    } finally {
        // Ensure files are deleted after processing
        try {
            await unlinkAsync(filePath);
            await unlinkAsync(inputPath);
        } catch (cleanupError) {
            console.error('Error deleting files:', cleanupError);
        }
    }
});

app.post('/runOntest', async (req, res) => {
    const { language, code, testcases } = req.body;

  const filePath = await generateFile(language, code);
  let outputs = [];
    
  try {
    for (let testcase of testcases) {
      const inputPath = await generateInputFile(testcase.input);
      let output;

      switch (language) {
        case 'c':
          output = await executeC(filePath, inputPath);
          break;
        case 'java':
          output = await executeJava(filePath, inputPath);
          break;
        case 'python':
          output = await executePython(filePath, inputPath);
          break;
        default:
          output = await executeCpp(filePath, inputPath);
          break;
      }

      // If the output contains an error message, send it as a response
      if (output.includes('Error')) {
        return res.status(400).json(new ApiError(400, {error: output}, "Compilation Error"));
      }

      outputs.push(output.trim());

      // Delete the input file after it's processed
      await unlinkAsync(inputPath);
    }

    res.json({ outputs });
  } catch (error) {
    // If an error occurs, send it as a response
    return res.status(500).json({ error: error.message });
  } finally {
    // Ensure the code file is deleted after processing
    try {
      await unlinkAsync(filePath);
    } catch (cleanupError) {
      console.error('Error deleting file:', cleanupError);
    }
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});