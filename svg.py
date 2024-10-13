import svgwrite

# Create an SVG drawing
dwg = svgwrite.Drawing('mujahid_classic_logo.svg', profile='tiny', size=("200px", "200px"))

# Background circle for a classic look
dwg.add(dwg.circle(center=("100px", "100px"), r="80px", fill="#e5e5e5", stroke="#0099ff", stroke_width="5"))

# Adding the text with classic font style
dwg.add(dwg.text('M', insert=("70px", "115px"), font_size="90px", fill="#0099ff", font_family="Times New Roman"))

# Border for a vintage, classical vibe
dwg.add(dwg.rect(insert=("10px", "10px"), size=("180px", "180px"), stroke="#555555", stroke_width="3", fill="none"))

# Save the file
dwg.save()