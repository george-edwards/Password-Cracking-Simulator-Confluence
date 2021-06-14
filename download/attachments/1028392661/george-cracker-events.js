/*------------------\
|  INITIALISE PAGE  |
\ -----------------*/
function initialisePage()
{  
    // INITIALISE PAGE //
    disableEverything();
    renderHTMLIcons();
    renderHTMLSimpleOutput("fadeIn");
    renderHTMLExtraOutput();
    // updateSymbolSetsTableHTML(); // comment out for testing; this line fails outside of confluence
    loadingFinished();
    document.querySelector("body").style.fontSize = "1em"; //this overwrites confluences annoying pixel-set nonsense
};

/*-------------------\
|  PASSWORD ENTERED  |
\ ------------------*/
inputpassword.oninput = function()
{
    // reset status
    STATE.reset();

    // get input
    const input = document.getElementById('inputpassword').value;

    // disable if input blank
    (input.length === 0) ? disableEverything() : enableEverything();
    
    // split input into words
    let words = [];
    words = input.trim().split(" ");
    words = words.filter(word => {  // removes blank entries
        return word != "";
    })
    
    // check for applicable masks
    if (input.length != 0) {
        STATE.pwstats.masks = getMasks(words);
        if (STATE.pwstats.masks.length != 0) {
            STATE.maskused = true;
        }
    }
    
    // check for smallest applicable dictionary
    if (STATE.maskused && STATE.pwstats.masks[0].description === "capital letter") {
        STATE.pwstats.dictionary = getDictionary(words.map(str => str.toLowerCase()));
    } else {
        STATE.pwstats.dictionary = getDictionary(words);
    }
    let dicAttackPossible = (STATE.pwstats.dictionary != "none"); // easier to read than (STATE.pwstats.dictionary != "none")
    
    /*  now we calculate permutations for brute force
        and dictionary attacks, with and without masks,
        and take the smallest (quickest to crack)
    -----------------------*/    
    // brute force:
    let bfSymbols = getCharsets(input);
    let bfLength = input.trim().length;
    let bfPermutations = Math.pow(bfSymbols, bfLength);

    // dictionary attack:
    if (dicAttackPossible) { // all words found in a dictionary
        var dicSymbols = STATE.pwstats.dictionary.wordlist.length;
        if (STATE.maskused) // capital letter, must parse dictionary twice
            dicSymbols *= 2;
        var dicLength = words.length;
        var dicPermutations = Math.pow(dicSymbols, dicLength);
    } else {
        dicPermutations = Infinity;
    }

    // mask attacks:
    if (STATE.maskused) {
        STATE.pwstats.mask = findCheapestMask(STATE.pwstats.masks, words);
        var maskPermutations = STATE.pwstats.mask.permutations;
    } else {
        maskPermutations = Infinity;
    }

    // compare and take quickest:
    if (maskPermutations < dicPermutations && maskPermutations < bfPermutations) {
        // brute force with mask is quickest
        STATE.pwstats.symbols = STATE.pwstats.mask.symbols.reduce((i,set) => i + set.cardinality, 0);
        STATE.pwstats.length = input.trim().length;
        STATE.pwstats.permutations = maskPermutations;
        STATE.attacktype = ATTACK_ENUM.BRUTEFORCEWITHMASK;
        STATE.maskused = true;
    } else if (dicPermutations < bfPermutations) {
        // dictionary is quickest
        STATE.pwstats.symbols = dicSymbols;
        STATE.pwstats.length = dicLength;
        STATE.pwstats.permutations = dicPermutations;
        (STATE.maskused) ?  STATE.attacktype = ATTACK_ENUM.DICTIONARYWITHMASK 
                         :  STATE.attacktype = ATTACK_ENUM.DICTIONARY;
    } else {
        // brute force -no mask- is quickest
        STATE.pwstats.symbols = bfSymbols;
        STATE.pwstats.length = bfLength;
        STATE.pwstats.permutations = bfPermutations;
        STATE.attacktype = ATTACK_ENUM.BRUTEFORCE;
        STATE.maskused = false;
    }

    STATE.pwstats.entropy = STATE.pwstats.length * Math.log2(STATE.pwstats.symbols);
    if (isNaN(STATE.pwstats.entropy)) STATE.pwstats.entropy = 0;

    // Cycle through each hash and calc cracking time + something interesting to say
    RAM.hashes.forEach(function(hash)
    {
        // CRACKING TIME //
        switch (true)
        {
            case STATE.pwstats.permutations < hash.speed * 2:  //less than seconds
            hash.units = "seconds";
            hash.duration = 0;
            break;

            case STATE.pwstats.permutations < hash.speed * 2 * 60:  //less than minutes, show in seconds
            hash.units = "seconds";
            hash.duration = STATE.pwstats.permutations / hash.speed * 2;
            break;

            case STATE.pwstats.permutations < hash.speed * 2 * 60 * 60:  //less than hours, show in minutes
            hash.units = "minutes";
            hash.duration = STATE.pwstats.permutations / hash.speed * 2 / 60;
            break;

            case STATE.pwstats.permutations < hash.speed * 2 * 60 * 60 * 24: //less than days, show in hours
            hash.units = "hours";
            hash.duration = STATE.pwstats.permutations / hash.speed * 2 / 60 / 60;
            break;

            case STATE.pwstats.permutations < hash.speed * 2 * 60 * 60 * 24 * 365: //less than years, show in days
            hash.units = "days";
            hash.duration = STATE.pwstats.permutations / hash.speed * 2 / 60 / 60 / 24;
            break;

            case STATE.pwstats.permutations >= hash.speed * 60 * 60 * 24 * 365: //show in years
            hash.units = "years";
            hash.duration = STATE.pwstats.permutations / hash.speed * 2 / 60 / 60 / 24 / 365;
            break;
        };
        
        // colour the hash
        colouriseBackground(hash);
        // store cracking time as a nicely readable string
        (hash.duration < 1e17) ? 
            hash.outputCrackingTime = `${hash.duration.toLocaleString("en-AU", {maximumFractionDigits: 0})} ${hash.units}`
          : hash.outputCrackingTime = `${hash.duration.toExponential(0)} ${hash.units}`;

        
        //  SOMETHING INTERESTING TO SAY //
        let string = new String();
        if (hash.units === "years")
        {
            let index = 100 * Math.log10(Math.log10(hash.duration)); // index as per this: https://w.wiki/7Jf
            let source1 = " (<a href='https://w.wiki/7Jg'>source</a>)";
            let source2 = " (<a href='https://w.wiki/7Jf'>source</a>)";
            
            if (hash.duration >= 400) {
                string = "Your password is finally cracked. You don't really care, you've long since expired. <br>";
            }

            if (hash.duration >= 1e5) {
                string = "Earth begins entering another glacial period (<a href='https://w.wiki/7$Z'>source</a>) <br>";
            }

            if (hash.duration >= 1e9) {
                string = "The Sun has become too hot for life on Earth's surface" + source1 + "<br>";
            }
            
            if (hash.duration >= 1.9e9) {
                string = "All of the ocean water on Earth has evaporated" + source1 + "<br>";
            }
                
            if (hash.duration >= 3.6e9) {
                string = "The Milky Way and Andromeda galaxies have collided and merged" + source1 + "<br>";
            }
            
            if (hash.duration >= 7.5e9) {
                string = "Our sun now fuses Helium" + source1 + "<br>";
            }
            
            if (index >= 115) {
                string = "New Stars have ceased to form. There is no new light. Ever." + source2 + "<br>";
            }
            
            if (index >= 130) {
                string = "Galaxies no longer exist" + source2 + "<br>";
            }
            
            if (index >= 160) {
                string = "All protons have decayed. Matter that made up stars and life no longer exists." + source2 + "<br>";
            }

            if (index >= 180) {
                string = "A black hole with the mass of the Sun has evaporated" + source2 + "<br>";
            }
            
            if (index >= 200) {
                string = `A googol of years has gone by (1e100) and your password still isn't cracked. The universe is now dark and empty. ${source2} <br>`;
            }
            
            if (index >= 215) {
                string = "ENTROPIC HEAT DEATH OF THE UNIVERSE. <br>Game over. The simulation has finished. You wake up with a jolt and remove your tenth-dimensional headset. Your child looks up at you, beaming with anticipation. You tell him there was too much misery inside, but that he shows promise and should try again. He asks: 'evil?' You nod your head and say 'life ate itself; the evil was unavoidable.' he sits still for a minute, then asks: 'Saṅkhāra?' You slowly nod your head. 'But how?! It was only information that replicated?' You reply: 'the replicators eventually built survival machines around themselves, these machines were conscious. Don't give up. Try again.'" + "<br>";
            }
        }
        hash.somethingInteresting = string;
    });

    // UPDATE HTML //
    showSimpleOutput();
    updateHTML();
};

