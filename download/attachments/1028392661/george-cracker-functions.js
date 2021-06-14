function renderHTMLIcons() 
{
    /* ICONS */
    let iconSyringe =
    `
    <!-- EYEBALL ICON -->
    <span class="open" id="eyeball-icon-span">
        <svg class="icomoon icomoon-eye" onclick="eyeballClicked()"><use xlink:href="/download/attachments/1028392661/symbol-defs.svg#icomoon-eye"></use></svg>
    </span>

    <div class="icons-right">
        <!-- MASK ICON -->
        <span class="icon-span tooltip-icon">
            <svg class="icomoon icomoon-mask"><use xlink:href="/download/attachments/1028392661/symbol-defs.svg#icomoon-mask"></use></svg>
            <span class="tooltip-popup icomoon-mask-hover"> <i></i></span>
        </span>

        <!-- DICTIONARY ICON -->
        <span class="icon-span tooltip-icon">
            <svg class="icomoon icomoon-book"><use xlink:href="/download/attachments/1028392661/symbol-defs.svg#icomoon-book"></use></svg>
            <span class="tooltip-popup icomoon-book-hover"> <i></i></span>
        </span>

        <!-- HAMMER ICON -->
        <span class="icon-span tooltip-icon">
            <svg class="icomoon icomoon-hammer"><use xlink:href="/download/attachments/1028392661/symbol-defs.svg#icomoon-hammer"></use></svg>
            <span class="tooltip-popup icomoon-hammer-hover"> <i></i></span>
        </span>
        
        <!-- SYMBOLS ICON -->
        <span class="icon-span tooltip-icon">
            <svg class="icomoon icomoon-braile"><use xlink:href="/download/attachments/1028392661/symbol-defs.svg#icomoon-braile"></use></svg>
            <span class="tooltip-popup icomoon-braile-hover"> <i></i></span>
        </span>
        
        <!-- LENGTH ICON -->
        <span class="icon-span tooltip-icon">
            <svg class="icomoon icomoon-text-width"><use xlink:href="/download/attachments/1028392661/symbol-defs.svg#icomoon-text-width"></use></svg>
            <span class="tooltip-popup icomoon-text-width-hover"> <i></i></span>
        </span>
        
        <!-- ENTROPY ICON -->
        <span class="icon-span tooltip-icon">
            <svg class="icomoon icomoon-entropy"><use xlink:href="/download/attachments/1028392661/symbol-defs.svg#icomoon-entropy"></use></svg>
            <span class="icomoon-entropy-value"></span>
            <span class="tooltip-popup icomoon-entropy-hover"> <i></i></span>
        </span>
    </div>
    `;
    document.getElementById("inject-icons").innerHTML = iconSyringe;
}

function renderHTMLSimpleOutput(animationstr)
{
    /* HASH (OUTPUT SIMPLE) */
    const {name, icon, outputCrackingTime, somethingInteresting, colour} = STATE.selectedHash;
    let hashSyringe = 
    `
        <!-- HASH OUTPUT SIMPLE -->
        <div class="animated ${animationstr}" id="output-main-hash" style="background:radial-gradient(circle, white 20%, ${colour} 100%);">
            <!-- <i class="${icon}"></i> -->
            <svg class="icomoon"><use xlink:href="/download/attachments/1028392661/symbol-defs.svg#${icon}"></use></svg>
            <p class="description">If this password was for ${name} a Precision 7920 would crack it in: </p>
            <p class="duration">${outputCrackingTime}</p>
            <p class="something-interesting">${somethingInteresting}</p>
        </div>
    `;
    document.getElementById("inject-output-simple").innerHTML = hashSyringe;
}

function renderHTMLExtraOutput()
{
    /* HASHES (OUTPUT EXTRA) */
    let hashesSyringe = new String();
    RAM.hashes.forEach(h => {
    const {id, name, group, icon, description} = h;
    let hashString = 
        `
            <!-- HASH OUTPUT EXTRA -->
            <div id="${id}" class="hash hhidden" onclick="hashClicked(this)">
                <svg class="icomoon"><use xlink:href="/download/attachments/1028392661/symbol-defs.svg#${icon}"></use></svg>
                <div class="deets">
                    <p class="name">${name}</p>
                    <p class="duration"></p>
                    <p class="description">${description}</p>
                    <p class="something-interesting"></p>
                </div>
            <span class="tooltiptext"> ${group} </span>
            </div>
        `;
        hashesSyringe += hashString;
    })
    document.getElementById("inject-output-extra").innerHTML = hashesSyringe;
}

