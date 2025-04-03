import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length == 0) {
    return false;
  }
  return rows[0];
};
const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  console.log('rows', rows);
  if (rows.length == 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, password, username, email, role} = user;
  const sql = `INSERT INTO wsk_users (name, password, username, email, role) VALUES (?, ?, ?, ?, ?)`;
  const params = [name, password, username, email, role];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows == 0) {
    return false;
  }
  return {user_id: rows[0].insertId};
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const sql = connection.format('DELETE FROM wsk_users WHERE user_id = ?', [
      id,
    ]);

    const [result] = await connection.execute(sql);
    if (result.affectedRows == 0) {
      return {message: 'User not deleted'};
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error('error', error.message);
    return {message: error.message};
  } finally {
    connection.release();
  }
};
const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows == 0) {
    return false;
  }
  return {message: 'success'};
};
export {
  listAllUsers,
  findUserById,
  addUser,
  removeUser,
  modifyUser,
  findUserByUsername,
};
