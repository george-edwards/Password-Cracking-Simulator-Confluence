/*  --------------------------------------------------------------------------
    This script is to be loaded asynchronously, i.e., the html tag which references
    this as its src ought to have an "async" in it. Also it's to come after 
    objects.js  and global.js in the document flow. eg:
    <script type="text/javascript" src=".../george-cracker-objects.js"></script>
    <script type="text/javascript" src=".../george-cracker-globals.js"></script>
    <script type="text/javascript" async src=".../george-cracker-async-load.js"></script>
    --------------------------------------------------------------------------
 */

! function loadCharsets()
{
    RAM.charsets.push(new Charset("lowercase", /[abcdefghijklmnopqrstuvwxyz]/g, 26));
    RAM.charsets.push(new Charset("uppercase", /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g, 26));
    RAM.charsets.push(new Charset("numbers", /[0123456789]/g, 10));
    RAM.charsets.push(new Charset("special", /[,<.>\/?'";:[{\]}\\\|=+\-_`~!@#$%\^&*()]/g, 32));
}();

! function loadHashes()
{
    // operating systems
    RAM.hashes.push(new HashComplex(01, "Windows 7", "operating system", 11614e6, "NTLMv1 C/R [MD4 DES (ESS MD5) 256/256 AVX2 8x3]", "icomoon-win7", "john-benchmark-precision-7920.txt"));
    RAM.hashes.push(new HashComplex(02, "Windows 10", "operating system", 285.7e6, "Hashmode: 5600 - NetNTLMv2", "icomoon-win10", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
    RAM.hashes.push(new HashComplex(03, "Mac OS X Lion+", "operating system", 147.3e6, "Hashmode: 1722 - macOS v10.7", "icomoon-apple", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
    RAM.hashes.push(new HashComplex(04, "Ubuntu 8.10+", "operating system", 25421, "Hashmode: 1800 - sha512crypt $6$, SHA512 (Unix)", "icomoon-ubuntu", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
    
    // crypto
    RAM.hashes.push(new HashComplex(05, "Bitcoin/Litecoin (wallet.dat)", "crypto currency", 740, "Hashmode: 11300 - Bitcoin/Litecoin wallet.dat (Iterations: 199999)", "icomoon-bitcoin", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
    RAM.hashes.push(new HashComplex(06, "Ethereum Wallet", "crypto currency", 708, "Hashmode: 15600 - Ethereum Wallet, PBKDF2-HMAC-SHA256 (Iterations: 262143)", "icomoon-ethereum", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
    
    // misc
    RAM.hashes.push(new HashComplex(07, "Home WiFi (WPA2)", "web-related", 136871, "WPA/WPA2/PMF/PMKID PSK [PBKDF2-SHA1 256/256 AVX2 8x]", "icomoon-wifi", "john-benchmark-precision-7920.txt"));
    RAM.hashes.push(new HashComplex(08, "Generic Website (leaked MD5)", "web-related", 3341.9e6, "Hashmode: 0 - MD5", "icomoon-web", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
    RAM.hashes.push(new HashComplex(09, "WordPress", "web-related", 567138, "Hashmode: 400 - phpass, WordPress (MD5), phpBB3 (MD5), Joomla (MD5) (Iterations: 2048)", "icomoon-wordpress", "john-benchmark-precision-7920.txt"));
    RAM.hashes.push(new HashComplex(10, "MySQL db", "web-related", 7080.2e6, "Hashmode: 200 - MySQL323", "icomoon-mysql", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));

    // password managers
    RAM.hashes.push(new HashComplex(11, "LastPass", "password manager", 819200, "sniffed session [PBKDF2-SHA256 AES 256/256 AVX2 8x]", "icomoon-lastpass", "john-benchmark-precision-7920.txt"));
    RAM.hashes.push(new HashComplex(12, "1Password", "password manager", 523.6e3, "Hashmode: 6600 - 1Password, agilekeychain (Iterations: 1000)", "icomoon-1password", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
    RAM.hashes.push(new HashComplex(13, "KeePass", "password manager", 20454, "Hashmode: 13400 - KeePass 1 (AES/Twofish) and KeePass 2 (AES) (Iterations: 6000)", "icomoon-keepass", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));

    // files
    RAM.hashes.push(new HashComplex(14, "MS Office <= 2003", "file", 574.6e6, "Hashmode: 9820 - MS Office <= 2003 $3, SHA1 + RC4", "icomoon-word-old", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
    RAM.hashes.push(new HashComplex(15, "MS Office 2013+", "file", 46080, "Hashmode: 9600 - MS Office 2013", "icomoon-word-new", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
    RAM.hashes.push(new HashComplex(16, "PDF (Acrobat 10+)", "file", 6034, "Hashmode: 10700 - PDF 1.7 Level 8", "icomoon-pdf", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));

    // encryption
    RAM.hashes.push(new HashComplex(17, "7z / 7-Zip archive", "encryption", 289129, "7z, 7-Zip (512K iterations) [SHA256 256/256 AVX2 8x AES]", "icomoon-7z", "john-benchmark-precision-7920.txt"));
    RAM.hashes.push(new HashComplex(18, "VeraCrypt (Default settings)", "encryption", 173886, "Hashmode: 13711 - VeraCrypt PBKDF2-HMAC-RIPEMD160 + XTS 512 bit (Iterations: 655331)", "icomoon-veracrypt", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
    RAM.hashes.push(new HashComplex(19, "LUKS", "encryption", 1726, "Hashmode: 14600 - LUKS (Iterations: 163044)", "icomoon-tux", "hashcat-precision-7920-nvidia-Quadro-P620.txt"));
}();

! function loadDictionaries()
{
    RAM.dictionaries.push(new Dictionary("wordlist-xato-net-10-million-passwords-100000.txt", "https://github.com/danielmiessler/SecLists/tree/master/Passwords"));
    RAM.dictionaries.push(new Dictionary("wordlist-darkweb2017-top10000.txt", "https://github.com/danielmiessler/SecLists/tree/master/Passwords"));
    RAM.dictionaries.push(new Dictionary("wordlist-english-words-lowercase.txt", "https://www.mit.edu/~ecprice/wordlist.10000"));
    RAM.dictionaries.push(new Dictionary("wordlist-keyboard-combinations.txt", "https://github.com/danielmiessler/SecLists/tree/master/Passwords"));
    RAM.dictionaries.push(new Dictionary("wordlist-xato-net-10-million-passwords-10000.txt", "https://github.com/danielmiessler/SecLists/tree/master/Passwords"));
    RAM.dictionaries.push(new Dictionary("wordlist-common-english-words-lowercase.txt", "https://bitbucket.org/jvdl/correcthorsebatterystaple/src/master/data/wordlist.txt"));
    // RAM.dictionaries.push(new Dictionary("UNSORTED" + "wordlist-eff-wordlist-large.txt", "https://www.eff.org/dice"));
    // RAM.dictionaries.push(new Dictionary("UNSORTED" + "wordlist-diceware.txt", "http://world.std.com/~reinhold/diceware.html"));
    // RAM.dictionaries.push(new Dictionary("UNSORTED" + "wordlist-beale.txt", "http://world.std.com/~reinhold/diceware.html"));
    
    
    // ASYNC LOAD //
    let promises = [];  //So that we can Promises.all later on when we want to sort (don't want to sort dictionaries before they've all loaded)
    console.info("loading dictionaries")
    RAM.dictionaries.forEach(e => {  // e = element, i.e., current dictionary object
        promises.push(
            fetch(e.url)
            .then(r =>  // r = response from fetch.
            {
                return r.text();
            })
            .then(r =>  // r = response from fetch's promise.
            {
                e.wordlist = r.split(/[\r\n]+/);
                console.info(`[done] ${e.filename}`);
            })
        );
    });
    Promise.all(promises).then(() =>    // once all promises have resolved, i.e., once all wordlists have loaded
    {
        console.info("loading dictionaries finished");
        RAM.dictionaries.sort(function(a, b)    // ascending order dictionary's size / cardinality
        {
            return a.wordlist.length - b.wordlist.length;
        });
        console.info("dictionaries sorted");
        STATE.selectedHash = RAM.hashes[0];
        initialisePage();
        console.info("program ready")
    });
}();

! function loadMasks()
{
    // capital letter
    RAM.masks.push(new Mask("[U][L]+", /^[A-Z]([a-z]+)$/, "26 * (26**x1)", "capital letter",
                                                [{name: "uppercase", cardinality: 26, label: "", length: 1, initial: 0},
                                                 {name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0} ]));
    // capital letter and digits on the end
    RAM.masks.push(new Mask("[U][L]+[D]+", /^[A-Z]([a-z]+)([0-9]+)$/, "26 * (26**x1) * (10**x2)", "capital letter and digits on the end",
                                                [{name: "uppercase", cardinality: 26, label: "", length: 1, initial: 0},
                                                 {name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0}]));
    // lowercase with digits on the end
    RAM.masks.push(new Mask("[L]+[D]+", /^([a-z]+)([0-9]+)$/, "(26**x1) * (10**x2)", "lowercase with digits on the end",
                                                [{name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0}])); 
    // uppercase with digits on the end
    RAM.masks.push(new Mask("[U]+[D]+", /^([A-Z]+)([0-9]+)$/, "(26**x1) * (10**x2)", "uppercase with digits on the end",
                                                [{name: "uppercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0}])); 
    // mixed case with digits on the end
    RAM.masks.push(new Mask("[UL]+[D]+", /^([A-Za-z]+)([0-9]+)$/, "((26+26)**x1) * (10**x2)", "mixed case with digits on the end", 
                                                [{name: "UPPER+lower", cardinality: 32, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0}])); 
    // capital letter with !'s on the end
    RAM.masks.push(new Mask("[U][L]+[!]+", /^[A-Z]([a-z]+)([!]+)$/, "26 * (26**x1) * (1**x2)", "capital letter with !'s on the end", 
                                                [{name: "uppercase", cardinality: 26, label: "", length: 1, initial: 0},
                                                 {name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "[!]", cardinality: 1, label: "x2", length: 0, initial: 0}])); 
    // lowercase with !'s on the end
    RAM.masks.push(new Mask("[L]+[!]+", /^([a-z]+)([!]+)$/, "(26**x1) * (1**x2)", "lowercase with !'s on the end", 
                                                [{name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "[!]", cardinality: 1, label: "x2", length: 0, initial: 0}])); 
    // uppercase with !'s on the end 
    RAM.masks.push(new Mask("[U]+[!]+", /^([A-Z]+)([!]+)$/, "(26**x1) * (1**x2)", "uppercase with !'s on the end", 
                                                [{name: "uppercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "[!]", cardinality: 1, label: "x2", length: 0, initial: 0}])); 
    // mixed case with !'s on the end
    RAM.masks.push(new Mask("[UL]+[!]+", /^([A-Za-z]+)([!]+)$/, "((26+26)**x1) * (1**x2)", "mixed case with !'s on the end", 
                                                [{name: "UPPER+lower", cardinality: 32, label: "x1", length: 0, initial: 0},
                                                 {name: "[!]", cardinality: 1, label: "x2", length: 0, initial: 0}])); 
    // capital letter with most-common special chars on the end
    RAM.masks.push(new Mask("[U][L]+[!@#$]+", /^[A-Z]([a-z]+)([!@#$]+)$/, "26 * (26**x1) * (4**x2)", "capital letter with most-common special chars on the end", 
                                                [{name: "uppercase", cardinality: 26, label: "", length: 1, initial: 0},
                                                 {name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "[!@#$]", cardinality: 4, label: "x2", length: 0, initial: 0}])); 
    // lowercase with most-common special chars on the end
    RAM.masks.push(new Mask("[L]+[!@#$]+", /^([a-z]+)([!@#$]+)$/, "(26**x1) * (4**x2)", "lowercase with most-common special chars on the end", 
                                                [{name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "[!@#$]", cardinality: 4, label: "x2", length: 0, initial: 0}])); 
    // uppercase with most-common special chars on the end
    RAM.masks.push(new Mask("[U]+[!@#$]+", /^([A-Z]+)([!@#$]+)$/, "(26**x1) * (4**x2)", "uppercase with most-common special chars on the end", 
                                                [{name: "uppercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "[!@#$]", cardinality: 4, label: "x2", length: 0, initial: 0}])); 
    // mixed case with most-common special chars on the end
    RAM.masks.push(new Mask("[UL]+[!@#$]+", /^([A-Za-z]+)([!@#$]+)$/, "((26+26)**x1) * (4**x2)", "mixed case with most-common special chars on the end", 
                                                [{name: "UPPER+lower", cardinality: 32, label: "x1", length: 0, initial: 0},
                                                 {name: "[!@#$]", cardinality: 4, label: "x2", length: 0, initial: 0}])); 
    // capital letter with digits then !'s on the end
    RAM.masks.push(new Mask("[U][L]+[D]+[!]+", /^[A-Z]([a-z]+)([0-9]+)([!]+)$/, "26 * (26**x1) * (10**x2) * (1**x3)", "capital letter with digits then !'s on the end", 
                                                [{name: "uppercase", cardinality: 26, label: "", length: 1, initial: 0},
                                                 {name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0},
                                                 {name: "[!]", cardinality: 1, label: "x3", length: 0, initial: 0}])); 
    // lowercase with digits then !'s on the end
    RAM.masks.push(new Mask("[L]+[D]+[!]+", /^([a-z]+)([0-9]+)([!]+)$/, "(26**x1) * (10**x2) * (1**x3)", "lowercase with digits then !'s on the end",
                                                [{name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0},
                                                 {name: "[!]", cardinality: 1, label: "x3", length: 0, initial: 0}])); 
    // uppercase with digits then !'s on the end
    RAM.masks.push(new Mask("[U]+[D]+[!]+", /^([A-Z]+)([0-9]+)([!]+)$/, "(26**x1) * (10**x2) * (1**x3)", "uppercase with digits then !'s on the end", 
                                                [{name: "uppercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0},
                                                 {name: "[!]", cardinality: 1, label: "x3", length: 0, initial: 0}])); 
    // mixed case with digits then !'s on the end
    RAM.masks.push(new Mask("[UL]+[D]+[!]+", /^([A-Za-z]+)([0-9]+)([!]+)$/, "((26+26)**x1) * (10**x2) * (1**x3)", "mixed case with digits then !'s on the end", 
                                                [{name: "UPPER+lower", cardinality: 32, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0},
                                                 {name: "[!]", cardinality: 1, label: "x3", length: 0, initial: 0}])); 
    // capital letter with digits then most-common special chars on the end
    RAM.masks.push(new Mask("[U][L]+[D]+[!@#$]+", /^[A-Z]([a-z]+)([0-9]+)([!@#$]+)$/, "26 * (26**x1) * (10**x2) * (4**x3)", "capital letter with digits then most-common special chars on the end", 
                                                [{name: "uppercase", cardinality: 26, label: "", length: 1, initial: 0},
                                                 {name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0},
                                                 {name: "[!@#$]", cardinality: 4, label: "x3", length: 0, initial: 0}]));
    // lowercase with digits then most-common special chars on the end
    RAM.masks.push(new Mask("[L]+[D]+[!@#$]+", /^([a-z]+)([0-9]+)([!@#$]+)$/, "(26**x1) * (10**x2) * (4**x3)", "lowercase with digits then most-common special chars on the end", 
                                                [{name: "lowercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0},
                                                 {name: "[!@#$]", cardinality: 4, label: "x3", length: 0, initial: 0}])); 
    // uppercase with digits then most-common special chars on the end
    RAM.masks.push(new Mask("[U]+[D]+[!@#$]+", /^([A-Z]+)([0-9]+)([!@#$]+)$/, "(26**x1) * (10**x2) * (4**x3)", "uppercase with digits then most-common special chars on the end", 
                                                [{name: "uppercase", cardinality: 26, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0},
                                                 {name: "[!@#$]", cardinality: 4, label: "x3", length: 0, initial: 0}])); 
    // mixed case with digits then most-common special chars on the end
    RAM.masks.push(new Mask("[UL]+[D]+[!@#$]+", /^([A-Za-z]+)([0-9]+)([!@#$]+)$/, "((26+26)**x1) * (10**x2) * (4**x3)", "mixed case with digits then most-common special chars on the end", 
                                                [{name: "UPPER+lower", cardinality: 32, label: "x1", length: 0, initial: 0},
                                                 {name: "numbers", cardinality: 10, label: "x2", length: 0, initial: 0},
                                                 {name: "[!@#$]", cardinality: 4, label: "x3", length: 0, initial: 0}])); 
}();