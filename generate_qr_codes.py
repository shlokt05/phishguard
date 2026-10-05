import os
import qrcode
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_styled_qr(url: str, output_path: str, logo_path: str = None, fill_color=(14, 165, 233), back_color=(10, 14, 23)):
    """
    Generate high-resolution QR Code with high error correction and embedded logo.
    """
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=16,
        border=3,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Base QR image in RGB
    qr_img = qr.make_image(fill_color=fill_color, back_color=back_color).convert("RGBA")

    if logo_path and os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        
        # Calculate size: logo should occupy ~22-25% of QR width to ensure readability
        qr_w, qr_h = qr_img.size
        logo_size = int(qr_w * 0.24)
        logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

        # Create rounded mask or circular background for logo with a glowing border
        bg_size = logo_size + 16
        logo_bg = Image.new("RGBA", (bg_size, bg_size), (10, 14, 23, 255))
        
        # Draw border on logo background
        draw_bg = ImageDraw.Draw(logo_bg)
        draw_bg.rounded_rectangle([0, 0, bg_size - 1, bg_size - 1], radius=16, fill=(10, 14, 23, 255), outline=(56, 189, 248, 255), width=3)
        
        # Paste logo on logo_bg
        logo_pos = ((bg_size - logo_size) // 2, (bg_size - logo_size) // 2)
        logo_bg.paste(logo, logo_pos, mask=logo)

        # Center on QR code
        pos = ((qr_w - bg_size) // 2, (qr_h - bg_size) // 2)
        qr_img.paste(logo_bg, pos, mask=logo_bg)

    qr_img.save(output_path, "PNG")
    print(f"Generated QR Code: {output_path} ({qr_img.size[0]}x{qr_img.size[1]})")
    return qr_img

def create_download_standee_poster(qr_img_path: str, logo_path: str, output_path: str, url: str):
    """
    Create a stunning, ultra-premium 1200x1600 Cyber-themed Download Standee Card
    """
    width, height = 1200, 1600
    card = Image.new("RGBA", (width, height), (10, 14, 23, 255))
    draw = ImageDraw.Draw(card)

    # 1. Subtle Cyber Grid & Tech background lines
    grid_color = (18, 30, 49, 180)
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 40):
        draw.line([(y, 0), (width, y)], fill=grid_color, width=1)

    # 2. Glowing Borders & Corner accents
    border_margin = 40
    # Outer dark border
    draw.rounded_rectangle(
        [border_margin, border_margin, width - border_margin, height - border_margin],
        radius=28,
        outline=(30, 41, 59, 255),
        width=3
    )
    # Inner Cyan Neon Accent border
    inner_margin = 48
    draw.rounded_rectangle(
        [inner_margin, inner_margin, width - inner_margin, height - inner_margin],
        radius=22,
        outline=(14, 165, 233, 140),
        width=2
    )

    # Corner brackets (Cyberpunk / Tactical look)
    corner_len = 60
    for cx, cy, dx, dy in [
        (inner_margin, inner_margin, 1, 1),
        (width - inner_margin, inner_margin, -1, 1),
        (inner_margin, height - inner_margin, 1, -1),
        (width - inner_margin, height - inner_margin, -1, -1)
    ]:
        draw.line([(cx, cy), (cx + dx * corner_len, cy)], fill=(56, 189, 248, 255), width=5)
        draw.line([(cx, cy), (cx, cy + dy * corner_len)], fill=(56, 189, 248, 255), width=5)

    # Fonts fallback helper
    def get_font(size: int, bold=False):
        font_names = [
            "segoeui.ttf", "segoeuib.ttf" if bold else "segoeui.ttf",
            "arialbd.ttf" if bold else "arial.ttf",
            "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
            "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"
        ]
        for fn in font_names:
            try:
                return ImageFont.truetype(fn, size)
            except Exception:
                continue
        return ImageFont.load_default()

    font_title = get_font(60, bold=True)
    font_subtitle = get_font(28, bold=False)
    font_tagline = get_font(24, bold=True)
    font_scan = get_font(38, bold=True)
    font_url = get_font(26, bold=True)
    font_badge = get_font(22, bold=True)
    font_inst = get_font(22, bold=False)

    # 3. Header: App Logo + Title
    current_y = 90
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        logo_head_size = 110
        logo = logo.resize((logo_head_size, logo_head_size), Image.Resampling.LANCZOS)
        logo_x = (width - logo_head_size) // 2
        card.paste(logo, (logo_x, current_y), mask=logo)
        current_y += logo_head_size + 20

    # Project Title
    title_text = "PHISHGUARD"
    draw.text((width // 2, current_y), title_text, fill=(241, 245, 249, 255), font=font_title, anchor="mt")
    current_y += 75

    # Subtitle
    sub_text = "Tactical Phishing Awareness & Cybersecurity Platform"
    draw.text((width // 2, current_y), sub_text, fill=(56, 189, 248, 255), font=font_subtitle, anchor="mt")
    current_y += 45

    # Tagline Pill
    tagline_pill = "THINK BEFORE YOU CLICK • LEARN • DETECT • PROTECT"
    pill_w = 780
    pill_h = 42
    pill_x = (width - pill_w) // 2
    draw.rounded_rectangle([pill_x, current_y, pill_x + pill_w, current_y + pill_h], radius=21, fill=(15, 23, 42, 230), outline=(56, 189, 248, 120), width=1)
    draw.text((width // 2, current_y + 9), tagline_pill, fill=(148, 163, 184, 255), font=font_tagline, anchor="mt")
    current_y += 75

    # 4. QR Code Card Container
    qr_card_w = 600
    qr_card_h = 600
    qr_card_x = (width - qr_card_w) // 2
    qr_card_y = current_y

    # Glow background behind QR
    draw.rounded_rectangle(
        [qr_card_x - 12, qr_card_y - 12, qr_card_x + qr_card_w + 12, qr_card_y + qr_card_h + 12],
        radius=32,
        fill=(14, 165, 233, 30),
        outline=(56, 189, 248, 180),
        width=2
    )
    # Inner White container for high-contrast instant scanning
    draw.rounded_rectangle(
        [qr_card_x, qr_card_y, qr_card_x + qr_card_w, qr_card_y + qr_card_h],
        radius=26,
        fill=(255, 255, 255, 255),
        outline=None
    )

    # Place QR Code inside
    if os.path.exists(qr_img_path):
        qr_obj = Image.open(qr_img_path).convert("RGBA")
        # Resize QR nicely to fit with padding
        qr_target_size = 530
        qr_obj = qr_obj.resize((qr_target_size, qr_target_size), Image.Resampling.LANCZOS)
        qr_offset_x = qr_card_x + (qr_card_w - qr_target_size) // 2
        qr_offset_y = qr_card_y + (qr_card_h - qr_target_size) // 2
        card.paste(qr_obj, (qr_offset_x, qr_offset_y), mask=qr_obj)

    current_y += qr_card_h + 35

    # 5. Scan Call to Action
    scan_headline = "SCAN WITH ANY PHONE CAMERA TO DOWNLOAD"
    draw.text((width // 2, current_y), scan_headline, fill=(52, 211, 153, 255), font=font_scan, anchor="mt")
    current_y += 55

    # 6. Feature Badges (3 pills: Android APK, Web App PWA, Verified & Safe)
    badge_y = current_y
    badges = [
        ("• ANDROID APK READY", (16, 185, 129)),
        ("• INSTANT PWA INSTALL", (56, 189, 248)),
        ("• 100% VERIFIED & SAFE", (168, 85, 247))
    ]
    b_width = 310
    b_height = 46
    total_b_width = len(badges) * b_width + (len(badges) - 1) * 20
    start_bx = (width - total_b_width) // 2

    for i, (b_text, b_color) in enumerate(badges):
        bx = start_bx + i * (b_width + 20)
        draw.rounded_rectangle([bx, badge_y, bx + b_width, badge_y + b_height], radius=23, fill=(15, 23, 42, 240), outline=(*b_color, 180), width=2)
        # Dot indicator
        draw.ellipse([bx + 18, badge_y + 17, bx + 28, badge_y + 27], fill=b_color)
        draw.text((bx + 38, badge_y + 12), b_text.replace("• ", ""), fill=(241, 245, 249, 255), font=font_badge)

    current_y += 75

    # 7. How to Install Steps Box
    box_w = 920
    box_h = 135
    box_x = (width - box_w) // 2
    draw.rounded_rectangle([box_x, current_y, box_x + box_w, current_y + box_h], radius=18, fill=(15, 23, 42, 220), outline=(51, 65, 85, 255), width=1)
    
    steps = [
        "1. Open Mobile Camera or Google Lens and point at the QR Code.",
        "2. Tap the notification banner to open PhishGuard instantly.",
        "3. Tap 'Download APK' for Android or 'Add to Home Screen' for Instant App."
    ]
    for s_idx, step in enumerate(steps):
        # Draw step number badge
        badge_num_x = box_x + 30
        badge_num_y = current_y + 18 + s_idx * 36
        draw.rounded_rectangle([badge_num_x, badge_num_y - 2, badge_num_x + 24, badge_num_y + 22], radius=6, fill=(14, 165, 233, 40), outline=(56, 189, 248, 120), width=1)
        draw.text((badge_num_x + 12, badge_num_y + 1), str(s_idx + 1), fill=(56, 189, 248, 255), font=font_tagline, anchor="mt")
        draw.text((badge_num_x + 36, badge_num_y), step[3:], fill=(226, 232, 240, 255), font=font_inst)

    current_y += box_h + 30

    # 8. Footer URL
    url_box_w = 780
    url_box_h = 44
    url_box_x = (width - url_box_w) // 2
    draw.rounded_rectangle([url_box_x, current_y, url_box_x + url_box_w, current_y + url_box_h], radius=22, fill=(10, 14, 23, 255), outline=(56, 189, 248, 100), width=1)
    draw.text((width // 2, current_y + 9), f"DIRECT LINK: {url}", fill=(56, 189, 248, 255), font=font_url, anchor="mt")

    card.save(output_path, "PNG")
    print(f"Generated Standee Poster: {output_path} ({width}x{height})")
    return card

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    logo_file = os.path.join(base_dir, "frontend", "public", "icon-192.png")
    
    # 1. Target URL for Portal & Web App
    app_url = "https://shlokt05.github.io/phishguard/"
    # 2. Target URL for Direct APK Download
    apk_url = "https://shlokt05.github.io/phishguard/PhishGuard.apk"
    
    # A. Universal Clean QR (Web Portal + PWA Install)
    qr_clean_path = os.path.join(base_dir, "PhishGuard_Clean_QR.png")
    create_styled_qr(app_url, qr_clean_path, logo_path=logo_file, fill_color=(10, 14, 23), back_color=(255, 255, 255))
    
    # B. Direct APK Download QR (Directly triggers .apk file download on scan)
    qr_apk_path = os.path.join(base_dir, "PhishGuard_Direct_APK_QR.png")
    create_styled_qr(apk_url, qr_apk_path, logo_path=logo_file, fill_color=(10, 14, 23), back_color=(255, 255, 255))
    
    # C. Cyber Themed QR
    qr_cyber_path = os.path.join(base_dir, "PhishGuard_Cyber_QR.png")
    create_styled_qr(app_url, qr_cyber_path, logo_path=logo_file, fill_color=(56, 189, 248), back_color=(10, 14, 23))
    
    # D. Full Standee Presentation Poster (Ready to print & share)
    poster_path = os.path.join(base_dir, "PhishGuard_Download_Card.png")
    create_download_standee_poster(qr_clean_path, logo_file, poster_path, app_url)
    
    # Copy QRs to frontend public folder so they are hosted and downloadable
    public_dir = os.path.join(base_dir, "frontend", "public")
    import shutil
    shutil.copyfile(qr_clean_path, os.path.join(public_dir, "PhishGuard_QR.png"))
    shutil.copyfile(qr_apk_path, os.path.join(public_dir, "PhishGuard_Direct_APK_QR.png"))
    shutil.copyfile(poster_path, os.path.join(public_dir, "PhishGuard_Download_Card.png"))
    print("All QR Codes and Posters synced to frontend/public/")

