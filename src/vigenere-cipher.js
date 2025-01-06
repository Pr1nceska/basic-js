const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  processMessage(msg, key, isEncrypt) {
    if (!msg || !key) throw new Error("Incorrect arguments!");

    const res = [];
    const message = msg.toUpperCase();
    const k = key.toUpperCase();
    let keyIndex = 0;

    [...message].forEach((char) => {
      if (char.match(/[A-Z]/)) {
        const mi = char.charCodeAt(0) - 65;
        const ki = k[keyIndex % k.length].charCodeAt(0) - 65;
        const ci = isEncrypt
          ? ((mi + ki) % 26) + 65
          : ((mi - ki + 26) % 26) + 65;

        res.push(String.fromCharCode(ci));
        keyIndex++;
      } else {
        res.push(char);
      }
    });

    return this.direct ? res.join("") : res.reverse().join("");
  }

  encrypt(msg, key) {
    return this.processMessage(msg, key, true);
  }

  decrypt(msg, key) {
    return this.processMessage(msg, key, false);
  }
}

module.exports = {
  VigenereCipheringMachine,
};
