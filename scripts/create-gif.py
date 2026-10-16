import os
from PIL import Image

FRAMES_DIR = os.path.join(os.path.dirname(__file__), "frames")
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "public", "media", "dsm-demo.gif")

frame_files = sorted([f for f in os.listdir(FRAMES_DIR) if f.startswith("frame_") and f.endswith(".png")])

if not frame_files:
    print("No frame files found in", FRAMES_DIR)
    exit(1)

print(f"Loading {len(frame_files)} animation frames...")
images = []
for f in frame_files:
    img_path = os.path.join(FRAMES_DIR, f)
    img = Image.open(img_path).convert("RGB")
    # Resize slightly for optimized GIF rendering & crisp display (960x600)
    resized = img.resize((960, 600), Image.Resampling.LANCZOS)
    # Quantize to 256 colors with dithering for maximum visual quality on dark canvas
    quantized = resized.quantize(colors=256, method=Image.Resampling.LANCZOS)
    images.append(quantized)

# Define duration for each frame (in milliseconds)
# Hero: 1800ms, Interactions: 1400ms, Modal: 2000ms
durations = [1800, 1000, 1600, 1400, 1400, 1400, 1400, 1400, 1600, 2200]

# Ensure durations matches number of frames
if len(durations) != len(images):
    durations = [1500] * len(images)

print("Assembling animated GIF...")
images[0].save(
    OUTPUT_PATH,
    save_all=True,
    append_images=images[1:],
    duration=durations,
    loop=0,
    optimize=True
)

file_size_mb = os.path.getsize(OUTPUT_PATH) / (1024 * 1024)
print(f"High-quality GIF generated successfully: {OUTPUT_PATH} ({file_size_mb:.2f} MB)")
