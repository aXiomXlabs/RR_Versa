-- Aktiviere die UUID-Erweiterung, falls noch nicht aktiviert
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Erstelle die Benutzer-Tabelle
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  telegram_handle TEXT,
  experience_level TEXT DEFAULT 'beginner',
  newsletter_opt_in BOOLEAN DEFAULT FALSE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'waitlist' CHECK (status IN ('waitlist', 'active', 'inactive', 'banned')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Erstelle die Newsletter-Abonnenten-Tabelle
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Erstelle die Kontaktformular-Einreichungen-Tabelle
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'spam')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Erstelle Indizes für schnellere Abfragen
CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);
CREATE INDEX IF NOT EXISTS users_status_idx ON users (status);
CREATE INDEX IF NOT EXISTS newsletter_subscribers_email_idx ON newsletter_subscribers (email);
CREATE INDEX IF NOT EXISTS newsletter_subscribers_active_idx ON newsletter_subscribers (is_active);
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx ON contact_submissions (status);
CREATE INDEX IF NOT EXISTS contact_submissions_email_idx ON contact_submissions (email);

-- Erstelle Trigger für automatische Aktualisierung des updated_at-Felds
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at
BEFORE UPDATE ON newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON contact_submissions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Erstelle Row-Level Security (RLS) Richtlinien
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Richtlinien für die Benutzer-Tabelle
CREATE POLICY "Benutzer können nur ihre eigenen Daten sehen" ON users
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Administratoren können alle Benutzer sehen" ON users
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Richtlinien für die Newsletter-Abonnenten-Tabelle
CREATE POLICY "Nur Administratoren können Newsletter-Abonnenten sehen" ON newsletter_subscribers
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Richtlinien für die Kontaktformular-Einreichungen-Tabelle
CREATE POLICY "Nur Administratoren können Kontaktformular-Einreichungen sehen" ON contact_submissions
FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Erlaube anonymen Zugriff für Einfügungen (für öffentliche Formulare)
CREATE POLICY "Anonyme Benutzer können Kontaktformulare einreichen" ON contact_submissions
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anonyme Benutzer können sich für den Newsletter anmelden" ON newsletter_subscribers
FOR INSERT WITH CHECK (true);

CREATE POLICY "Anonyme Benutzer können sich für die Warteliste anmelden" ON users
FOR INSERT WITH CHECK (true);

-- Erlaube serverseitigen Zugriff für alle Operationen
CREATE POLICY "Service-Rolle kann alle Operationen durchführen" ON users
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service-Rolle kann alle Operationen durchführen" ON newsletter_subscribers
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service-Rolle kann alle Operationen durchführen" ON contact_submissions
FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
