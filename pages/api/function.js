import db from '../../lib/db'

function findOrCreateUser(userPhone) {
  return new Promise(async (resolve, reject) => {
    try {
      const userId = {};

      const [existingUser] = await db.query('SELECT userId FROM userRecord WHERE userPhone = ?', [userPhone]);

      if (existingUser && existingUser.length > 0) {
        userId.id = existingUser[0].userId;
        console.log('User with phone number already exists:', userPhone);
        resolve(userId);
      } else {
        userId.id = uuidv4();
        const insertQuery = 'INSERT INTO userRecord (userPhone, userId) VALUES (?, ?)';
        const [result] = await db.query(insertQuery, [userPhone, userId.id]);
        console.log('New user inserted with phone number:', userPhone);
        resolve(userId);
      }
    } catch (error) {
      console.error('Error finding or creating user:', error);
      reject(error);
    }
  });
}

export { findOrCreateUser };