/* ----------------\
|   UPDATE HTML    |
------------------*/
function updateHTML()
{
    // UPDATE MASK ICON
    let icon = document.querySelector(".icomoon-mask");
    let hover = document.querySelector(".icomoon-mask-hover");
    if (STATE.maskused) {
        icon.classList.add("active");
        hover.innerHTML = 
        `MASK USED:<br>
        <br>
        ${STATE.pwstats.mask.description}<br>
        <br>
        regex:<br>
        ${STATE.pwstats.mask.name}
        <i></i>`;
    } else {
        icon.classList.remove("active");
    }

    // UPDATE DICTIONARY ICON
    icon = document.querySelector(".icomoon-book");
    hover = document.querySelector(".icomoon-book-hover");
    if ( STATE.attacktype === ATTACK_ENUM.DICTIONARY ^
         STATE.attacktype === ATTACK_ENUM.DICTIONARYWITHMASK )
    {
        icon.classList.add("active");
        hover.innerHTML = 
        `DICTIONARY ATTACK:
         <br><br>
         ${STATE.pwstats.dictionary.name} <i></i>`;
    } else {
        icon.classList.remove("active");
    }

    // UPDATE HAMMER ICON
    icon = document.querySelector(".icomoon-hammer");
    hover = document.querySelector(".icomoon-hammer-hover");
    if (STATE.attacktype === ATTACK_ENUM.BRUTEFORCE ^
        STATE.attacktype === ATTACK_ENUM.BRUTEFORCEWITHMASK)
    {
        icon.classList.add("active");
        hover.innerHTML = 
        `BRUTE FORCE ATTACK <i></i>`;
    } else {
        icon.classList.remove("active");
    }

    // UPDATE SYMBOLS ICON
    let symbolsStr = "";
    if (STATE.attacktype === ATTACK_ENUM.DICTIONARY)
    {
        symbolsStr = `${STATE.pwstats.symbols} symbols used in attack (cardinality of dictionary) <i></i>`;
    }
    if (STATE.attacktype === ATTACK_ENUM.DICTIONARYWITHMASK)
    {
        symbolsStr = `
        
            ${STATE.pwstats.symbols} symbols used in attack <br><br>
        
            (cardinality of dictionary) x 2 <br><br>

            x 2? : because of the capital letter; we try each word twice Twice <i></i>`;
    }
    if (STATE.attacktype === ATTACK_ENUM.BRUTEFORCE)
    {
        symbolsStr = `${STATE.pwstats.symbols} symbols used in attack: <br>
        <br>
        No mask, entire set used for each character: <br>
        <br>
        ${printCharsets()} <i></i>`;
    }
    if (STATE.attacktype === ATTACK_ENUM.BRUTEFORCEWITHMASK)
    {
        sets = "";
        STATE.pwstats.mask.symbols.forEach(s => {
            sets += `${s.name}(${s.cardinality})<br>`;
        });

        symbolsStr = `${STATE.pwstats.symbols} symbols used in attack: <br>
        <br>
        ${sets} <i></i>`;
        console.log(STATE);
    }
    document.querySelector(".icomoon-braile").classList.add("active");
    document.querySelector(".icomoon-braile-hover").innerHTML = symbolsStr;
    
    // UPDATE LENGTH ICON
    let pluralstr = "symbol";
    if (STATE.pwstats.length > 1)
    pluralstr = "symbols"
    document.querySelector(".icomoon-text-width").classList.add("active");
    document.querySelector(".icomoon-text-width-hover").innerHTML = `${STATE.pwstats.length} ${pluralstr} in your password <i></i>`;
    
    // UPDATE ENTROPY ICON
    document.querySelector(".icomoon-entropy").classList.add("active");
    document.querySelector(".icomoon-entropy-value").innerHTML = Math.floor(STATE.pwstats.entropy);
    document.querySelector(".icomoon-entropy-hover").innerHTML = `${Math.floor(STATE.pwstats.entropy)} entropy bits <i></i>`;
    
    // UPDATE SIMPLE
    renderHTMLSimpleOutput("");

    // UPDATE EXTRA
    RAM.hashes.forEach(function(hash)
    {
        let div = document.getElementById(hash.id);
        div.style.background = `radial-gradient(circle, white 20%, ${hash.colour} 100%)`;
        let duration = div.getElementsByClassName("duration");
        let somethingInteresting = div.getElementsByClassName("something-interesting");
        duration[0].innerHTML = hash.outputCrackingTime;
        somethingInteresting[0].innerHTML = hash.somethingInteresting;
    });
}

