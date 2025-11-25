import os
import cv2
from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY, STORAGE_BUCKET

def upload_students_to_supabase():
    """Upload existing student photos to Supabase"""
    
    # Initialize Supabase client
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("SUCCESS: Connected to Supabase")
    except Exception as e:
        print(f"FAILED: Failed to connect to Supabase: {e}")
        return False
    
    # Local photos directory
    student_photos_dir = r"C:\Users\youss\Desktop\Grad Project\Students"
    
    if not os.path.exists(student_photos_dir):
        print(f"Directory not found: {student_photos_dir}")
        return False
    
    # Group photos by student name
    student_groups = {}
    for filename in os.listdir(student_photos_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            name_parts = filename.split()
            if len(name_parts) > 0:
                student_name = name_parts[0]
                if student_name not in student_groups:
                    student_groups[student_name] = []
                student_groups[student_name].append(filename)
    
    print(f"Found students: {list(student_groups.keys())}")
    
    # Note: Create storage bucket manually in Supabase dashboard
    # Go to Storage -> Create a new bucket named "student-images" with public access
    print(f"Note: Make sure bucket '{STORAGE_BUCKET}' exists in Supabase Storage")
    
    # Upload each student and their photos
    for student_name, photo_files in student_groups.items():
        try:
            print(f"\nProcessing student: {student_name}")
            
            # Check if student already exists
            existing_student = supabase.table('students').select('*').eq('name', student_name).execute()
            
            if existing_student.data:
                student_id = existing_student.data[0]['id']
                print(f"  Student already exists with ID: {student_id}")
            else:
                # Create new student record
                student_data = {
                    'name': student_name,
                    'student_id': f"STU_{student_name.upper()}_001"
                }
                
                result = supabase.table('students').insert(student_data).execute()
                student_id = result.data[0]['id']
                print(f"  SUCCESS: Created student record with ID: {student_id}")
            
            # Upload photos for this student
            for filename in photo_files:
                try:
                    file_path = os.path.join(student_photos_dir, filename)
                    
                    # Read the image file
                    with open(file_path, 'rb') as file:
                        file_data = file.read()
                    
                    # Upload to Supabase storage
                    storage_path = f"{student_name}/{filename}"
                    
                    # Check if file already exists
                    try:
                        existing_files = supabase.storage.from_(STORAGE_BUCKET).list(student_name)
                        existing_names = [f['name'] for f in existing_files]
                        
                        if filename in existing_names:
                            print(f"    File already exists: {filename}")
                            # Get the public URL
                            public_url = supabase.storage.from_(STORAGE_BUCKET).get_public_url(storage_path)
                        else:
                            # Upload new file
                            upload_result = supabase.storage.from_(STORAGE_BUCKET).upload(
                                storage_path, file_data
                            )
                            
                            if upload_result:
                                print(f"    SUCCESS: Uploaded: {filename}")
                                # Get the public URL
                                public_url = supabase.storage.from_(STORAGE_BUCKET).get_public_url(storage_path)
                            else:
                                print(f"    FAILED: Failed to upload: {filename}")
                                continue
                    except Exception as upload_error:
                        print(f"    Upload error for {filename}: {upload_error}")
                        continue
                    
                    # Check if image record already exists
                    existing_image = supabase.table('student_images').select('*').eq('student_id', student_id).eq('image_name', filename).execute()
                    
                    if not existing_image.data:
                        # Create image record in database
                        image_data = {
                            'student_id': student_id,
                            'image_url': public_url,
                            'image_name': filename,
                            'is_primary': len(photo_files) == 1 or filename == photo_files[0]
                        }
                        
                        image_result = supabase.table('student_images').insert(image_data).execute()
                        
                        if image_result.data:
                            print(f"    SUCCESS: Created image record: {filename}")
                        else:
                            print(f"    FAILED: Failed to create image record: {filename}")
                    else:
                        print(f"    Image record already exists: {filename}")
                        
                except Exception as file_error:
                    print(f"    Error processing {filename}: {file_error}")
                    continue
                    
        except Exception as student_error:
            print(f"Error processing student {student_name}: {student_error}")
            continue
    
    print(f"\nSUCCESS: Upload process completed!")
    return True

def list_uploaded_students():
    """List all students and their images from Supabase"""
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get all students with their images
        response = supabase.table('students').select('*, student_images(*)').execute()
        
        print(f"\nStudents in Supabase ({len(response.data)} total):")
        print("-" * 50)
        
        for student in response.data:
            print(f"Name: {student['name']}")
            print(f"ID: {student['id']}")
            print(f"Student ID: {student.get('student_id', 'N/A')}")
            
            images = student.get('student_images', [])
            print(f"Images ({len(images)}):")
            for img in images:
                print(f"  - {img['image_name']} (Primary: {img.get('is_primary', False)})")
            print("-" * 30)
            
    except Exception as e:
        print(f"Error listing students: {e}")

if __name__ == "__main__":
    print("Supabase Student Upload Tool")
    print("=" * 40)
    
    choice = input("Choose an option:\n1. Upload students to Supabase\n2. List uploaded students\nChoice (1/2): ")
    
    if choice == "1":
        upload_students_to_supabase()
    elif choice == "2":
        list_uploaded_students()
    else:
        print("Invalid choice")