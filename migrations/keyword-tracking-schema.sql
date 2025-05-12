-- Aktiviere die UUID-Erweiterung, falls noch nicht aktiviert
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabelle für Keyword-Rankings
CREATE TABLE IF NOT EXISTS keyword_rankings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword TEXT NOT NULL,
  language TEXT NOT NULL,
  position INTEGER NOT NULL,
  search_volume INTEGER DEFAULT 0,
  url TEXT NOT NULL,
  previous_position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Zusammengesetzter Unique-Index für Keyword und Sprache
  UNIQUE(keyword, language)
);

-- Tabelle für historische Keyword-Daten
CREATE TABLE IF NOT EXISTS keyword_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword_id UUID REFERENCES keyword_rankings(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  snapshot_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indizes für schnellere Abfragen
CREATE INDEX IF NOT EXISTS keyword_rankings_language_idx ON keyword_rankings (language);
CREATE INDEX IF NOT EXISTS keyword_rankings_position_idx ON keyword_rankings (position);
CREATE INDEX IF NOT EXISTS keyword_history_keyword_id_idx ON keyword_history (keyword_id);
CREATE INDEX IF NOT EXISTS keyword_history_snapshot_date_idx ON keyword_history (snapshot_date);

-- Trigger für automatische Aktualisierung des updated_at-Felds
CREATE OR REPLACE FUNCTION update_keyword_rankings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_keyword_rankings_updated_at
BEFORE UPDATE ON keyword_rankings
FOR EACH ROW
EXECUTE FUNCTION update_keyword_rankings_updated_at();

-- Trigger für das Speichern historischer Daten
CREATE OR REPLACE FUNCTION store_keyword_history()
RETURNS TRIGGER AS $$
BEGIN
  -- Speichere die alte Position in der History-Tabelle, wenn sie sich geändert hat
  IF (TG_OP = 'UPDATE' AND OLD.position != NEW.position) OR TG_OP = 'INSERT' THEN
    INSERT INTO keyword_history (keyword_id, position, snapshot_date)
    VALUES (NEW.id, NEW.position, CURRENT_DATE);
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER store_keyword_history
AFTER INSERT OR UPDATE ON keyword_rankings
FOR EACH ROW
EXECUTE FUNCTION store_keyword_history();