/*  this function aint elegant but it's too late and I dont care.
    It's for the entropy calculation bit. It populates the table.
*/
function updateSymbolSetsTableHTML()
{
    document.getElementById("wl-0-name").innerHTML = `<a href="${RAM.dictionaries[0].url}">${RAM.dictionaries[0].name}</a>`;
    document.getElementById("wl-0-card").innerHTML = RAM.dictionaries[0].wordlist.length;
    document.getElementById("wl-0-source").innerHTML = RAM.dictionaries[0].source;

    document.getElementById("wl-1-name").innerHTML = `<a href="${RAM.dictionaries[1].url}">${RAM.dictionaries[1].name}</a>`;
    document.getElementById("wl-1-card").innerHTML = RAM.dictionaries[1].wordlist.length;
    document.getElementById("wl-1-source").innerHTML = RAM.dictionaries[1].source;

    document.getElementById("wl-2-name").innerHTML = `<a href="${RAM.dictionaries[2].url}">${RAM.dictionaries[2].name}</a>`;
    document.getElementById("wl-2-card").innerHTML = RAM.dictionaries[2].wordlist.length;
    document.getElementById("wl-2-source").innerHTML = RAM.dictionaries[2].source;

    document.getElementById("wl-3-name").innerHTML = `<a href="${RAM.dictionaries[3].url}">${RAM.dictionaries[3].name}</a>`;
    document.getElementById("wl-3-card").innerHTML = RAM.dictionaries[3].wordlist.length;
    document.getElementById("wl-3-source").innerHTML = RAM.dictionaries[3].source;

    document.getElementById("wl-4-name").innerHTML = `<a href="${RAM.dictionaries[4].url}">${RAM.dictionaries[4].name}</a>`;
    document.getElementById("wl-4-card").innerHTML = RAM.dictionaries[4].wordlist.length;
    document.getElementById("wl-4-source").innerHTML = RAM.dictionaries[4].source;

    document.getElementById("wl-5-name").innerHTML = `<a href="${RAM.dictionaries[5].url}">${RAM.dictionaries[5].name}</a>`;
    document.getElementById("wl-5-card").innerHTML = RAM.dictionaries[5].wordlist.length;
    document.getElementById("wl-5-source").innerHTML = RAM.dictionaries[5].source;
}

function fixConfluence()
{
    let body = document.querySelector("body")
    body.style.fontSize = "1em"; //this overwrites confluences annoying pixel-set nonsense
    body.style.lineHeight = "";
}

function loadingFinished()
{
    let inputfield = document.getElementById("inputpassword");
    inputfield.disabled = false;
    inputfield.placeholder = "enter your password here";
}

function disableEverything()
{
    disableToggle();
    disableIcons();
    disableOutputSimple();
    disableOutputExtra();
}

function enableEverything()
{
    enableToggle();
    enableIcons();
    enableOutputSimple();
    enableOutputExtra();
}

function disableIcons()
{
    document.getElementById("inject-icons").classList.add("disabled");
}

function disableOutputSimple()
{
    document.getElementById("inject-output-simple").classList.add("disabled");
}

function disableOutputExtra()
{
    let hashes = document.getElementById("inject-output-extra").children;
    for (let h of hashes) {
        h.classList.add("disabled");
    }
}

function disableToggle()
{
    document.getElementById("output-toggle").classList.add("disabled");
    let input = document.getElementById("toggle-checkbox");
    input.disabled = true;
}

