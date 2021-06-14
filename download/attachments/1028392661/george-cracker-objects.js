// DICTIONARY OBJECT SCEMA //
class Dictionary {
	constructor(filename, source) {
		this.filename = filename;
		this.source = source;
		this.name = filename.substring(9, filename.length - 4);
		this.url = "/download/attachments/1028392661/" + filename;
		this.wordlist = new Array();
	}
};

// HASHSET OBJECT SCHEMA //
class HashComplex {
	constructor(id, name, group, speed, description, icon, source) {
		this.id = "hc-" + id;
		this.name = name;
		this.group = group;
		this.speed = speed;
		this.description = description;
		this.outputCrackingTime = new String();
		this.icon = icon;
		this.source = source;
		this.colour;
		this.duration;
		this.units;
		this.somethingInteresting;
	}
};

// PASSWORD META-DATA CONSTRUCT //
class PasswordStats {
	constructor() {
		this.permutations = 0;
		this.entropy = 0;
		this.symbols = 0;
		this.dictionary = {};
		this.length = 0;
		this.dictonaryhover;
		this.dictionarycolour;
		this.charsets = [];
		this.masks = null;
		this.mask = null;
	}
};

class Charset {
	constructor(name, regex, cardinality) {
		this.name = name;
		this.regex = regex;
		this.cardinality = cardinality;
	}
};

class Mask {
	constructor(name, regex, permutationString, description, meta) {
		this.name = name;	//	eg: `[U][L]+`
		this.regex = regex;	//	eg: `/^[A-Z]([a-z]+)$/`
		this.permutationString = permutationString; // eg: `26 * (26**x1)`
		this.permutationStringNoVars;	//	eg: `26 * (26**7)`
		this.description = description;	//	eg: `capital letter`
		this.permutations;	// eg:	2237
		this.symbols = meta;
	}
};