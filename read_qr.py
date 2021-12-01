from pyzbar.pyzbar import decode
from PIL import Image
import sys
result = decode(Image.open(sys.argv[1]))[0]
print(str(result[0].decode('UTF-8')))