function retardToggle()
{
    let input = document.getElementById("toggle-checkbox");
    input.disabled = true;
}

function enableIcons()
{
    document.getElementById("inject-icons").classList.remove("disabled");
}

function enableOutputSimple()
{
    document.getElementById("inject-output-simple").classList.remove("disabled");
}

function enableOutputExtra()
{
    let hashes = document.getElementById("inject-output-extra").children;
    for (let h of hashes) {
        h.classList.remove("disabled");
    }
}

function enableToggle()
{
    document.getElementById("output-toggle").classList.remove("disabled");
    let input = document.getElementById("toggle-checkbox");
    input.disabled = false;
}

function hideAllOutput()
{
    hideSimpleOutput();
    hideExtraOutput();
    disableToggle(); //needed because hiding extra output shows the toggle
}

function showAllOutput()
{
    showSimpleOutput();
    showExtraOutput();
}

function showSimpleOutput()
{
    document.getElementById("inject-output-simple").classList.remove("hhidden");
}

function hideSimpleOutput() 
{
    document.getElementById("inject-output-simple").classList.add("hhidden");
}

function showExtraOutput() 
{
    document.querySelector(`.output-extra`).classList.remove("removed");
    // disableToggle();
    retardToggle();

    for (let i = 0; i < RAM.hashes.length; i++)
    {
        document.getElementById(`${RAM.hashes[i].id}`).classList.remove("hhidden");
        animateCSS(`#${RAM.hashes[i].id}`, "flipInY", `${30 * i}ms`, function animationEnd() {
            if (i+1 === RAM.hashes.length) {
                enableToggle();
                showEscapeConfluenceButton();
            }
        });
    }
};

function hideExtraOutput() 
{
    // disableToggle();
    retardToggle();
    for (let i = 0; i < RAM.hashes.length; i++)
    {
        hideEscapeConfluenceButton();
        animateCSS(`#${RAM.hashes[i].id}`, "zoomOut", `${20 * i}ms`, () => {
            document.getElementById(`${RAM.hashes[i].id}`).classList.add("hhidden");
            if (i+1 === RAM.hashes.length) {
                enableToggle();
                document.querySelector(`.output-extra`).classList.add("removed");
            }
        });
    }
};

function showEscapeConfluenceButton()
{
    document.getElementById("escape-confluence-button").classList.remove("hhidden");
    animateCSS(`#escape-confluence-button`, `fadeIn`, 0);
}

function hideEscapeConfluenceButton()
{
    animateCSS(`#escape-confluence-button`, `fadeOut`, 0, () => {
        document.getElementById("escape-confluence-button").classList.add("hhidden");
    });
}

function animateCSS(element, animationName, delay, callback) 
{
    const el = document.querySelector(element);
    el.style.animationDelay = delay;
    el.classList.add('animated', animationName);

    function handleAnimationEnd() {
        el.classList.remove('animated', animationName);
        el.style.animationDelay = "initial";
        el.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback();
    }

    el.addEventListener('animationend', handleAnimationEnd);
}

function colouriseBackground(hash)
{
    /* 
    r,o,y,b,g
    colour scale taken from here: https://www.cfa.vic.gov.au/warnings-restrictions/about-fire-danger-ratings
    */
    
    const red = [255,0,0];
    const orange = [255,165,0];
    const yellow = [255,255,0];
    const blue = [0,0,255];
    const green = [0,128,0];
    const alpha = 0.2;
    
    if (hash.units != "years") {
        hash.colour = makeRGB(red, 1);
        return;
    }

    if (hash.duration <= 500) {
        hash.colour = makeRGB(orange, 1);
        return;
    }
    
    if (hash.duration <= 5000) {
        hash.colour = makeRGB(yellow, 1);
        return;
    }

    if (hash.duration <= 50000) {
        hash.colour = makeRGB(blue, 1);
        return;
    }

    hash.colour = makeRGB(green, 1);
    return;
    
    /* Instead of discrete colours maybe a scale
      based on cracking time ...maybe later */ 
    function makeRGB(array, percentage)
    {
        let adjustedColourArray = array.map(function (value)
        {
            return Math.round(value * percentage);
        })
        return `rgb(${adjustedColourArray[0]},${adjustedColourArray[1]},${adjustedColourArray[2]},${alpha})`;
    }
}

