# Download all society logos to public/logos/
import urllib.request
import os
import ssl

# Disable SSL verification for some legacy http URLs
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

output_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'logos')
os.makedirs(output_dir, exist_ok=True)

logos = {
    'ccs': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAUnY7opxCE0em9YbuWSb3kWo0i55fEarOcA&s',
    'care': 'https://thapar.edu/upload/images/CARE.jpg',
    'enactus': 'https://thapar.edu/upload/images/ENACTUS.jpeg',
    'edc': 'https://thapar.edu/upload/images/EDC.png',
    'faps': 'https://thapar.edu/upload/images/FAPS.jpg',
    'frosh': 'https://thapar.edu/upload/images/Frosh.jpg',
    'gene': 'https://thapar.edu/upload/images/genesoc.png',
    'girlup': 'https://thapar.edu/upload/images/GIRLUPTIET.png',
    'iic': 'https://thapar.edu/upload/images/IIC.png',
    'lead': 'https://thapar.edu/upload/images/LEAD.png',
    'litsoc': 'https://thapar.edu/upload/images/LitSoc.png',
    'maps': 'https://thapar.edu/upload/images/MAPS.jpg',
    'mars': 'https://thapar.edu/upload/images/Mechatronics%20&%20Robotics1.png',
    'mudra': 'https://thapar.edu/upload/images/MUDRA.png',
    'pws': 'https://thapar.edu/upload/images/PWS.png',
    'sis': 'https://thapar.edu/upload/images/TAAS.png',  # fallback
    'ssa': 'https://thapar.edu/upload/images/SSA.jpg',
    'sae': 'https://thapar.edu/upload/images/SAELogo.png',
    'sports-sc': 'https://thapar.edu/upload/images/IEI.png',  # placeholder
    'tumun': 'https://thapar.edu/upload/images/TUMUN.png',
    'tsce': 'https://thapar.edu/upload/images/TSCE.png',
    'tie': 'https://thapar.edu/upload/images/TMS.png',  # placeholder
    'quiz': 'https://thapar.edu/upload/images/econ.png',  # placeholder
    'placement': 'https://thapar.edu/upload/images/LEAD.png',  # placeholder
    'zeitgeist': 'https://thapar.edu/upload/images/Spic%20Macay.png',  # placeholder
    'sce': 'https://thapar.edu/upload/images/Pratigya.png',  # Pratigya
    # Clubs
    'adventure': 'https://thapar.edu/upload/images/Adventure%20Club.jpg',
    'nox': 'https://thapar.edu/upload/images/NOX.jpg',
    'dsc': 'https://thapar.edu/upload/images/DSC.png',
    'echoes': 'https://thapar.edu/upload/images/Echoes.png',
    'econ': 'https://thapar.edu/upload/images/econ.png',
    'ebsb': 'https://thapar.edu/upload/images/EBSB.png',
    'electoral': 'https://thapar.edu/upload/images/electoral_club.png',
    'ecc': 'https://thapar.edu/upload/images/ECC.png',
    'gcc': 'https://thapar.edu/upload/images/GCC.png',
    'health': 'https://thapar.edu/upload/images/TFC.png',
    'rotaract': 'https://thapar.edu/upload/files/rot.jpg',
    'toastmasters': 'https://thapar.edu/upload/images/Toastmasters.png',
    'tmc': 'https://thapar.edu/upload/images/TMC.jpg',
    'tsc': 'https://thapar.edu/upload/images/BIS.png',
    # Chapters
    'acm': 'https://thapar.edu/upload/images/ACM.png',
    'aiche': 'https://thapar.edu/upload/images/AICHE.png',
    'ashrae': 'https://thapar.edu/upload/images/ASHRAE.png',
    'iiche': 'https://thapar.edu/upload/images/IICHE.png',
    'iste': 'https://thapar.edu/upload/images/ISTE.png',
    'iete': 'https://thapar.edu/upload/images/IETE.jpg',
    'iei': 'https://thapar.edu/upload/images/IEI.png',
    'aiesec': 'https://thapar.edu/upload/images/AIESEC.png',
    'mlsc': 'https://thapar.edu/upload/images/MSC.png',
    'owasp': 'https://thapar.edu/upload/images/OWASP.png',
    'rotaract-ch': 'https://thapar.edu/upload/files/rot.jpg',
    'tedx': 'https://thapar.edu/upload/images/Tedx.png',
    'youth-united': 'https://thapar.edu/upload/images/YU.png',
    # Cells
    'saic': 'https://thapar.edu/upload/images/SAIC.png',
    'dosa': 'https://ticc.thapar.edu/assets/image.png',
    # Units
    'ncc': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png/960px-Emblem_of_National_Cadet_Corps_%28India%29.png',
    'nss': 'https://thapar.edu/upload/images/NSS.png',
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

success = 0
failed = 0
for org_id, url in logos.items():
    ext = url.split('.')[-1].split('?')[0].lower()
    if ext not in ('png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'):
        ext = 'png'
    filename = f"{org_id}.{ext}"
    filepath = os.path.join(output_dir, filename)
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            data = resp.read()
            with open(filepath, 'wb') as f:
                f.write(data)
        print(f"OK  {org_id} -> {filename} ({len(data)} bytes)")
        success += 1
    except Exception as e:
        print(f"ERR {org_id} -> {e}")
        failed += 1

print(f"\nDone: {success} downloaded, {failed} failed")
