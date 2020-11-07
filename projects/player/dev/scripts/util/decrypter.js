var AES = require('cryptojs_aes'),
    SHA256 = require('cryptojs_sha256');

function decrypt(password, salt, encrypted) {

	try {
        // decrypt
        var saltedPassword = password + salt;
        var key = SHA256(saltedPassword, {
            asBytes: true
        });
        var plain = AES.decrypt(encrypted, key);

        // remove zero padding
        while (plain.charCodeAt(plain.length - 1) === 0) {
            plain = plain.substring(0, plain.length - 1);
        }
        return JSON.parse(plain);
    } catch (_) {
        return false;
    }

};


module.exports = {
	decrypt: decrypt
};