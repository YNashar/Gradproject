import cv2
import os
import numpy as np

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
face_cascade_alt = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_alt.xml')
face_recognizer = cv2.face.LBPHFaceRecognizer_create(radius=1, neighbors=8, grid_x=8, grid_y=8)

known_faces = []
known_names = []
face_ids = []

print("Loading student faces...")
student_photos_dir = r"C:\Users\youss\Desktop\Grad Project\Students"

# Group photos by student name
student_groups = {}
for filename in os.listdir(student_photos_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        # Extract student name (everything before the first number/space)
        name_parts = filename.split()
        if len(name_parts) > 0:
            student_name = name_parts[0]
            if student_name not in student_groups:
                student_groups[student_name] = []
            student_groups[student_name].append(filename)

print(f"Found students: {list(student_groups.keys())}")

# Train on all photos for each student
for student_id, (student_name, photo_files) in enumerate(student_groups.items()):
    print(f"Training on {len(photo_files)} photos for {student_name}...")
    
    for filename in photo_files:
        image_path = os.path.join(student_photos_dir, filename)
        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        
        if image is not None:
            # Apply histogram equalization to improve contrast
            image = cv2.equalizeHist(image)
            
            # Try multiple face detection methods
            faces = face_cascade.detectMultiScale(image, 1.1, 4, minSize=(50, 50))
            if len(faces) == 0:
                faces = face_cascade_alt.detectMultiScale(image, 1.1, 4, minSize=(50, 50))
            if len(faces) == 0:
                # More sensitive detection for glasses
                faces = face_cascade.detectMultiScale(image, 1.05, 3, minSize=(30, 30))
            
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
                face_ids.append(student_id)
                print(f"  SUCCESS: Added face from {filename} (size: {w}x{h})")
            else:
                print(f"  FAIL: No face detected in {filename}")
        else:
            print(f"  FAIL: Could not load {filename}")

if len(known_faces) > 0:
    face_recognizer.train(known_faces, np.array(face_ids))
    print(f"Trained with {len(known_faces)} faces")
else:
    print("No faces found in student photos!")

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open camera. Make sure your camera is not being used by another application.")
    exit()

print("Camera opened successfully")

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
    
    for (x, y, w, h) in faces:
        face_roi = gray[y:y+h, x:x+w]
        
        if len(known_faces) > 0:
            # Enhance face preprocessing like in training
            face_roi = cv2.equalizeHist(face_roi)
            face_roi_resized = cv2.resize(face_roi, (100, 100))
            label, confidence = face_recognizer.predict(face_roi_resized)
            
            # More lenient threshold for glasses
            if confidence < 100 and label < len(student_groups):
                student_names = list(student_groups.keys())
                name = student_names[label]
                if confidence < 60:
                    color = (0, 255, 0)  # Green for high confidence
                else:
                    color = (0, 255, 255)  # Yellow for medium confidence
            else:
                name = "Unknown"
                color = (0, 0, 255)  # Red for unknown
        else:
            name = "Unknown"
            color = (0, 0, 255)
            confidence = 0
        
        cv2.rectangle(frame, (x, y), (x+w, y+h), color, 2)
        cv2.putText(frame, f"{name} ({confidence:.0f})", (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
    
    cv2.imshow("Camera", frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
