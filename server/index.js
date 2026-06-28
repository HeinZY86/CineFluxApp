const express = require('express');
const cors = require('cors');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Example Endpoint: Generate a 5-second preview clip
app.post('/api/process-video', (req, res) => {
  const { inputFileName, outputFileName } = req.body;
  
  const inputPath = path.join(UPLOADS_DIR, inputFileName);
  const outputPath = path.join(UPLOADS_DIR, outputFileName);

  console.log(`Starting FFmpeg processing for: ${inputFileName}`);

  ffmpeg(inputPath)
    .setStartTime('00:00:05')
    .setDuration(5) // Extract 5 seconds
    .output(outputPath)
    .on('end', () => {
      console.log('Processing finished successfully.');
      res.json({ status: 'success', message: 'Video processed', file: outputFileName });
    })
    .on('error', (err) => {
      console.error('Error processing video:', err);
      res.status(500).json({ status: 'error', error: err.message });
    })
    .run();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local FFmpeg Backend running on http://localhost:${PORT}`);
});
