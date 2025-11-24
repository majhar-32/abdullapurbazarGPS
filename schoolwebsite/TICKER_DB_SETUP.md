-- Add showInTicker column to notices table
ALTER TABLE notices 
ADD COLUMN show_in_ticker BOOLEAN DEFAULT FALSE NOT NULL;

-- Create ticker_settings table
CREATE TABLE IF NOT EXISTS ticker_settings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    scroll_speed VARCHAR(20) DEFAULT 'MEDIUM',
    max_items INT DEFAULT 10,
    enabled BOOLEAN DEFAULT TRUE
);

-- Insert default settings
INSERT INTO ticker_settings (scroll_speed, max_items, enabled) 
VALUES ('MEDIUM', 10, TRUE);
