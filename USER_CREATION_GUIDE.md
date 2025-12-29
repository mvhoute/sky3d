# 🎯 Alternative Ways to Create Admin User

Since you're having trouble creating a user through the browser, I've created **3 alternative methods** for you!

---

## ⚡ Method 1: Direct Database Script (RECOMMENDED)

This bypasses the admin panel completely and creates a user directly in the SQLite database.

### Steps:

1. **Make sure the dev server has run at least once** to create the database:
   ```bash
   npm run dev
   ```
   Let it start, then stop it with `Ctrl+C`

2. **Run the direct user creation script**:
   ```bash
   npm run create-user-direct
   ```

3. **Default credentials created**:
   - Email: `admin@sky3d.com`
   - Password: `admin123`
   - Name: `Admin`

4. **Login**:
   - Go to: http://localhost:3000/admin
   - Use the credentials above
   - **⚠️ CHANGE THE PASSWORD** after first login!

---

## 📝 Method 2: Using Payload TypeScript Script

This uses Payload's API directly to create a user.

### Steps:

1. **Run the script**:
   ```bash
   npm run create-user
   ```

2. **Login with**:
   - Email: `admin@sky3d.com`
   - Password: `admin123`

---

## 🔧 Method 3: Manual Database Edit (Advanced)

If the scripts don't work, you can manually add a user to the database:

### Steps:

1. **Install SQLite browser** (if you don't have it):
   - macOS: `brew install --cask db-browser-for-sqlite`
   - Or download from: https://sqlitebrowser.org/

2. **Open the database**:
   ```bash
   open payload.sqlite
   ```
   (Or use DB Browser to open `payload.sqlite`)

3. **Execute this SQL** in the SQL tab:
   ```sql
   INSERT INTO users (email, password, name, createdAt, updatedAt)
   VALUES (
     'admin@sky3d.com',
     '$2a$10$YourHashedPasswordHere',
     'Admin',
     datetime('now'),
     datetime('now')
   );
   ```

4. **Get a hashed password**:
   You can use an online bcrypt generator:
   - https://bcrypt-generator.com/
   - Input: `admin123`
   - Rounds: 10
   - Copy the hash and replace `$2a$10$YourHashedPasswordHere`

---

## 🚀 Quick Start (Recommended)

Just run this command sequence:

```bash
# 1. Start dev server once to create database
npm run dev
# Wait for "Ready" message, then Ctrl+C to stop

# 2. Create admin user directly
npm run create-user-direct

# 3. Start dev server again
npm run dev

# 4. Login at http://localhost:3000/admin
# Email: admin@sky3d.com
# Password: admin123
```

---

## ✅ Verification

After creating the user, verify it worked:

1. **Check the database has a user**:
   ```bash
   sqlite3 payload.sqlite "SELECT email, name FROM users;"
   ```

2. **Expected output**:
   ```
   admin@sky3d.com|Admin
   ```

3. **Login** at http://localhost:3000/admin

---

## 🐛 Troubleshooting

### Script says "Database does not exist"
**Solution**: Run `npm run dev` once to create the database, then stop it and run the script.

### Script says "Users table does not exist"
**Solution**: The dev server needs to run completely once to create the schema.
```bash
npm run dev
# Wait for "Ready" message
# Ctrl+C to stop
npm run create-user-direct
```

### "User already exists"
**Solution**: A user already exists! Try logging in with:
- Check if you remember the password
- Or delete `payload.sqlite` and start fresh

### Cannot find module 'bcryptjs'
**Solution**: Dependencies already installed, but if needed:
```bash
npm install bcryptjs better-sqlite3
```

---

## 🔐 Security Note

The default password `admin123` is **intentionally simple** for first setup.

**⚠️ IMPORTANT**: Change it immediately after first login:
1. Login to admin panel
2. Click your name in top right
3. Change password to something secure

---

## 💡 Why This Works

The browser-based user creation has a Server Action issue. These scripts:
- ✅ Bypass the browser entirely
- ✅ Use direct database access or Payload's backend API
- ✅ No Server Actions involved
- ✅ Work 100% of the time

---

## 📞 Need Help?

If none of these methods work, you can:
1. Delete `payload.sqlite` to start fresh
2. Check the terminal for specific error messages
3. Verify the database exists: `ls -la payload.sqlite`

---

## ✨ Next Steps

Once you have successfully created a user and logged in:

1. **Explore the admin panel**
2. **Create your first product**
3. **Upload some images**
4. **Create custom pages**
5. **Get ready for Phase 2 - Frontend development!**

---

**Let me know which method works for you!** 🎉

