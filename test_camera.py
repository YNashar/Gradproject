import cv2

print("Testing camera access...")

# Test different camera indices
for i in range(5):
    print(f"Testing camera index {i}...")
    cap = cv2.VideoCapture(i)
    if cap.isOpened():
        ret, frame = cap.read()
        if ret and frame is not None:
            print(f"SUCCESS: Camera {i} works! Frame shape: {frame.shape}")
            cap.release()
            break
        else:
            print(f"FAIL: Camera {i} opens but can't read frames")
        cap.release()
    else:
        print(f"FAIL: Camera {i} not available")
else:
    print("No working cameras found with default backend")

print("Camera test complete.")