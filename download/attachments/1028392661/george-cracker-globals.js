const ATTACK_ENUM = {
    DICTIONARY: "dictionary",
    DICTIONARYWITHMASK: "dictionary w mask",
    BRUTEFORCE: "brute force",
    BRUTEFORCEWITHMASK: "brute force with mask",
    NONE: "none",
};

var STATE = {
    attacktype : ATTACK_ENUM.NONE,
    maskused : false,
    pwstats : new PasswordStats(),
    selectedHash : null,
    reset : function() {
        this.attacktype = ATTACK_ENUM.NONE;
        this.maskused = false;
        this.pwstats = new PasswordStats();
    }
};

var RAM = {
    dictionaries : new Array(),
    hashes : new Array(),
    charsets : new Array(),
    masks : new Array(),
};