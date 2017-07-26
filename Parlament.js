var fr = 30; //starting FPS
var clr;
var clr2;
var clrB;
//var months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"];
var tab1990 = [0, 0, 0, 0, 3, 2, 5, 0, 2, 4, 4, 8];
var tab1991 = [3, 1, 8, 2, 5, 4, 5, 2, 4, 7, 4, 7];
var tab1992 = [4, 2, 8, 2, 2, 3, 9, 0, 6, 8, 8, 0];

var najvecja_visina = "-211";
var stevilo_tem ="32";
var index_naslova_grafa = 0;
var izhodi = [];
var tabG = [];
var tabS = [];
var tekst = "";
var tekstI = "";
var tekstU = "";
var tekstS = "";
var dirTemp = "";
var w;
var dr = 0;
var maxNorm = 1;
var mode = 1;
// odmik = 10 + x1
var odmik = 50;

var dan_test_klik ="";
var mesec_test_klik ="";
var leto_test_klik ="";

var windowHeight = $( window ).height();

function setup() {
    noStroke();
    frameRate(fr);
    var elem1 = document.getElementById("desniStolpec");
    var style = window.getComputedStyle(elem1, null).width;
    w = windowWidth - parseFloat(style);
    //var canvas = createCanvas(w, windowHeight);
    windowHeight = $( window ).height();
    var canvas = createCanvas(w, windowHeight);
    //barva
    clr = color(31,31,31);
    //clr = color(149, 147, 147);
    clr2 = color(0, 204, 0);
    clrB = color(239, 239, 239);

    canvas.parent('p5Canvas');
    background(clrB);
}

function draw() {

    var sT = "";
    var sU = "";
    var norm = 0;
    var visK = 35;
    var sirK = 200;
    if(dr == 1) {
        sT = "Število tem: ";
        norm = 50;
        sirK = 110;
        //naslov_grafa(1);
    } else if(dr == 2) {
        sT = "Število besed: ";
        norm = 60000;
        sirK = 145;
        //naslov_grafa(2);
    } else if(dr == 3) {
        sT = "Število besed: ";
        sU = "Število unikatnih besed: ";
        norm = 60000;
        visK = 50;
        //naslov_grafa(4);
    } else if(dr == 4) {
        sT = "Število besed: ";
        sirK = 145;
    }
    if(dr == 1 || dr == 2 || dr == 3) {
        //console.log(parseInt((mouseX-10)/((w-20)/132)));
        var temp = tekstI.split("\n");
        var tempU = "";
        if(dr == 3)
            tempU = tekstU.split("\n");
        //console.log(temp);
        //console.log(tempU);
        var indeks = parseInt((mouseX - 40) / ((w - odmik) / 132));
        //console.log(indeks);
        if (indeks >= 0 && indeks < 132) {
            var visina = temp[indeks].substring(34, temp[indeks].length);
            var max_v = ((windowHeight / 2) / norm) * (visina);

            if (((mouseY - windowHeight / 2) * -1) > 0 && ((mouseY - windowHeight / 2) * -1) < max_v) {
                //console.log("dela");
                var s = temp[indeks].substring(8, 10) + ". " + temp[indeks].substring(5, 7) + ". " + temp[indeks].substring(0, 4) + "\n" + sT + "" + visina;
                if(dr == 3) {
                    var visinaU = tempU[indeks].substring(34, tempU[indeks].length);


                    s = s + "\n" + sU + "" + visinaU;
                }

                dan_test_klik = temp[indeks].substring(8, 10);
                mesec_test_klik = temp[indeks].substring(5, 7);
                leto_test_klik =  temp[indeks].substring(0, 4);

                fill(clrB);
                stroke(clrB);
                rect(0, (windowHeight / 2) + 50, (w), 200);
                stroke(clr);
                textSize(14);
                if (indeks < 100) {
                    fill(clrB);
                    rect(((indeks + 1) * ((w - odmik) / 132)) - 2, (windowHeight / 2) + 50, sirK, visK);
                    fill(clr);
                    text(s, (indeks + 1) * ((w - odmik) / 132), (windowHeight / 2) + 50, sirK, visK); // Text wraps within text box
                } else {
                    fill(clrB);
                    rect(((100) * ((w - odmik) / 132)) - 2, (windowHeight / 2) + 50, sirK, visK);
                    fill(clr);
                    text(s, (100) * ((w - odmik) / 132), (windowHeight / 2) + 50, sirK, visK);
                }
            }else {
                dan_test_klik = "";
                mesec_test_klik = "";
                leto_test_klik = "";
            }
        }
    } else if(dr == 4) {
        //console.log(parseInt((mouseX- 40)/((w-odmik)/tabG.length)));
        var indeks = parseInt((mouseX - 40) / ((w - odmik) / tabG.length));
        //console.log(indeks);
        if (indeks >= 0 && indeks < tabG.length) {
            var visina = parseInt(tabS[indeks].substring(2, tabS[indeks].length));
            var max_v = ((windowHeight / 2) / maxNorm) * (visina) + 100;
            if (((mouseY - windowHeight / 2) * -1) > 0 && ((mouseY - windowHeight / 2) * -1) < max_v) {
                //console.log("dela");

                var stBes = parseInt(tabG[indeks].substring(1, tabG[indeks].length-1), 10);
                var s = "Dolžina besede: " + stBes + "\n" + sT + "" + visina;
                fill(clrB);
                stroke(clrB);
                rect(0, (windowHeight / 2) + 50, (w), 200);
                stroke(clr);
                textSize(14);
                fill(clrB);
                rect(((w-odmik)/2)-100, (windowHeight / 2) + 50, sirK, visK);
                fill(clr);
                text(s, ((w-odmik)/2)-100, (windowHeight / 2) + 50, sirK, visK); // Text wraps within text box
            }
        }
    }
}


