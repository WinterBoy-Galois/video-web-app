#!/usr/bin/env python
# -*- encoding: utf-8 -*-
 

DECRYPTOR = """<HTML	
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<title>$title</title> 
<style type="text/css"> 
html {overflow: auto;} 
html, body, div, iframe {margin: 0px; padding: 0px; height: 100%; border: none;} 
iframe {display: block; width: 100%; border: none; overflow-y: auto; overflow-x: hidden;} 
</style> 
</head> 
<body> 
<iframe id="magicframe" name="magicframe" src="about:blank" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="100%" scrolling="auto"></iframe> 
</body>
<script type="text/javascript" src="http://crypto-js.googlecode.com/files/2.0.0-crypto-sha1-hmac-pbkdf2-ofb-aes.js"></script>
<script type="text/javascript" src="http://crypto-js.googlecode.com/files/2.0.0-sha256-min.js"></script>
<script type="text/javascript">
    var crypted = "$encryptedhtml"
    var password = prompt("$message", "")
    var key = Crypto.SHA256(password, { asBytes: true });
    var plain = Crypto.AES.decrypt(crypted, key);
    var iframe = document.getElementById("magicframe");
    var iframedoc = iframe.document;
    if (iframe.contentDocument)
        iframedoc = iframe.contentDocument;
    else if (iframe.contentWindow)
        iframedoc = iframe.contentWindow.document;
    if (iframe) {
        iframedoc.open();
        iframedoc.writeln(plain);
        iframedoc.close();
    } else {
    document.open('text/html');
    document.write(plain);
    document.close();
    }
</script>
</html>
"""

from os import urandom
from hashlib import sha256
from Crypto.Cipher import AES
from base64 import b64encode
 
import json


def encrypt(data, password):
	plain = json.dumps(data)
	key = sha256(password).digest()

	padded = plain+(16 - len(plain)%16) * chr(0)
	iv = urandom(16)

	mode = AES.MODE_OFB
	encryptor = AES.new(key, mode,iv)

	cryptedbytes = encryptor.encrypt(padded)
	return b64encode(iv + cryptedbytes)


data = {
	"var1": "info",
	"var2": "info2"
}

password = "videopath"

print encrypt(data, password)
