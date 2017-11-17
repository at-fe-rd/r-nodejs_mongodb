# NODE.JS Document

@(FE)[Nodejs | Oct 30th 2017 | Asian Tech ]

------

[TOC]

------

## Continue to learn popular module in Nodejs

### 1. Yargs Module

- Yargs is a module have functions to separate a list of request and take the parameters + value of it, this module is very convenient in communication with client.

- Install: `npm install yargs`

- Temporarily, we just image URL is a syntax of cmd, so we just need input the params in the cmd.

- All params will be save in argv of yargs, so we just use yargs.argv to take all params.

- There are 2 kind of params:

  ```
  varyargs = require('yargs');`
  // Take all params
  var argv = yargs.argv;
  // Print Console Log
  console.log(argv);
  ```

  — Value Params:

  - Run command line: `node yargs-demo.js abc testyard	`
  - the result : `{_:['abc','testyard'],.... }`
  - We can see the value params will be save in key `_` and they are an array.

  — Hash Params ( key => value):

  - Run cmd follow this formation: `node yargs-demo.js --key=value`
  - Ex: `node yargs-demo.js --domain asiantech.vn --author quando `
  -  The result: `{_:[],domain: 'asiantech.vn', author: 'quando'}`

- Examples: Check your number is prime or not.

  ```
  // The function check
  function check_prime(n)
  {
      var flag = true;
      if (n < 2){
          flag = false;
      }
      else if (n == 2){
          flag = true;
      }
      else if (n % 2 == 0){
        flag = false;
      }
      else{
          for (var i = 3; i < n-1; i+=2)
          {
              if (n % i == 0){
                  flag = false;
                  break;
              }
          }
      }
      return flag;
  }
  // Main Code
  var yargs = require('yargs');
  var argv = yargs.argv;
  if (typeof argv.n == "undefined"){
      console.log('You dont type anything');
  }
  else{
      if (check_prime(argv.n)){
          console.log('is prime');
      }
      else{
          console.log('not prime');
      }
  }
  ```

  - Run cmd: `node check-prime.js --n 11` : we create a hash params n: '11' so to get that value: we need to check in `yargs.argv.n`

###2. CryptTo-JS - Encryption module

When you want to encrypt infomation before save in database in order to safe info. For ex, your password will be encrypted before save in db.

crypto-js is the module you find.

- Install: `npm install crypto-js`

- Using:

  — Crypto have many sub modules and each modules is a different encoding.

  — Step 1: Create a CryptoJS `var crypto = require('crypto-js');`

  — Step 2: Encrypt `var message = crypto.AES.encrypt('Your content', 'secret123').toString();`

  — Step 3: Print in console.log and you will see a meaningless string.

  — Step 4: Decoding ` var bytes = crypto.AES.decrypt(message, 'secret123');`

  — Step 5: `var message_decode = bytes.toString(crypto.enc.utf8);`

- In this chapter, we just use the AES module to encode the message. There are so many kind of modules, you can study by yourself: 

  - `crypto-js/core`
  - `crypto-js/x64-core`
  - `crypto-js/lib-typedarrays`


  - `crypto-js/md5`
  - `crypto-js/sha1`
  - `crypto-js/sha256`
  - `crypto-js/sha224`
  - `crypto-js/sha512`
  - `crypto-js/sha384`
  - `crypto-js/sha3`
  - `crypto-js/ripemd160`


  - `crypto-js/hmac-md5`
  - `crypto-js/hmac-sha1`
  - `crypto-js/hmac-sha256`
  - `crypto-js/hmac-sha224`
  - `crypto-js/hmac-sha512`
  - `crypto-js/hmac-sha384`
  - `crypto-js/hmac-sha3`
  - `crypto-js/hmac-ripemd160`


  - `crypto-js/pbkdf2`


  - `crypto-js/aes`
  - `crypto-js/tripledes`
  - `crypto-js/rc4`
  - `crypto-js/rabbit`
  - `crypto-js/rabbit-legacy`
  - `crypto-js/evpkdf`


  - `crypto-js/format-openssl`
  - `crypto-js/format-hex`


  - `crypto-js/enc-latin1`
  - `crypto-js/enc-utf8`
  - `crypto-js/enc-hex`
  - `crypto-js/enc-utf16`
  - `crypto-js/enc-base64`


  - `crypto-js/mode-cfb`
  - `crypto-js/mode-ctr`
  - `crypto-js/mode-ctr-gladman`
  - `crypto-js/mode-ofb`
  - `crypto-js/mode-ecb`


  - `crypto-js/pad-pkcs7`
  - `crypto-js/pad-ansix923`
  - `crypto-js/pad-iso10126`
  - `crypto-js/pad-iso97971`
  - `crypto-js/pad-zeropadding`
  - `crypto-js/pad-nopadding`