function colorButton(gumb, stGumb) {
    console.log("Pritisnjen je bil gumb " + gumb);
    if(gumb === 1 || gumb === 2 || gumb === 4) {
        document.getElementById("dan").value = "";
        document.getElementById("mesec").value = "";
        document.getElementById("leto").value = "";
        //naslov_grafa(gumb);
    }
    //document.getElementById("izbira"+gumb).style.backgroundColor = "#eaeaea";
    //document.getElementById("izbira"+gumb).style.backgroundColor = "#009900";
    document.getElementById("izbira"+gumb).style.backgroundColor = "#009900";
    document.getElementById("izbira"+gumb).style.color = "rgba(12, 12, 12, 0.88)";

    for(var i = 1; i <= stGumb; i++) {
        if (i != gumb) {
            document.getElementById("izbira" + i).style.backgroundColor = "rgba(12, 12, 12, 0.88)";
            //document.getElementById("izbira" + i).style.color = "#eaeaea";
            document.getElementById("izbira" + i).style.color = "#eaeaea";
        }
    }
}


/**
 * Ali ta kodni odsek za odpiranje xml datotek - kočni rezultat je enak se vidi v izpisu konzole v brskalniku
 * @type {XMLHttpRequest}
 */
function myFunction() {
    var day = document.getElementById("dan").value;
    var month = document.getElementById("mesec").value;
    var year = document.getElementById("leto").value;

    dan_test_klik ="";
    mesec_test_klik ="";
    leto_test_klik ="";

    var empty = 0;
    dr = 0;
    mode = 4;

    console.log(mode);

    //console.log(tekst);

    document.getElementById("dan").style.backgroundColor = "white";
    document.getElementById("mesec").style.backgroundColor = "white";
    document.getElementById("leto").style.backgroundColor = "white";

    /**
     * Preverjanje ali so podatki vnešeni - drugače obarva prazno polje rdeče
     * - trenutno napačno vnešene za testiranje modro
     */
    //console.log("Day: " + day + " | Month: " + month + " | Year: " + year);
    if (day == 0) {
        document.getElementById("dan").style.backgroundColor = "#ff6666";
        empty = 1;
    } else if (day < 1 || day > 31 || day.length < 2) {
        document.getElementById("dan").style.backgroundColor = "#4d6cff";
        empty = 2;
    }

    if (month == 0) {
        document.getElementById("mesec").style.backgroundColor = "#ff6666";
        empty = 1;
    } else if (month < 1 || month > 12 ||month.length < 2) {
        document.getElementById("mesec").style.backgroundColor = "#4d6cff";
        empty = 2;
    }

    if (year == 0) {
        document.getElementById("leto").style.backgroundColor = "#ff6666";
        empty = 1;
    } else if (year < 1990 || year > 1992) {
        document.getElementById("leto").style.backgroundColor = "#4d6cff";
        empty = 2;
    }

    /**
     * Prekinitev izvajanja funkcije
     */
    if (empty == 1) {
        console.log("Vnesite potrebne podatke");
        return;
    }
    if (empty == 2) {
        console.log("Vnesite pravilne podatke");
        return;
    }

    var regexString = year + "-" + month + "-" + day + "-ZbZdruDel";
    var regex2 = new RegExp(regexString + '\\W{1}\\w{4}\\W{1}\\w{2}\.xml', 'gm');
    var dir = "data/SlovParl-ana/SteviloBesedNaGovorca/";
    dirTemp = "";

    izhodi = myFunction3(regex2, tekst);

    /*
     Ce ni bilo seje tisti dan
     */
    if (izhodi == null) {
        document.getElementById("izbraneSeje").innerHTML = "Na dan " + day + ". " + month + ". " + year + " ni potekala nobena seja. Izberite drug datum."
        return;
    } else if (izhodi.length == 1) {
        document.getElementById("izbraneSeje").innerHTML = "Prikazani so podatki seje na dan " + day + ". " + month + ". " + year + "";
        //dirTemp = dir + izhodi[0];
        dirTemp = dir + izhodi[0] + ".txt";
        //console.log(dirTemp);
        var regexNum = 1;
        odpriSejo(dirTemp, regexNum);
        colorButton(3, 5);
        return;
    } else {
        document.getElementById("izbraneSeje").innerHTML = "Seje, ki so potekale na izbran dan: "
        for(var i = 0; i < izhodi.length; i++) {
            //dirTemp = dir + izhodi[i]
            dirTemp = dir + izhodi[i] + ".txt";
            var regexNum = 1;
            var temp = day + ". " + month + ". " + year + " seja " + izhodi[i].substring(23, 25) + " del " + izhodi[i].substring(27, 28);
            $("#izbraneSeje").append("<button type='button' class='btn btn-link' style='color: white;' onclick='odpriSejo(\"" + dirTemp + "\", \"" + regexNum + "\"); colorButton(3, 5);'>" + temp + "</button>");
            //console.log(temp);
            //console.log(dirTemp);
        }
        return;
    }

}

