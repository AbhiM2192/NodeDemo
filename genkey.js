//generate a secret key to use with our JWT token for signing purpose

const key = [...Array(30)]
    .map((n) =>((Math.random()*36) | 0).toString(36))
    .join('');

//generating a 30 characters long key ,base 36 encoded
console.log(key);