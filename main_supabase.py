import cv2
import os
import numpy as np
import requests
from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY, STORAGE_BUCKET
from datetime import datetime
import tempfile

# Initialize Supabase client
try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("✓ Connected to Supabase")
except Exception as e:
    print(f"✗ Failed to connect to Supabase: {e}")
    exit(1)

# Face detection setup
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
face_cascade_alt = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_alt.xml')
face_recognizer = cv2.face.LBPHFaceRecognizer_create(radius=1, neighbors=8, grid_x=8, grid_y=8)

known_faces = []
known_names = []
face_ids = []
student_db_ids = []

def download_image_from_supabase(image_url):
    """Download image from Supabase storage and return as OpenCV image"""
    try:
        response = requests.get(image_url)
        if response.status_code == 200:
            # Convert to numpy array
            nparr = np.frombuffer(response.content, np.uint8)
            # Decode image
            image = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
            return image
        else:
            print(f"Failed to download image: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error downloading image: {e}")
        return None

def detect_faces_with_preprocessing(image):
    """Detect faces using multiple methods with preprocessing"""
    if image is None:
        return []
    
    # Apply histogram equalization to improve contrast
    image = cv2.equalizeHist(image)
    
    # Try multiple face detection methods
    faces = face_cascade.detectMultiScale(image, 1.1, 4, minSize=(50, 50))
    if len(faces) == 0:
        faces = face_cascade_alt.detectMultiScale(image, 1.1, 4, minSize=(50, 50))
    if len(faces) == 0:
        # More sensitive detection for glasses
        faces = face_cascade.detectMultiScale(image, 1.05, 3, minSize=(30, 30))
    
    return faces

def load_students_from_supabase():
    """Load student data and images from Supabase"""
    try:
        print("Loading student data from Supabase...")
        
        # Get all students with their images
        response = supabase.table('students').select('*, student_images(*)').execute()
        
        if not response.data:
            print("No students found in database")
            return
        
        print(f"Found {len(response.data)} students in database")
        
        for student_idx, student in enumerate(response.data):
            student_name = student['name']
            student_db_id = student['id']
            images = student.get('student_images', [])
            
            print(f"Processing {len(images)} images for {student_name}...")
            
            for image_data in images:
                image_url = image_data['image_url']
                image_name = image_data['image_name']
                
                # Download and process image
                image = download_image_from_supabase(image_url)
                
                if image is not None:
                    faces = detect_faces_with_preprocessing(image)
                    
                    if len(faces) > 0:
                        # Take the largest face
                        largest_face = max(faces, key=lambda face: face[2] * face[3])
                        x, y, w, h = largest_face
                        face_roi = image[y:y+h, x:x+w]
                        
                        # Enhance face for better recognition
                        face_roi = cv2.equalizeHist(face_roi)
                        face_roi = cv2.resize(face_roi, (100, 100))
                        
                        known_faces.append(face_roi)
                        known_names.append(student_name)
                        face_ids.append(student_idx)
                        student_db_ids.append(student_db_id)
                        print(f"  ✓ Added face from {image_name} (size: {w}x{h})")
                    else:
                        print(f"  ✗ No face detected in {image_name}")
                else:
                    print(f"  ✗ Could not download {image_name}")
        
        if len(known_faces) > 0:
            face_recognizer.train(known_faces, np.array(face_ids))
            print(f"✓ Trained with {len(known_faces)} faces from {len(set(known_names))} students")
        else:
            print("✗ No faces found for training!")
            
    except Exception as e:
        print(f"Error loading students from Supabase: {e}")

def log_attendance(student_db_id, confidence):
    """Log attendance to Supabase"""
    try:
        data = {
            'student_id': student_db_id,
            'confidence_score': float(confidence),
            'status': 'present'
        }
        
        result = supabase.table('attendance').insert(data).execute()
        print(f"✓ Logged attendance for student")
        return True
    except Exception as e:
        print(f"Error logging attendance: {e}")
        return False

def main():
    # Load students and train face recognizer
    load_students_from_supabase()
    
    if len(known_faces) == 0:
        print("No trained faces available. Please add students to Supabase first.")
        return
    
    # Open camera
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Error: Could not open camera")
        return
    
    print("Camera opened successfully")
    print("Press 'q' to quit, 'a' to log attendance")
    
    last_attendance_log = {}  # Track last attendance time for each student
    
    while True:
        ret, frame = cap.read()
        
        if not ret or frame is None:
            print("Error: Could not read frame from camera")
            break
            
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        # Apply histogram equalization for better contrast with glasses
        gray = cv2.equalizeHist(gray)
        
        # Try multiple face detection approaches
        faces = face_cascade.detectMultiScale(gray, 1.1, 4, minSize=(80, 80))
        if len(faces) == 0:
            faces = face_cascade_alt.detectMultiScale(gray, 1.1, 4, minSize=(80, 80))
        if len(faces) == 0:
            # More sensitive for glasses
            faces = face_cascade.detectMultiScale(gray, 1.05, 3, minSize=(60, 60))
        
        current_time = datetime.now()
        
        for (x, y, w, h) in faces:
            face_roi = gray[y:y+h, x:x+w]
            
            if len(known_faces) > 0:
                # Enhance face preprocessing like in training
                face_roi = cv2.equalizeHist(face_roi)
                face_roi_resized = cv2.resize(face_roi, (100, 100))
                label, confidence = face_recognizer.predict(face_roi_resized)
                
                # More lenient threshold for glasses
                if confidence < 100 and label < len(set(known_names)):
                    # Get unique student names
                    unique_students = list(dict.fromkeys(known_names))
                    name = unique_students[label]
                    
                    if confidence < 60:
                        color = (0, 255, 0)  # Green for high confidence
                        status = "RECOGNIZED"
                    else:
                        color = (0, 255, 255)  # Yellow for medium confidence
                        status = "MAYBE"
                        
                    # Auto-log attendance for high confidence recognition
                    if confidence < 60:
                        student_key = f"{name}_{label}"
                        # Log attendance only once every 30 seconds to avoid spam
                        if (student_key not in last_attendance_log or 
                            (current_time - last_attendance_log[student_key]).seconds > 30):
                            
                            # Find the student's DB ID
                            student_db_id = None
                            for i, stored_name in enumerate(known_names):
                                if stored_name == name and i < len(student_db_ids):
                                    student_db_id = student_db_ids[i]
                                    break
                            
                            if student_db_id:
                                if log_attendance(student_db_id, confidence):
                                    last_attendance_log[student_key] = current_time
                else:
                    name = "Unknown"
                    color = (0, 0, 255)  # Red for unknown
                    status = "UNKNOWN"
            else:
                name = "Unknown"
                color = (0, 0, 255)
                confidence = 0
                status = "NO_TRAINING"
            
            cv2.rectangle(frame, (x, y), (x+w, y+h), color, 2)
            cv2.putText(frame, f"{name} ({confidence:.0f})", (x, y-10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
            cv2.putText(frame, status, (x, y+h+20), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)
        
        cv2.imshow("Attendance System - Supabase", frame)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('a'):
            print("Manual attendance logging not implemented in this version")
    
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()