/**
 * Funkcija, ki izbriše vsebino opomb
 */
function clearIzbraneSejeText() {
    document.getElementById("izbraneSeje").innerHTML = "";
}

/**
 * Funkcija, ki se kliče iz gumbov na index.html in katera naredi izris zahtevane funkcije,
 * če je funkcija za posamezno sejo in ne vse seje
 * @param gumb
 */
function sestaviTempDir(gumb) {
    var dirHere = "";

    if(dirTemp.length == 0) {
        console.log("Ni izbranega datuma");
        document.getElementById("izbraneSeje").innerHTML = "Prosimo izberite datum željene seje.";
        return;
    }

    if(gumb == 1) {
        dr = -1;
        mode = 4;
        var dir = "data/SlovParl-ana/SteviloBesedNaGovorca/";
        var len = 0;
        if(dirTemp.includes(dir))
            len = 40;
        else
            len = 43;

        dirHere = dir +dirTemp.substring(len, dirTemp.length);
        //console.log(dirHere);
        odpriSejo(dirHere, 1);
        //console.log("Uporabljen je bil dirHere");
    }else if(gumb == 2){
        dr = 4;
        mode = 5;
        var dir = "data/SlovParl-ana/SeznamDolzineBesedNaSejo/";
        var len = 0;
        if(dirTemp.includes(dir))
            len = 43;
        else
            len = 40;
        dirHere = dir + dirTemp.substring(len, dirTemp.length);
        //console.log(dirHere);
        odpriSejo(dirHere, 3);
        //console.log("Uporabljen je bil dirHere");
    }
}

/**
 * Funkcija ki odpre izbrano sejo
 * @param dir
 * @param regex - regex, ki določa naprej (1,2 - stBesedNaGovorca || 3,4 SeznamDolzineBesedNaSejo)
 */
