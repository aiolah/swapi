// Menu burger : si on clique sur l'icône, le menu apparaît ou disparaît + icône qui change
let menuBurger = document.getElementById("menu-burger");
let menuBurgerCross = document.getElementById("menu-burger-cross");
menuBurger.addEventListener("click", afficheMenu);
menuBurgerCross.addEventListener("click", afficheMenu);

/**
 * Gère le menu burger en togglant des classes
 */
function afficheMenu()
{
    document.querySelector("nav").classList.toggle("open");
    document.querySelector("nav ul").classList.toggle("open");
    menuBurger.classList.toggle("iconNonActive");
    menuBurgerCross.classList.toggle("iconNonActive");
    menuBurger.classList.toggle("iconActive");
    menuBurgerCross.classList.toggle("iconActive");
}