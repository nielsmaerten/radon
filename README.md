# Radon

[Radon](https://radon.niels.me) is an online journaling app, focused on security and simplicity.  
Using just a browser, you can create daily entries to follow up on your projects, life, ideas, ... pretty much anything you want.  
And because Radon uses zero-knowledge end-to-end encryption, you can speak freely :relaxed:

## Why another journaling app?
I used to be a big fan of [OhLife](www.ohlife.com) (RIP).  
Every day, I'd write a quick summary of the stuff a got done, and what I was planning on doing next.  
One thing made me feel uneasy though: what if the site ever got breached?  

So I decided to try and create my own, zero-knowledge journal.  
That way, even if the database ever got hacked,  
I could sleep easy knowing it would only contain [unreadable gibberish](https://gist.github.com/nielsmaerten/48a64b1a8a7f603f585c7770e41654e9).

## Technical details
(For us geeks :)

### Security

Entries are encrypted using AES, provided by the [Stanford JavaScript Crypto Library](http://bitwiseshiftleft.github.io/sjcl/). A hash of your encryption key is stored using SHA-256. Your encryption key = PBKDF2(your passphrase + a unique, high entropy salt). Both Radon and its database are hosted on Google Firebase, and use SSL for all communication.

### Development

Clone the repository, then run:

```sh
# Installing dependencies
npm install

# Running the app locally
npm start

# Running tests in a browser
npm run gulp test:auto
```

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and open a pull request.

## License

Copyright 2017 NIELS MAERTEN

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