function odpriSejo(dir, regex) {
    var txt = $.ajax({
        type: "GET",
        url: dir,
        dataType: "text",
        success: function (result) {
            dirTemp = dir;
            tekstS = result;
            console.log(dir);
        }
    }).then(function() {
        //console.log(tekstS);
        tabG = myRegex(regex, tekstS);
        regex++;
        tabS = myRegex(regex, tekstS);

        console.log(tabG);
        console.log(tabS);

        clear();
        setup();
        var velikost = 2;
        console.log(velikost);
        if(regex == 2) {
            dr = -1;
            var x = (windowWidth - 20) / 8 / 2 + 30;
            var y = (windowHeight) / velikost / 2;
            //console.log(parseInt(tabS[0].substring(2, tabS[0].length)));
            izrisGovorcev(tabG, tabS, x, y, velikost, parseInt(tabS[0].substring(2, tabS[0].length)));
        }else if(regex == 4) {
            var x = 40;
            var y = windowHeight / 2;
            izris_dolzine_besed(tabS, x, y, tabS.length);
        }


        console.log("Successssss");
    });
}

/**
 * Funkcija izriše govorce in število izgovorjenih besed
 * @param tabGov
 * @param tabSt
 * @param x
 * @param y
 * @param velikost
 * @param normalizacija
 */
function izrisGovorcev(tabGov, tabSt, x, y, velikost, normalizacija) {
    naslov_grafa(6);
    var dolzina = tabGov.length;
    console.log(dolzina);
    var xS = 20;
    var yS = 0;
    for(var i = 0; i < tabGov.length; i++) {
        var st = parseInt(tabSt[i].substring(2, tabSt[i].length));
        fill(clr);
        var norma;
        if((((windowWidth-20)/8)/normalizacija)*(st) > (windowHeight)/velikost) {
            norma = (windowWidth - 30) / 8 / 2; //norma = (windowHeight)/velikost;
            yS = y - Math.abs(norma)/2 - 50;
        } else {
            norma = (((windowWidth - 30) / 8) / normalizacija) * (-st);
            yS = y - Math.abs(norma)/2 - 50;
        }
        //console.log(y + " | " + norma + " | " + yS);
        ellipse(x, y, norma);
        var vn = tabGov[i].substring(2,tabGov[i].length-1).replace(/[0-9]/g, '');
        var vn_test = "";
        vn_test += vn.charAt(0);

        for(var j=1; j<vn.length; j++){
            if(vn.charAt(j) == vn.charAt(j).toUpperCase()) {
                vn_test += ' ' + vn.charAt(j);
            }
            else{
                vn_test += vn.charAt(j);
            }
        }
        var s = "Govorec:\n" + vn_test + "\n" + "Število besed: " + st + "";
        text(s,xS,yS,(windowWidth - 20) / 6,50);
        x = x + (windowWidth - 20) / 6;
        xS = xS + (windowWidth - 20) / 6;
        if(i%5 == 4) {
            y = y + (windowHeight)/velikost;
            x = (windowWidth-20)/8/2 +30;
            xS = 20;
        }
        if(i == 9)
            break;
    }
}

/**
 * Funkcija, ki naloži vse xml - sedaj samo prebere
 * @param tip - odvisno kaj bere
 */
function loadAll(tip) {
    clear();
    setup();

    var regex = new RegExp('\.+', 'gm');
    //var dir = "data/SlovParl-ana/Sk-11-ana/";
    dirTemp = "";

    if(tip == 1) {
        dr = 1;
        mode = 1;
        //document.getElementById("izbraneSeje").innerHTML = "Prikaz števila tem obravnavanih na sejah";

        izhodi = myFunction3(regex, tekst);

        naloziTeme();
    } else if(tip == 2) {
        dr = 2;
        mode = 2;
        //document.getElementById("izbraneSeje").innerHTML = "Prikaz števila besed izgovorjenih na sejah";

        izhodi = myFunction3(regex, tekst);

        naloziBesede();
    } else if(tip == 3) {
        dr = 3;
        mode = 3;
        //document.getElementById("izbraneSeje").innerHTML = "Prikaz razmerja števila besed in unikatnih besed izgovorjenih na sejah";

        izhodi = myFunction3(regex, tekst);
        naloziRazmerje();
    }

}

