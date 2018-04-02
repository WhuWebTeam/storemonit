const Crypto = require('crypto');

module.exports = () => {

    class Secret {

        /**
         * @static
         * @param {String} text - text string waited to be encoded
         * @return {String}
         * encoded string
         */
        static sha1(text) {
            const sha1 = Crypto.createHash('sha1');
            return sha1.update(text).digest('hex');
        }


        /**
         * @static
         * @param {String} secret - secret string waited to validate
         * @param {String} text - text string waited to be encoded
         * @return {Boolean}
         * true when secret string right
         * false when secret string wrong
         */
        static sha1Equal(secret, text) {
            return this.sha1 === secret;
        }
    }

    return Secret;
}