/*------------------\
|  EYEBALL CLICKED  |
\ -----------------*/
function eyeballClicked()
{
    if (document.getElementById("inject-icons").classList.contains("disabled")) {
        return;
    }

    let el = document.querySelector("#eyeball-icon-span");
    
    // eyeball open, needs closing
    if (el.classList.contains("open")) {
        el.classList.replace("open", "closed");
        replaceIcon("#eyeball-icon-span use", "icomoon-eye-blocked");
        document.querySelector('#inputpassword').type = "password";
        
        // eyeball closed, needs opening
    } else if (el.classList.contains("closed")) {
        el.classList.replace("closed", "open");
        replaceIcon("#eyeball-icon-span use", "icomoon-eye")
        document.querySelector('#inputpassword').type = "text";
    }

}

/*------------------------\
|  OUTPUT SWITCH CLICKED  |
\ -----------------------*/
document.getElementById("toggle-checkbox").addEventListener("change", function() 
{
    let toggle = document.getElementById("toggle-checkbox");
    if (toggle.checked) {
        showExtraOutput();
    } else {
        hideExtraOutput();
    }
});


/*--------------------------\
|  INDIVIDUAL HASH CLICKED  |
\ -------------------------*/
function hashClicked(element)
{
    // return if we're clicking the already-selected hash
    if (STATE.selectedHash.id === element.id) return;
    
    // mark previously clicked as inactive
    let hashelements = element.parentElement.children;
    for (let h of hashelements) {
        h.classList.remove("clicked");
    }

    //mark currently clicked as active
    element.classList.add("clicked");
    
    // update main output (simple output) with selected 
    for (let h of RAM.hashes) {
        if (h.id === element.id) STATE.selectedHash = h;
    }

    // update icon on the little toggle switch
    replaceIcon(".toggle-icon-left use", STATE.selectedHash.icon);
    // document.getElementById("icon-dynamic").className = `icon-left ${STATE.selectedHash.icon}`;

    // now render the changes
    renderHTMLSimpleOutput("slideInUp");
};