/**
 *
 * Funkcija naredi tabelo z imeni datotek, ki spadajo pod regex
 *
 * @param regex - regularni izraz
 * @param txt - seznamSej.txt
 */
function myFunction3(regex, txt) {

    var izhodi2 = txt.match(regex);

    //console.log(izhodi2);

    return izhodi2;
}

/**
 * Funkcija, ki naredi tabelo za iskani regex
 *
 * @param regex - if, ki izbere kateri regex imamo
 * @param txt
 * @returns {Array|{index: number, input: string}}
 */
function myRegex(regex, txt) {
    var regexTemp;

    if(regex == 1 || regex == 3) {
        regexTemp = new RegExp('".+?"', 'gm');
    } else if(regex == 2 || regex == 4) {
        regexTemp = new RegExp(':\\s\\d+', 'gm');
    }

    //console.log(regexTemp);

    var izhodi2 = txt.match(regexTemp);
    return izhodi2;
}


/**
 * Naloži seznamSej ko se naloži stran in jo shrani v spremenljivko tekst
 */
function loadTxt() {
    var txt = $.ajax({
        type: "GET",
        url: "data/SlovParl-ana/seznamSej.txt",
        dataType: "text",
        success: function(result) {
            //$('textarea').val(result);
            console.log("success");
            tekst = result;
        }
    }).then(function() {
        var txt = $.ajax({
            type: "GET",
            url: "data/SlovParl-ana/vseSeje/steviloTemNaSejah.txt",
            dataType: "text",
            success: function (result) {
                //$('textarea').val(result);
                console.log("success2");
                tekstI = result;
            }
        }).then(function () {
            clear();
            setup();

            var regex = new RegExp('\.+', 'gm');
            var dir = "data/SlovParl-ana/Sk-11-ana/";
            dirTemp = "";

            //document.getElementById("izbraneSeje").innerHTML = "Prikaz števila tem obravnavanih na sejah";
            console.log(tekst);
            console.log(regex);

            izhodi = myFunction3(regex, tekst);
            console.log(izhodi.length);
            clear();
            setup();

            naslov_grafa(1);

            var x = 40;
            var y = windowHeight / 2;
            var res = tekstI.split("\n");
            dr = 1;
            najvecja_visina = 0;
            stevilo_tem = 0;

            for (var i = 0; i < izhodi.length; i++) {
                //dirTemp = dir+izhodi[i];
                //openXml(dirTemp,x,y,izhodi.length);
                vse_seje2(res, i, x, y, izhodi.length, 50, clr);
                //x = x + (windowWidth - 20) / izhodi.length;
                x = x + (w - odmik) / izhodi.length;
            }
            izrisCasovnice();
            //console.log(testTab);
        });
    });
}

/**
 * Funkcija za izris časovnice
 */
