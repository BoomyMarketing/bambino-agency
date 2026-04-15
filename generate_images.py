"""
generate_images.py
Генерує брендовані зображення для Bambino Agency:
  - /img/og-default.jpg  (1200x630px) — OG / social sharing image
  - /logo.png            (400x120px)  — Logo for schema & Knowledge Panel
  - /favicon.ico         (32x32px)    — Browser tab icon
  - /apple-touch-icon.png (180x180px) — iOS home screen icon

Кольори бренду:
  Orange: #FF4D00
  Green:  #034C3C
  Cream:  #F9F9F5
"""

import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(ROOT, 'img')
os.makedirs(IMG_DIR, exist_ok=True)

# Brand colors
ORANGE = (255, 77, 0)
GREEN  = (3, 76, 60)
CREAM  = (249, 249, 245)
WHITE  = (255, 255, 255)
MUTED  = (102, 102, 96)

def get_font(size, bold=False):
    """Fallback на системний шрифт якщо немає кастомного."""
    try:
        if bold:
            return ImageFont.truetype("arialbd.ttf", size)
        return ImageFont.truetype("arial.ttf", size)
    except:
        return ImageFont.load_default()

def draw_centered_text(draw, text, y, width, font, fill):
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    draw.text((x, y), text, fill=fill, font=font)
    return bbox[3] - bbox[1]  # text height

# ─────────────────────────────────────────────
# 1. OG Default Image — 1200x630
# ─────────────────────────────────────────────
def make_og_image():
    W, H = 1200, 630
    img = Image.new('RGB', (W, H), color=GREEN)
    draw = ImageDraw.Draw(img)

    # Background pattern — subtle dots grid
    for x in range(0, W, 40):
        for y in range(0, H, 40):
            draw.ellipse([x-1, y-1, x+1, y+1], fill=(255, 255, 255, 10))

    # Left orange accent bar
    draw.rectangle([0, 0, 8, H], fill=ORANGE)

    # Top-left: orange dot decorator
    draw.ellipse([60, 60, 140, 140], fill=ORANGE)
    draw.ellipse([70, 70, 130, 130], fill=GREEN)

    # Brand name — large
    font_brand = get_font(96, bold=True)
    font_tagline = get_font(36)
    font_stats = get_font(28, bold=True)
    font_label = get_font(22)

    # "Bambino" centered
    draw_centered_text(draw, "Bambino", 180, W, font_brand, WHITE)

    # Tagline
    draw_centered_text(draw, "Manchester's Digital Marketing Agency", 310, W, font_tagline, (200, 200, 196))

    # Orange divider line
    line_y = 380
    draw.rectangle([W//2 - 60, line_y, W//2 + 60, line_y + 3], fill=ORANGE)

    # Stats row
    stats = [("400+", "UK Clients"), ("320%", "Avg. Traffic Growth"), ("9.1×", "Average ROAS")]
    col_w = W // 3
    for i, (num, label) in enumerate(stats):
        cx = col_w * i + col_w // 2
        # Number
        bbox = draw.textbbox((0, 0), num, font=font_stats)
        nw = bbox[2] - bbox[0]
        draw.text((cx - nw // 2, 420), num, fill=ORANGE, font=font_stats)
        # Label
        bbox2 = draw.textbbox((0, 0), label, font=font_label)
        lw = bbox2[2] - bbox2[0]
        draw.text((cx - lw // 2, 465), label, fill=(160, 160, 156), font=font_label)

    # Bottom URL
    font_url = get_font(24)
    draw_centered_text(draw, "bambinoagency.com", 560, W, font_url, (120, 160, 140))

    path = os.path.join(IMG_DIR, 'og-default.jpg')
    img.save(path, 'JPEG', quality=90, optimize=True)
    size_kb = os.path.getsize(path) // 1024
    print(f'  Created: img/og-default.jpg ({size_kb}KB)')

# ─────────────────────────────────────────────
# 2. Logo PNG — 400x120 (transparent background)
# ─────────────────────────────────────────────
def make_logo():
    W, H = 400, 120
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    font_logo = get_font(72, bold=True)
    font_tag  = get_font(20)

    # "Bambino" in green
    draw.text((10, 10), "Bambino", fill=GREEN + (255,), font=font_logo)

    # Tagline
    draw.text((12, 90), "Digital Marketing Agency", fill=MUTED + (255,), font=font_tag)

    # Orange dot accent
    draw.ellipse([370, 10, 395, 35], fill=ORANGE + (255,))

    path = os.path.join(ROOT, 'logo.png')
    img.save(path, 'PNG', optimize=True)
    size_kb = os.path.getsize(path) // 1024
    print(f'  Created: logo.png ({size_kb}KB)')

# ─────────────────────────────────────────────
# 3. Favicon ICO — 32x32
# ─────────────────────────────────────────────
def make_favicon():
    # 32x32 green square with orange "B"
    img = Image.new('RGB', (32, 32), color=GREEN)
    draw = ImageDraw.Draw(img)
    font = get_font(22, bold=True)
    bbox = draw.textbbox((0, 0), "B", font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(((32 - tw) // 2, (32 - th) // 2 - 2), "B", fill=ORANGE, font=font)

    path = os.path.join(ROOT, 'favicon.ico')
    img.save(path, format='ICO', sizes=[(32, 32), (16, 16)])
    print(f'  Created: favicon.ico')

# ─────────────────────────────────────────────
# 4. Apple Touch Icon — 180x180
# ─────────────────────────────────────────────
def make_apple_touch():
    img = Image.new('RGB', (180, 180), color=GREEN)
    draw = ImageDraw.Draw(img)
    font = get_font(110, bold=True)
    bbox = draw.textbbox((0, 0), "B", font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(((180 - tw) // 2, (180 - th) // 2 - 8), "B", fill=ORANGE, font=font)

    path = os.path.join(ROOT, 'apple-touch-icon.png')
    img.save(path, 'PNG', optimize=True)
    print(f'  Created: apple-touch-icon.png')

if __name__ == '__main__':
    print('Generating brand images...')
    make_og_image()
    make_logo()
    make_favicon()
    make_apple_touch()
    print('Done.')
