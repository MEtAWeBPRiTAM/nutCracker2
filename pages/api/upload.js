import db from '../../lib/db';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('video');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    upload(req, res, async function (err) {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }

      const { phone } = req.body;

      try {
        const userId={};

        const [existingUser] = await db.query('SELECT userId FROM userRecord WHERE userPhone = ?', [phone]);

        if (existingUser && existingUser.length > 0) {
          userId.id = existingUser[0].userId;
          console.log('User with phone number already exists:', phone);
        } else {
          userId.id = uuidv4();
          const insertQuery = 'INSERT INTO userRecord (userPhone,userId) VALUES (?,?)';
          const [result] = await db.query(insertQuery, [phone,userId.id]);
          console.log('New user inserted with phone number:', phone);
        }

        const { filename, path } = req.file;

        // Generate a unique identifier for the video
        const videoId = uuidv4();

        // Insert the video record into the database with the generated videoId
        const videoInsertQuery = 'INSERT INTO uploadVideos (recordId, videoName, localStoragePath, relatedUser) VALUES (?, ?, ?, ?)';
        const [videoResult] = await db.query(videoInsertQuery, [videoId, filename, path, userId.id]);

        if (videoResult.affectedRows === 1) {
          // Provide a unique link for the uploaded video
          const videoLink = `/video/${videoId}`; // Adjust the route as per your routing configuration
          res.status(200).json({ link: videoLink });
        } else {
          res.status(500).json({ error: 'Error inserting file into database' });
        }
      } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Error uploading video' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