function izrisCasovnice() {
    var x1 = 40;
    var y = (windowHeight / 2)+10;
    //var x2 = 0;

    var st1990 = 0;
    var st1991 = 0;
    var st1992 = 0;
    strokeWeight(2);
    stroke(clr);
    var visina_napis = (windowHeight / 2)+ najvecja_visina;

    line(x1-10, y-10, x1-10,visina_napis);
    line(x1, y, w-10, y);

    fill(clr);
    line(x1-15, visina_napis, x1-5, visina_napis);
    line(x1-15, (((windowHeight / 2)-visina_napis)/2+visina_napis), x1-5, (((windowHeight / 2)-visina_napis)/2+visina_napis));
    line(x1-15, (windowHeight / 2), x1-5, (windowHeight / 2));

    // save drawing state for later
    push();

    // rotate by 45 degrees
    rotate(radians(90));

    translate(-5,-40);
    //translate(0, -600);

    strokeWeight(1);
    /**
     * Brez rotacije
     */
    //text(stevilo_tem,x1-10,visina_napis);
    //text(stevilo_tem/2,x1-10,(((windowHeight / 2)-visina_napis)/2+visina_napis));
    //text(0,x1-10,(windowHeight / 2));

    textAlign(CENTER);
    text(stevilo_tem,visina_napis+4, x1-10);
    text(stevilo_tem/2,(((windowHeight / 2)-visina_napis)/2+visina_napis)+4,x1-10);
    textAlign(LEFT);
    text(0,(windowHeight / 2)+1,x1-10);

    //restore previous drawing state
    pop();
    for(var i = 0; i < 12; i++) {
        st1990 += tab1990[i];
        st1991 += tab1991[i];
        st1992 += tab1992[i];
    }

    console.log(st1990 + " " + st1991 + " " + st1992);
    strokeWeight(2);
    line(x1, y+5, x1, y-5);
    strokeWeight(1);
    fill(clr);
    text("1990",x1-9,y+20);

    //x2 = x1 + (windowWidth-20)/(st1990*132);
    //x1 = x1 + ((windowWidth-20)/132)*st1990;
    /**
     * w -10-x1 = w - odmik
     */
    x1 = x1 + ((w-odmik)/132)*st1990;
    //console.log(x1);
    strokeWeight(2);
    line(x1, y+5, x1, y-5);
    strokeWeight(1);
    text("1991",x1-10,y+20);

    //x1 = x1 + ((windowWidth-20)/132)*st1991;
    x1 = x1 + ((w-odmik)/132)*st1991;
    strokeWeight(2);
    line(x1, y+5, x1, y-5);
    strokeWeight(1);
    text("1992",x1-10,y+20);

    //x1 = x1 + ((windowWidth-20)/132)*st1992;
    x1 = x1 + ((w-odmik)/132)*st1992;
    strokeWeight(2);
    line(x1, y+5, x1, y-5);
    strokeWeight(1);
    text("1993",x1-20,y+20);
}

/**
 * Izris casovnice za dolzine besed
 */
function izrisDolzineBesed() {
    var x1 = 40;
    var y = (windowHeight / 2)+10;
    var x2 = 0;

    var najkrajsa = parseInt(tabG[0].substring(1,tabG[0].length-1),10);
    var najdalsa = parseInt(tabG[tabG.length-1].substring(1, tabG[tabG.length-1].length-1), 10);//najdalsa.substring(1,najdalsa.length-1)


    strokeWeight(2);
    stroke(clr);
    var visina_napis = (windowHeight / 2)+ najvecja_visina;

    line(x1-10, y-10, x1-10,visina_napis);
    line(x1, y, w-10, y);

    fill(clr);
    line(x1-15, visina_napis, x1-5, visina_napis);
    line(x1-15, (((windowHeight / 2)-visina_napis)/2+visina_napis), x1-5, (((windowHeight / 2)-visina_napis)/2+visina_napis));
    line(x1-15, (windowHeight / 2), x1-5, (windowHeight / 2));

    // save drawing state for later
    push();

    // rotate by 45 degrees
    rotate(radians(90));

    translate(-5,-40);
    //translate(0, -600);

    strokeWeight(1);
    /**
     * Brez rotacije
     */
    //text(stevilo_tem,x1-10,visina_napis);
    //text(stevilo_tem/2,x1-10,(((windowHeight / 2)-visina_napis)/2+visina_napis));
    //text(0,x1-10,(windowHeight / 2));

    textAlign(CENTER);

    text(stevilo_tem,visina_napis+4, x1-10);
    text(Math.round(stevilo_tem/2),(((windowHeight / 2)-visina_napis)/2+visina_napis)+4, x1-10);
    textAlign(LEFT);
    text(0,(windowHeight / 2)+1, x1-10);

    //restore previous drawing state
    pop();


    //textAlign(LEFT);
    strokeWeight(2);
    stroke(clr);
    //line(10, y, windowWidth-10, y);
    line(x1, y, w-10, y);


    line(x1, y+5, x1, y-5);
    strokeWeight(1);
    fill(clr);
    text(najkrajsa,x1-9,y+20);


    //x1 = x1 + ((windowWidth-20)/132)*st1992;
    x1 = w-10;
    strokeWeight(2);
    line(x1, y+5, x1, y-5);
    strokeWeight(1);
    console.log(najdalsa);
    //console.log(najdalsa.substring(1,najdalsa.length-1));
    text(najdalsa,x1-15,y+20);
}


