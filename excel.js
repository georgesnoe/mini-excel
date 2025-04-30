document.addEventListener("DOMContentLoaded", function() {
    window.cellulePtr = null;
    (function() {
        let toolBold = document.querySelector(".tool.bold");
        let toolItalic = document.querySelector(".tool.italic");
        let toolUnderline = document.querySelector(".tool.underline");
        let toolFont = document.querySelector(".font-chooser");
        let toolSize = document.querySelector(".font-sizer");

        toolBold.onclick = function() {
            if(window.cellulePtr.getAttribute("bold") == "no") {
                window.cellulePtr.setAttribute("bold", "yes");
                toolBold.classList.add("active");
            } else {
                window.cellulePtr.setAttribute("bold", "no");
            }
            window.cellulePtr.focus();
        };
        toolItalic.onclick = function() {
            if(window.cellulePtr.getAttribute("italic") == "no") {
                window.cellulePtr.setAttribute("italic", "yes");
                toolItalic.classList.add("active");
            } else {
                window.cellulePtr.setAttribute("italic", "no");
            }
            window.cellulePtr.focus();
        };
        toolUnderline.onclick = function() {
            if(window.cellulePtr.getAttribute("underline") == "no") {
                window.cellulePtr.setAttribute("underline", "yes");
                toolUnderline.classList.add("active");
            } else {
                window.cellulePtr.setAttribute("underline", "no");
            }
            window.cellulePtr.focus();
        };
        toolFont.onchange = function() {
            window.cellulePtr.setAttribute("font", toolFont.value);
            window.cellulePtr.focus();
        }
        toolSize.onchange = function() {
            window.cellulePtr.setAttribute("size", toolSize.value);
            window.cellulePtr.focus();
        }
    })();

    setTimeout(function() {
        let zone = document.querySelector(".zone");
        zone.style.height = `calc(100vh - ${zone.offsetTop}px)`;
    }, 2000);

    (function() {
        let lignes = document.querySelector(".lignes");
        for(let i = 0; i < 100; i++) {
            let ligne = document.createElement("div");
            ligne.classList.add("ligne");
            ligne.textContent = `${i + 1}`;
            lignes.appendChild(ligne);
        }
    })();

    (function() {
        let colonnes = document.querySelector(".colonnes");
        let lettres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(let i of lettres) {
            let colonne = document.createElement("div");
            colonne.classList.add("colonne");
            colonne.textContent = `${i}`;
            colonnes.appendChild(colonne);
        }
    })();

    (function() {
        let cellules = document.querySelector(".cellules");
        let lettres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(let i = 0; i < 100; i++) {
            for(let u of lettres) {
                let ligne = i;
                let colonne = u;
                let cellule = document.createElement("input");
                cellule.classList.add("cellule");
                cellule.setAttribute("ligne", `${ligne}`);
                cellule.setAttribute("colonne", `${colonne}`);
                cellule.setAttribute("cellule", `${colonne}${ligne}`);
                cellule.setAttribute("font", "roboto");
                cellule.setAttribute("bold", "no");
                cellule.setAttribute("italic", "no");
                cellule.setAttribute("underline", "no");
                cellule.setAttribute("size", "14");
                cellule.setAttribute("formula", "");
                cellule.setAttribute("realvalue", "");
                cellule.onfocus = function() {
                    cellule.value = cellule.getAttribute("formula");
                    window.cellulePtr = cellule;
                    cellule.style.border = 'solid 3px blue';

                    document.querySelector(".info").textContent = `${colonne}${ligne}`;

                    let toolBold = document.querySelector(".tool.bold");
                    let toolItalic = document.querySelector(".tool.italic");
                    let toolUnderline = document.querySelector(".tool.underline");
                    let toolFont = document.querySelector(".font-chooser");
                    let toolSize = document.querySelector(".font-sizer");

                    if(toolBold.classList.contains("active")) {
                        toolBold.classList.remove("active");
                    }
                    if(toolItalic.classList.contains("active")) {
                        toolItalic.classList.remove("active");
                    }
                    if(toolUnderline.classList.contains("active")) {
                        toolUnderline.classList.remove("active");
                    }
                    toolFont.value = "roboto";
                    toolSize.value = "14";

                    if(cellule.getAttribute("bold") == "yes") {
                        toolBold.classList.add("active");
                    }
                    if(cellule.getAttribute("italic") == "yes") {
                        toolItalic.classList.add("active");
                    }
                    let _fontName = cellule.getAttribute("font");
                    switch(_fontName) {
                        case 'roboto':
                            toolFont.selectedIndex = 0;
                            break;
                        case 'inter':
                            toolFont.selectedIndex = 1;
                            break;
                        case 'nationalpark':
                            toolFont.selectedIndex = 2;
                            break;
                    }
                    let _fontSize = cellule.getAttribute("size");
                    toolSize.selectedIndex = _fontSize - 8;
                };
                cellule.onblur = function() {
                    cellule.style.border = 'solid 1px black';
                    cellule.setAttribute("formula", cellule.value);
                    let formula = cellule.value;
                    if(formula.charAt(0) == '=') {
                        let value = formula.slice(1);
                        let arr = [];
                        while(/[A-Z][0-9]+/.test(value) == true) {
                            arr.push(/[A-Z][0-9]+/.exec(value)[0]);
                        }
                        for(let i of arr) {
                            value.replace(i, document.querySelector(`[cellule="${i}"]`).value);
                        }
                        cellule.setAttribute("realvalue", value);
                        cellule.value = eval(value);
                    } else {
                        cellule.setAttribute("formula", formula);
                        cellule.setAttribute("realvalue", formula);
                        cellule.value = formula;
                    }
                }
                cellules.appendChild(cellule);
            }
        }
    })();
});