/*------------------------\
|  ESCAPE BUTTON CLICKED  |
\ -----------------------*/
function escapeConfluenceClicked(element)
{
    let ca = document.querySelector(`.cracker-area`);
    if (element.innerHTML === "escape confluence")
    {
        // break free
        ca.style.height = "max-content";
        ca.style.width = "100vw";
        ca.style.zIndex = 11; // confluence's side-bar is 10
        ca.style.position = "absolute";
        ca.style.backgroundColor = "white";
        ca.style.left = "-20px";
    
        // manipulate confluence DOM (make more room)
        document.querySelector(`.deck-cards .tabs-pane .active-pane`).style.padding = 0;
        document.querySelector(`html`).style.backgroundColor = "white";
        document.querySelector(`.acs-side-bar.ia-scrollable-section`).style.backgroundColor = "white";
        document.querySelector(`#full-height-container`).style.backgroundColor = "white";
        document.querySelector(`#main`).style.margin = "0 0 0 0";
        document.querySelector(`#footer`).style.display = "none";

        // rename button
        element.innerHTML = "confine"
    } else {

        // back to confinment
        ca.style.height = null;
        ca.style.width = null;
        ca.style.zIndex = null;
        ca.style.position = null;
        ca.style.backgroundColor = null;
        ca.style.left = null;
    
        // return confluence DOM to prior state
        document.querySelector(`.deck-cards.tabs-pane .active-pane`).style.padding = null;
        document.querySelector(`html`).style.backgroundColor = null;
        document.querySelector(`.acs-side-bar.ia-scrollable-section`).style.backgroundColor = null;
        document.querySelector(`#full-height-container`).style.backgroundColor = null;
        document.querySelector(`#main`).style.margin = null;
        document.querySelector(`#footer`).style.display = null;

        // rename button
        element.innerHTML = "escape confluence";
    } 
}