/**
 * Funkcija, ki nariše stolpce
 *
 * @param tekstF - tabela z imenom in vrednostjo
 * @param dir - stevilka datoteke
 * @param x - zacetna koordinata x
 * @param y - zacetna koordinata y
 * @param dolzina - stevilo prikazov
 * @param normalizacija - za normiranje visine stolpcev
 * @param color - barva izrisa
 */
function vse_seje2(tekstF, dir,x,y,dolzina, normalizacija, color) {
    var teme = parseInt(tekstF[dir].substring(34, tekstF[dir].length));
    fill(color);
    //rect(x,y,(windowWidth-20)/dolzina, ((windowHeight/2)/normalizacija)*(-teme));
    if(najvecja_visina > ((windowHeight/2)/normalizacija)*(-teme)) {
        najvecja_visina = ((windowHeight / 2) / normalizacija) * (-teme);
        stevilo_tem = teme;
    }
    //console.log("max visina je " + najvecja_visina);
    //console.log("stevilo tem pa " + stevilo_tem);
    rect(x,y,(w-20)/dolzina, ((windowHeight/2)/normalizacija)*(-teme));
}
/**
 * Funkcija, ki nariše stolpce
 *
 * @param tekstF - tabela z " : vrednostjo"
 * @param x - zacetna koordinata x
 * @param y - zacetna koordinata y
 * @param dolzina - stevilo prikazov
 */

function izris_dolzine_besed(tekstF,x,y,dolzina) {
    var normalizacija = 0;
    var teme = 0;
    najvecja_visina = 0;
    stevilo_tem = 0;
    for(var i = 0 ; i < tekstF.length;i++) {
        if(parseInt(tekstF[i].substring(2, tekstF[i].length)) > normalizacija) {
            normalizacija = parseInt(tekstF[i].substring(2, tekstF[i].length));
        }
    }
    naslov_grafa(5);
    normalizacija += 1000;
    maxNorm = normalizacija;
    fill(clr);
    //rect(x,y,(windowWidth-20)/dolzina, ((windowHeight/2)/normalizacija)*(-teme));
    for(var i = 0; i < tekstF.length; i++) {
        teme = parseInt(tekstF[i].substring(2, tekstF[i].length));
        if(najvecja_visina > ((windowHeight/2)/normalizacija)*(-teme)){
            najvecja_visina = ((windowHeight/2)/normalizacija)*(-teme);
            stevilo_tem = teme;
        }
        rect(x,y,(w-odmik)/dolzina, ((windowHeight/2)/normalizacija)*(-teme));
        x = x + (w - odmik) / tekstF.length;
    }
    //console.log("Dolzina besed max : " + teme);
    //console.log("najvecja visina : " + najvecja_visina);
    izrisDolzineBesed();
}

/**
 * Funkcija naloži število tem na sejah
 */
function naloziTeme() {
    clear();
    setup();

    var txt = $.ajax({
        type: "GET",
        url: "data/SlovParl-ana/vseSeje/steviloTemNaSejah.txt",
        dataType: "text",
        success: function (result) {
            //$('textarea').val(result);
            console.log("success2");
            tekstI = result;
        }
    }).then(function () {
        naslov_grafa(1);
        var x = 40;
        var y = windowHeight / 2;
        var res = tekstI.split("\n");
        najvecja_visina = 0;
        stevilo_tem = 0;
        for (var i = 0; i < izhodi.length; i++) {
            //dirTemp = dir + izhodi[i];
            //openXml(dirTemp, x, y, izhodi.length);
            vse_seje2(res, i, x, y, izhodi.length, 50, clr);
            //x = x + (windowWidth - 20) / izhodi.length;
            x = x + (w - 50) / izhodi.length;
        }
        izrisCasovnice();
        //console.log(testTab);
    });
}

/**
 * Funkcija naloži število besed na sejah
 */
