-- 1. Create ENUM type if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'incident_severity_enum') THEN
        CREATE TYPE incident_severity_enum AS ENUM ('LOW', 'MEDIUM', 'HIGH');
    END IF;
END$$;

-- 2. Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(512) NOT NULL,
    description TEXT,
    severity incident_severity_enum NOT NULL DEFAULT 'LOW',
    reported_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert AI safety-related dummy data
INSERT INTO incidents (title, description, severity) VALUES
('AI Misidentification in Surveillance', 'Facial recognition system falsely flagged multiple individuals as suspects during a public event.', 'HIGH'),
('Autonomous Vehicle Navigation Error', 'Self-driving car veered into pedestrian lane due to sensor misreadings during fog.', 'HIGH'),
('Toxic Content Generation', 'AI chatbot generated harmful misinformation when prompted on medical advice.', 'MEDIUM'),
('Bias in Hiring Algorithm', 'AI system recommended significantly fewer minority candidates for senior roles.', 'HIGH'),
('Incorrect Sentiment Analysis in Support Tool', 'AI tagged urgent customer complaints as positive sentiment, delaying resolution.', 'MEDIUM'),
('Unauthorized Data Access by AI Model', 'AI-generated responses revealed traces of training data including sensitive customer info.', 'HIGH'),
('Hallucinated Financial Report Summary', 'AI summarization tool fabricated financial figures in quarterly report brief.', 'MEDIUM'),
('Overconfident Language in Legal Assistant', 'AI legal assistant provided definitive legal advice with incorrect case references.', 'LOW'),
('System Freeze During AI Model Update', 'Live inference service was disrupted for 5 minutes during a hot model swap.', 'LOW'),
('AI Image Tagger Missed Explicit Content', 'Content moderation AI failed to flag inappropriate images uploaded by users.', 'HIGH');