function saveArrayToFile(myArray)
{
    let textDoc = document.createElement('a');
    textDoc.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(myArray);
    textDoc.target = '_blank';
    textDoc.download = 'myFile.txt';
    textDoc.click();
}

// STUBBETY STUB STUB
function allDictionaryWords(obj)
{
    for (key in obj) {
        if (obj[key] == null) {
            return false;
        }
    }
    return true;
}

/* prints charsets as follows:
    26 lowercase
    26 UPPERCASE
       ...
*/
function printCharsets()
{
    let str = "";
    STATE.pwstats.charsets.forEach(charset => {
        str += `${charset.name}(${charset.cardinality}) <br>`;
    });
    return str;
}

function getMasks(wordarray)
{
    let validmasks = [];
    RAM.masks.forEach(m => {
        let maskCoversAll = wordarray.every(w => {
            return checkMask(w, m);
        });
        
        if (maskCoversAll) {
            validmasks.push(m);
        }
    })
    return validmasks;
}

function checkMask(word, mask)
{
    return (mask.regex.test(word));
}

function findCheapestMask(masks, words)
{
    // find cheapest mask
    let cheapestPermutations = Infinity;
    let cheapestMask = null;
    
    // now calculate total perms by looping through all
    // masks, m, calculating perms based on each word, w,
    // and storing the cheapest in cheapestMask (& returned)
    masks.forEach(m => {
        let permstr = "";
        m.symbols.forEach (set => set.length = set.initial);
        words.forEach(w => {
            m.symbols.forEach(set => {
                if (set.label === "") {
                    set.length += 1;
                }
            })
            let tempstr = m.permutationString; // will be evaled later
            let regexMatch = w.match(m.regex);
            for (let i = 1; i < regexMatch.length; i++)
            {
                tempstr = tempstr.replace(`x${i}`, regexMatch[i].length);
                m.symbols.forEach(set => {
                    if (set.label === `x${i}`) {
                        set.length += regexMatch[i].length;
                    }
                })
            }
            permstr += tempstr + " * ";
        }); // finished all words
        m.permutationStringNoVars = permstr.replace(/ \* $/g, "");
        m.permutations = eval(m.permutationStringNoVars);

        // find cheapest m(ask) and set it as cheapestMask
        if (m.permutations < cheapestPermutations) {
            cheapestPermutations = m.permutations;
            cheapestMask = m;
        }
    }); // finished all masks
    return cheapestMask;
}
    
function getDictionary(wordsArray)
{
    // iterate through dictionaries
	for (var i = 0; i < RAM.dictionaries.length; i++) 
    {
		if (searchDictionary(wordsArray, RAM.dictionaries[i].wordlist))
			{return RAM.dictionaries[i];}
	}
	return "none";
};

function searchDictionary(array, wordlist)
{
    if (array.length === 0) {
        return false;
    }
    for (var i = 0; i < array.length; i++) 
    {
        if (!binarySearch(wordlist, array[i], 0, wordlist.length-1)) 
            {return false;}
    }
    return true;
};

// log(n)
function binarySearch(array, symbol, start, end)
{
	// Base case (function is recursive, yo)
	if (start > end)
        {return false;}
	
	// find middle
	let i = Math.floor((start + end)/2);
	
	// check middle
	if (array[i]===symbol)
        {return true;}
	
	// still not found? shed one half then come back in, Hofstadter-style
	if (array[i] > symbol) {
        return binarySearch(array, symbol, start, i-1); // discard RHS
	} else {
        return binarySearch(array, symbol, i+1, end); // discard LHS
	}
}

function replaceIcon(selector, icon)
{
    document.querySelector(selector).setAttributeNS('http://www.w3.org/1999/xlink', 'href', `/download/attachments/1028392661/symbol-defs.svg#${icon}`);
}

function getCharsets(password)
{
    STATE.pwstats.charsets = [];
    let count = 0;
    RAM.charsets.forEach(set => {
        if (password.search(set.regex) >= 0) {
            STATE.pwstats.charsets.push(set);
            count += set.cardinality;
        }
    });
    return count;
}