function naloziBesede() {
    clear();
    setup();

    var txt = $.ajax({
        type: "GET",
        url: "data/SlovParl-ana/vseSeje/stBesedNaSejo.txt",
        dataType: "text",
        success: function (result) {
            //$('textarea').val(result);
            console.log("success2");
            tekstI = result;
        }
    }).then(function () {
        naslov_grafa(2);
        var x = 40;
        var y = windowHeight / 2;
        var res = tekstI.split("\n");

        for (var i = 0; i < izhodi.length; i++) {
            //dirTemp = dir + izhodi[i];
            //openXml(dirTemp, x, y, izhodi.length);
            vse_seje2(res, i, x, y, izhodi.length, 60000, clr);
            //x = x + (windowWidth - 20) / izhodi.length;
            x = x + (w - 50) / izhodi.length;
        }
        izrisCasovnice();
        //console.log(testTab);
    });
}

/**
 * Funkcija za prikaz razmerja med vsemi besedami in unikatnimi besedami
 */
function naloziRazmerje() {
    clear();
    setup();

    var txt = $.ajax({
        type: "GET",
        url: "data/SlovParl-ana/vseSeje/stBesedNaSejo.txt",
        dataType: "text",
        success: function (result) {
            //$('textarea').val(result);
            console.log("success2");
            tekstI = result;
        }
    }).then(function () {
        var txt = $.ajax({
            type: "GET",
            url: "data/SlovParl-ana/vseSeje/stUnikatnihBesedNaSejo.txt",
            dataType: "text",
            success: function (result) {
                console.log("success3");
                tekstU = result;
            }
        }).then(function () {
            naslov_grafa(4);
            var x = 40;
            var y = windowHeight / 2;
            var res = tekstI.split("\n");
            var resU = tekstU.split("\n");
            najvecja_visina = 0;
            stevilo_tem = 0;
            for (var i = 0; i < izhodi.length; i++) {
                //dirTemp = dir + izhodi[i];
                //openXml(dirTemp, x, y, izhodi.length);
                vse_seje2(res, i, x, y, izhodi.length, 60000, clr);
                vse_seje2(resU, i, x, y, izhodi.length, 60000, clr2);
                //x = x + (windowWidth - 20) / izhodi.length;
                x = x + (w - 50) / izhodi.length;
            }
            izrisCasovnice();
            //console.log(testTab);
        });
    });
}

/**
 * Funkcija za izbor seje
 */
function mouseClicked() {
    if(dan_test_klik.length>1 && mesec_test_klik > 1 && leto_test_klik > 3) {
        console.log(dan_test_klik);
        console.log(mesec_test_klik);
        console.log(leto_test_klik);
        document.getElementById("dan").value = dan_test_klik;
        document.getElementById("mesec").value = mesec_test_klik;
        document.getElementById("leto").value = leto_test_klik;
    }
}

/**
 * Funkcija za vklop overlaya
 */
function on() {
    document.getElementById("overlay").style.display = "block";
}

/**
 * Funkcija za izklop overlaya
 */
function off() {
    document.getElementById("overlay").style.display = "none";
}

/**
 * Funkcija za dinamičen resize canvasa
 * @param event
 */
window.onresize = function(event) {
    clear();
    setup();
    console.log(mode);
    if(mode == 1 || mode == 2 || mode == 3)
        loadAll(mode);
    else if(mode == 4)
        sestaviTempDir(1);
    else
        sestaviTempDir(2);
};

/**
 * Funkcija za izpis naslova prikazanega grafa
 * @param index - tekst, ki ga izpiše
 */
function naslov_grafa(index){
    textAlign(CENTER);
    fill(0, 0, 0);
    textSize(20);
    if(index===1) {
        text("Število tem na sejah", width/2, 40);
        console.log("Število tem na sejah");
    }
    else if(index === 2){
        text("Število besed na sejah", width/2, 40);
        console.log("Število besed na sejah");
    }
    else if(index === 4){
        text("Razmerje vseh in unikatnih besed", width/2, 40);
        console.log("Razmerje vseh in unikatnih besed");
    }
    else if(index === 5) {
        text("Dolžina izgovorjenih besed na seji dne " + document.getElementById("dan").value + "." + document.getElementById("mesec").value + "." + document.getElementById("leto").value, width / 2, 40);
    }
    else if(index === 6) {
        text("Število besed na govorca na seji dne " + document.getElementById("dan").value + "." + document.getElementById("mesec").value + "." + document.getElementById("leto").value, width / 2, 40);
    }
    textSize(12);
}