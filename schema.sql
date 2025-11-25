-- Students table to store student information
CREATE TABLE IF NOT EXISTS students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    student_id VARCHAR(50) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student images table to store multiple photos per student
CREATE TABLE IF NOT EXISTS student_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance records table
CREATE TABLE IF NOT EXISTS attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confidence_score FLOAT,
    status VARCHAR(20) DEFAULT 'present'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id);
CREATE INDEX IF NOT EXISTS idx_student_images_student_id ON student_images(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_timestamp ON attendance(timestamp);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (modify based on your security needs)
CREATE POLICY "Allow public read access on students" ON students FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on students" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on students" ON students FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on student_images" ON student_images FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on student_images" ON student_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on student_images" ON student_images FOR UPDATE USING (true);

CREATE POLICY "Allow public read access on attendance" ON attendance FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on attendance" ON attendance FOR INSERT WITH CHECK (true);