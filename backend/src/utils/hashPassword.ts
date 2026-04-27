// src/utils/hashPassword
import bcrypt from 'bcrypt';

async function generarHash() {
  const hash: string = await bcrypt.hash('admin123', 10);
  console.log(hash);
}

generarHash();
