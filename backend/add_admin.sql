-- Add role column to users table
ALTER TABLE users ADD COLUMN role VARCHAR(10) DEFAULT 'user' NOT NULL;

-- Create enum type for role (optional, for better data integrity)
-- ALTER TABLE users ALTER COLUMN role TYPE VARCHAR(10) CHECK (role IN ('user', 'admin'));

-- Insert default admin user
INSERT INTO users (email, password, name, role, "createdAt", "updatedAt") 
VALUES (
  'admin@example.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: admin123
  'System Administrator',
  'admin',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;