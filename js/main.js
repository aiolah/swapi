//------------------------------------------------------ Classe Movie
class Movie
{
    constructor(result)
    {
        // Chaque item du tableau retourné par la requête devient un attribut
        for(let item in result)
        {
            // Le crochet permet de passer des variables dans le this
            this[item] = result[item];
        }
    }
}

//------------------------------------------------------ Classe Character
class Character
{
    constructor(result, emoji = null)
    {
        // Chaque item du tableau retourné par la requête devient un attribut
        for(let item in result)
        {
            // Le crochet permet de passer des variables dans le this
            this[item] = result[item];
        }
        this.emoji = emoji;
    }
}

//------------------------------------------------------ Classe Starship
class Starship
{
    constructor(result)
    {
        // Chaque item du tableau retourné par la requête devient un attribut
        for(let item in result)
        {
            // Le crochet permet de passer des variables dans le this
            this[item] = result[item];
        }
    }
}

//------------------------------------------------------ Classe Planet
class Planet
{
    constructor(result)
    {
        // Chaque item du tableau retourné par la requête devient un attribut
        for(let item in result)
        {
            // Le crochet permet de passer des variables dans le this
            this[item] = result[item];
        }
    }
}

//------------------------------------------------------ Classe Species
class Species
{
    constructor(result)
    {
        // Chaque item du tableau retourné par la requête devient un attribut
        for(let item in result)
        {
            // Le crochet permet de passer des variables dans le this
            this[item] = result[item];
        }
    }
}

//----------------------------------------------------- AddEventListeners sur les liens du menu
document.querySelectorAll("a").forEach(element => {
    element.addEventListener("click", display);
})

//---------------------------------------------------- Callback AddEventListeners
let page = 1;

/**
 * Fonction qui définit l'url sur laquelle on va requêter et qui fait l'appel AJAX
 * @param {*} event 
 */
function display(event)
{
    event.preventDefault();
    window.location.hash = event.target.id;
    
    const swapi = "https://swapi.dev/api/"
    
    let fetchOptions = { method: 'GET'};
    let url;
    let param;
    let previousSelected = document.querySelector(".item-menu.selected");

    if(previousSelected != null)
    {
        previousSelected.classList.remove("selected");
    }

    // People
    if(window.location.href.includes("#people"))
    {
        param = "people";
        document.querySelector("#people").classList.add("selected");
    }
    // Starships
    else if(window.location.href.includes("#starships"))
    {
        param = "starships";
        document.querySelector("#starships").classList.add("selected");
    }
    // Movies
    else if(window.location.href.includes("#films"))
    {
        param = "films";
        document.querySelector("#films").classList.add("selected");
    }
    else if(window.location.href.includes("#planets"))
    {
        param = "planets";
        document.querySelector("#planets").classList.add("selected");
    }
    else if(window.location.href.includes("#species"))
    {
        param = "species";
        document.querySelector("#species").classList.add("selected");
    }

    url = swapi + param;

    fetch(url, fetchOptions)
    .then( (response) => { return response.json() })
    .then ( (dataJSON) => {
        changePage(dataJSON, param);
    });
}

/**
 * Fonction de callback des évènements click des boutons left et right (changement de fonction car sinon l'id du bouton se mettait dans l'URL et ça cassait tout !!!)
 * @param {*} event 
 */
function displayNewPage(event)
{
    event.preventDefault();
    const swapi = "https://swapi.dev/api/"
    
    let fetchOptions = { method: 'GET'};
    let url;
    let param = window.location.hash.replace("#", "");

    if(event.target.side != null && event.target.side == "left" && event.target.id == "left")
    {
        if(page > 1)
        {
            page--;
        }
        url = swapi + param + "/?page=" + page;
    }
    else if(event.target.side != null && event.target.side == "right" && event.target.id == "right")
    {
        if(param == "people" && page < 9)
        {
            page++;
            url = swapi + param + "/?page=" + page;
        }
        else if(param == "starships" && page < 4)
        {
            page++;
            url = swapi + param + "/?page=" + page;
        }
        else if(param == "planets" && page < 6)
        {
            page++;
            url = swapi + param + "/?page=" + page;
        }
        else if(param == "species" && page < 4)
        {
            page++;
            url = swapi + param + "/?page=" + page;
        }
    }
    else
    {
        url = swapi + param + "/?page=" + page;
    }

    // Si l'URL est définie, c'est qu'il y a une page après
    if(url != undefined)
    {
        fetch(url, fetchOptions)
        .then( (response) => { return response.json() })
        .then ( (dataJSON) => {
            changePage(dataJSON, param);
        });
    }

}

//------------------------------------------------------------------ Fonctions code factorisé
/**
 * Fonction qui permet de changer de page et qui appelle la fonction de génération des cartes
 * @param {*} dataJSON 
 * @param {*} param 
 */
function changePage(dataJSON, param)
{
    // Suppression du message d'accueil
    if(document.querySelector("article"))
    {
        document.querySelector("section").removeChild(document.querySelector("article"));
    }
    // Suppression des cartes
    document.querySelectorAll(".card").forEach(child => {
        document.querySelector("section").removeChild(child);
    });

    switch(param)
    {
        case "films":
            suppressSingleElement()
            generateMoviesCards(dataJSON);
        break;

        case "people":
            suppressSingleElement()
            generatePeopleCards(dataJSON);
        break;

        case "starships":
            suppressSingleElement()
            generateStarshipsCards(dataJSON);
        break;

        case "planets":
            suppressSingleElement()
            generatePlanetsCards(dataJSON);
        break;

        case "species":
            suppressSingleElement()
            generateSpeciesCards(dataJSON);
        break;
    }
}

/**
 * Fonction qui supprime les single elements qui ont pu être générés avant
 */
function suppressSingleElement()
{
    if(document.querySelectorAll(".single-element") != undefined)
    {
        // On supprime les éléments single qui ont été créés auparavant
        document.querySelectorAll(".single-element").forEach(element => {
            document.querySelector("section").removeChild(element);
        })
    }
}


/**
 * Fonction qui génère les cartes des films
 * @param {*} dataJSON 
 */
function generateMoviesCards(dataJSON)
{
    let movies = [];
    for(i = 0; i<dataJSON.results.length; i++)
    {
        let movie = new Movie(dataJSON.results[i]);
        movies.push(movie);
    }
    // Pour bien afficher les cartes des movies
    document.querySelector("section").classList.add("cards");
    
    movies.forEach(element => {
        let article = document.createElement("article");
        article.addEventListener("click", (_) => showOneMovie(element));
        article.classList.add("card");
        article.classList.add("movie-card");
        article.innerText = element.title;
        article.innerHTML += "<p class='film-color'>" + determineEpisodeNumber(element);  + "</p>";
        document.querySelector("section").appendChild(article);
})
    // Suppression des flèches pour qu'elle se regénère bien
    document.querySelectorAll(".button").forEach(child => {
        document.querySelector("section").removeChild(child);
    });
}

/**
 * Fonction qui associe un chiffre romain au numéro de l'épisode correspondant
 * @param {*} element Élément Movie
 * @returns Le chiffre romain associé au numéro de l'épisode
 */
function determineEpisodeNumber(element)
{
    let romanNumeral;
    switch(element.episode_id)
    {
        case 1:
            romanNumeral = "I";
        break;
        case 2:
            romanNumeral = "II";
        break;
        case 3:
            romanNumeral = "III";
        break;
        case 4:
            romanNumeral = "IV";
        break;
        case 5:
            romanNumeral = "V";
        break;
        case 6:
            romanNumeral = "VI";
        break;
    }
    return romanNumeral;
}

/**
 * Fonction qui affiche un seul épisode quand on clique dessus
 * @param {*} element Élément Movie, instance d'une classe Movie récupérée grâce à l'API
 */
function showOneMovie(element)
{
    suppressCardsAndArrows();

    let article = document.createElement("article");
    article.classList.add("single-element");
    article.classList.add("movie");
    // Title
    let title = document.createElement("p");
    title.classList.add("title");
    title.innerHTML = element.title + " (" + "<span class='film-color'>" + determineEpisodeNumber(element) + "</span>" + ")";
    let div = document.createElement("div");
    div.id = "div-contains-p";
    // Synopsis
    let synopsis = generateP();
    synopsis.innerHTML = "<span class='film-color'>Synopsis : </span>" + "<span class='text'>" + element.opening_crawl + "</span>";
    // Director
    let director = generateP();
    director.innerHTML = "<span class='film-color'>Director : </span>" + "<span class='text'>" + element.director + "</span>";
    // Producer
    let producer = generateP();
    producer.innerHTML = "<span class='film-color'>Producer : </span>" + "<span class='text'>" + element.producer + "</span>";
    // Release date
    let releaseDate = generateP();
    releaseDate.innerHTML = "<span class='film-color'>Release date : </span>" + "<span class='text'>" + element.release_date + "</span>";
    // AppendChild
    document.querySelector("section").appendChild(article);
    document.querySelector("article").appendChild(title);
    document.querySelector("article").appendChild(div)
    let divContainsP = document.querySelector("#div-contains-p");
    divContainsP.appendChild(synopsis);
    divContainsP.appendChild(director);
    divContainsP.appendChild(producer);
    divContainsP.appendChild(releaseDate);
}

/**
 * Fonction qui supprime les cartes et les flèches avant d'afficher un seul élément
 */
function suppressCardsAndArrows()
{
    // Suppression des cartes
    document.querySelectorAll(".card").forEach(child => {
        document.querySelector("section").removeChild(child);
    });
    // Suppression des flèches
    document.querySelectorAll(".button").forEach(child => {
        document.querySelector("section").removeChild(child);
    });
}

/**
 * Fonction qui génère un paragraphe qui a pour classe margin-p
 * @returns Un paragraphe
 */
function generateP()
{
    let p = document.createElement("p");
    p.classList.add("margin-p");
    return p;
}
 

/**
 * Fonction qui crée les cartes personnages
 * @param {*} dataJSON 
 */
function generatePeopleCards(dataJSON)
{
    let characters = [];
    for(i = 0; i<dataJSON.results.length; i++)
    {
        let character = new Character(dataJSON.results[i]);
        characters.push(character);
    }
    document.querySelector("section").classList.remove("movies");

    characters.forEach(element => {
        let article = document.createElement("article");
        article.addEventListener("click", (_) => showOneCharacter(element));
        article.classList.add("card");
        article.classList.add("people-card");
        article.innerText = element.name;

        // Rajout des smileys dans la card et dans l'instance de la classe
        if(element.gender == "male")
        {
            article.innerHTML += "<br> ♂️";
            element.emoji = "♂️";
            if((element.skin_color == "light" || element.skin_color == "fair" || element.skin_color == "white" || element.skin_color == "pale") && element.hair_color == "brown" || element.hair_color == "black")
            {
                element.emoji += "👨🏻";
                article.innerHTML += "👨🏻";
            }
            else if((element.skin_color == "light" || element.skin_color == "fair" || element.skin_color == "white" || element.skin_color == "pale") && element.hair_color == "blond")
            {
                element.emoji += "👱🏻‍♂️";
                article.innerHTML += "👱🏻‍♂️";
            }
            else if((element.skin_color == "light" || element.skin_color == "fair" || element.skin_color == "white" || element.skin_color == "pale") && element.hair_color == "grey")
            {
                element.emoji += "🧓🏻";
                article.innerHTML += "🧓🏻";
            }
        }
        else if(element.gender == "female")
        {
            article.innerHTML += "<br> ♀️";
            element.emoji = "♀️";
            if((element.skin_color == "light" || element.skin_color == "fair" || element.skin_color == "white" || element.skin_color == "pale") && element.hair_color == "brown")
            {
                element.emoji += "👩🏻";
                article.innerHTML += "👩🏻";
            }
            else if((element.skin_color == "light" || element.skin_color == "fair" || element.skin_color == "white" || element.skin_color == "pale") && element.hair_color == "blond")
            {
                element.emoji += "👱🏻‍♀️";
                article.innerHTML += "👱🏻‍♀️";
            }
        }

        document.querySelector("section").appendChild(article);
    })
    // Suppression des flèches pour qu'elle se regénère bien
    document.querySelectorAll(".button").forEach(child => {
        document.querySelector("section").removeChild(child);
    });
    generateButton("left");
    generateButton("right");
}

/**
 * Fonction qui affiche un seul personnage quand on clique dessus
 * @param {*} element Élément Character, instance d'une classe Character récupérée grâce à l'API
 */
function showOneCharacter(element)
{
    // Suppression des cartes
    document.querySelectorAll(".card").forEach(child => {
        document.querySelector("section").removeChild(child);
    });
    // Suppression des flèches
    document.querySelectorAll(".button").forEach(child => {
        document.querySelector("section").removeChild(child);
    });

    let article = document.createElement("article");
    article.classList.add("single-element");
    article.classList.add("character");
    // Title
    let name = document.createElement("p");
    name.classList.add("name");
    if(element.emoji != null)
    {
        name.innerHTML = element.name + "<br>" + element.emoji;
    }
    else
    {
        name.innerHTML = element.name;
    }
    let div = document.createElement("div");
    div.id = "div-contains-p";
    // Height
    let height = generateP();
    height.innerHTML = "<span class='character-color'>Height : </span>" + "<span class='text'>" + element.height + "</span>";
    // Mass
    let mass = generateP();
    mass.innerHTML = "<span class='character-color'>Mass : </span>" + "<span class='text'>" + element.mass + "</span>";
    // Hair color
    // Déclarer la variable avant le if sinon elle ne sera pas accessible dans le appendChild
    let hairColor;
    if(element.hair_color != "n/a")
    {
        hairColor = generateP();
        hairColor.innerHTML = "<span class='character-color'>Hair color : </span>" + "<span class='text'>" + element.hair_color + "</span>";
    }
    // Skin color
    let skinColor = generateP();
    skinColor.innerHTML = "<span class='character-color'>Skin color : </span>" + "<span class='text'>" + element.skin_color + "</span>";
    // Eye color
    let eyeColor = generateP();
    eyeColor.innerHTML = "<span class='character-color'>Eye color : </span>" + "<span class='text'>" + element.eye_color + "</span>";
    // Birth year
    let birthYear = generateP();
    birthYear.innerHTML = "<span class='character-color'>Birth year : </span>" + "<span class='text'>" + element.birth_year + "</span>";
    // Gender
    let gender;
    if(element.gender != "n/a")
    {
        gender = generateP();
        gender.innerHTML = "<span class='character-color'>Gender : </span>" + "<span class='text'>" + element.gender + "</span>";
    }
    // AppendChild
    document.querySelector("section").appendChild(article);
    document.querySelector("article").appendChild(name);
    document.querySelector("article").appendChild(div)
    let divContainsP = document.querySelector("#div-contains-p");
    divContainsP.appendChild(height);
    divContainsP.appendChild(mass);
    if(element.hair_color != "n/a")
    {
        divContainsP.appendChild(hairColor);
    }
    divContainsP.appendChild(skinColor);
    divContainsP.appendChild(eyeColor);
    divContainsP.appendChild(birthYear);
    if(element.gender != "n/a")
    {
        divContainsP.appendChild(gender);
    }
}


/**
 * Fonction qui génère les cartes des vaisseaux
 * @param {*} dataJSON 
 */
function generateStarshipsCards(dataJSON)
{
    let starships = [];
    for(i = 0; i<dataJSON.results.length; i++)
    {
        let starship = new Starship(dataJSON.results[i]);
        starships.push(starship);
    }
    document.querySelector("section").classList.remove("movies");

    starships.forEach(element => {
        let article = document.createElement("article");
        article.addEventListener("click", (_) => showOneStarship(element));
        article.classList.add("card");
        article.classList.add("starship-card");
        article.innerText = element.name;
        // article.innerHTML += "<br>" + element.starship_class;

        document.querySelector("section").appendChild(article);
    })
    // Suppression des flèches pour qu'elle se regénère bien
    document.querySelectorAll(".button").forEach(child => {
        document.querySelector("section").removeChild(child);
    });
    generateButton("left");
    generateButton("right");
}

/**
 * Fonction qui affiche un vaisseau quand on clique dessus
 * @param {*} element Élément Starship, instance de la classe Starship récupérée grâce à l'API
 */
function showOneStarship(element)
{
    suppressCardsAndArrows();

    let article = document.createElement("article");
    article.classList.add("single-element");
    article.classList.add("starship");
    // Title
    let name = document.createElement("p");
    name.classList.add("name");
    name.innerHTML = element.name;
    let div = document.createElement("div");
    div.id = "div-contains-p";
    // Model
    let model;
    if(element.model != element.name)
    {
        model = generateP();
        model.innerHTML = "<span class='starship-color'>Model : </span>" + "<span class='text'>" + element.model + "</span>";
    }
    // Manufacturer
    let manufacturer = generateP();
    manufacturer.innerHTML = "<span class='starship-color'>Manufacturer : </span>" + "<span class='text'>" + element.manufacturer + "</span>";
    // Cost in credits
    let costInCredits = generateP();
    costInCredits.innerHTML = "<span class='starship-color'>Cost in credits : </span>" + "<span class='text'>" + element.cost_in_credits + "</span>";
    // Length
    let length = generateP();
    length.innerHTML = "<span class='starship-color'>Length : </span>" + "<span class='text'>" + element.length + " m</span>";
    // Max atmosphering speed
    let maxAtmospheringSpeed = generateP();
    maxAtmospheringSpeed.innerHTML = "<span class='starship-color'>Max atmosphering speed : </span>" + "<span class='text'>" + element.max_atmosphering_speed + "</span>";
    // Crew
    let crew = generateP();
    crew.innerHTML = "<span class='starship-color'>Crew : </span>" + "<span class='text'>" + element.crew + "</span>";
    // Passengers
    let passengers = generateP();
    passengers.innerHTML = "<span class='starship-color'>Passengers : </span>" + "<span class='text'>" + element.passengers + "</span>";
    // Cargo capacity
    let cargoCapacity = generateP();
    cargoCapacity.innerHTML = "<span class='starship-color'>Cargo capacity : </span>" + "<span class='text'>" + element.cargo_capacity + " kg</span>";
    // Consumables
    let consumables = generateP();
    consumables.innerHTML = "<span class='starship-color'>Consumables : </span>" + "<span class='text'>" + element.consumables + "</span>";
    // Hyperdrive rating
    let hyperdriveRating = generateP();
    hyperdriveRating.innerHTML = "<span class='starship-color'>Hyperdrive rating : </span>" + "<span class='text'>" + element.hyperdrive_rating + "</span>";
    // MGLT
    let mglt = generateP();
    mglt.innerHTML = "<span class='starship-color'>MGLT : </span>" + "<span class='text'>" + element.mglt + "</span>";
    // Starship class
    let starshipClass = generateP();
    starshipClass.innerHTML = "<span class='starship-color'>Starship class : </span>" + "<span class='text'>" + element.starship_class + "</span>";
    // AppendChild
    document.querySelector("section").appendChild(article);
    document.querySelector("article").appendChild(name);
    document.querySelector("article").appendChild(div)
    let divContainsP = document.querySelector("#div-contains-p");
    if(element.model != element.name)
    {
        divContainsP.appendChild(model);
    }
    divContainsP.appendChild(manufacturer);
    divContainsP.appendChild(costInCredits);
    divContainsP.appendChild(length);
    divContainsP.appendChild(maxAtmospheringSpeed);
    divContainsP.appendChild(crew);
    divContainsP.appendChild(passengers);
    divContainsP.appendChild(cargoCapacity);
    divContainsP.appendChild(consumables);
    divContainsP.appendChild(hyperdriveRating);
    divContainsP.appendChild(mglt);
    divContainsP.appendChild(starshipClass);
}

/**
 * Fonction qui génère les cartes des planètes
 * @param {*} dataJSON 
 */
function generatePlanetsCards(dataJSON)
{
    let planets = [];
    for(i = 0; i<dataJSON.results.length; i++)
    {
        let planet = new Planet(dataJSON.results[i]);
        planets.push(planet);
    }
    document.querySelector("section").classList.remove("movies");

    planets.forEach(element => {
        let article = document.createElement("article");
        article.addEventListener("click", (_) => showOnePlanet(element));
        article.classList.add("card");
        article.classList.add("planet-card");
        article.innerText = element.name;
        article.innerHTML += "<p class='subtitle'>" + element.climate + ", " + element.terrain + "</p>";

        document.querySelector("section").appendChild(article);
    })
    // Suppression des flèches pour qu'elle se regénère bien
    document.querySelectorAll(".button").forEach(child => {
        document.querySelector("section").removeChild(child);
    });
    generateButton("left");
    generateButton("right");
}

/**
 * Fonction qui affiche une planète quand on clique dessus
 * @param {*} element Élément Planet, instance de la classe Planet récupérée grâce à l'API
 */
function showOnePlanet(element)
{
    suppressCardsAndArrows();

    let article = document.createElement("article");
    article.classList.add("single-element");
    article.classList.add("planet");

    // Title
    let name = document.createElement("p");
    name.classList.add("name");
    name.innerHTML = element.name;
    let div = document.createElement("div");
    div.id = "div-contains-p";
    // Rotation period
    let rotationPeriod = generateP();
    rotationPeriod.innerHTML = "<span class='planet-color'>Rotation period : </span>" + "<span class='text'>" + element.rotation_period + "</span>";
    // Orbital period
    let orbitalPeriod = generateP();
    orbitalPeriod.innerHTML = "<span class='planet-color'>Orbital period : </span>" + "<span class='text'>" + element.orbital_period + "</span>";
    // Diameter
    let diameter = generateP();
    diameter.innerHTML = "<span class='planet-color'>Diameter : </span>" + "<span class='text'>" + element.diameter + "</span>";
    // Climate
    let climate = generateP();
    climate.innerHTML = "<span class='planet-color'>Climate : </span>" + "<span class='text'>" + element.climate + "</span>";
    // Gravity
    let gravity = generateP();
    gravity.innerHTML = "<span class='planet-color'>Gravity : </span>" + "<span class='text'>" + element.gravity + "</span>";
    // Terrain
    let terrain = generateP();
    terrain.innerHTML = "<span class='planet-color'>Terrain : </span>" + "<span class='text'>" + element.terrain + "</span>";
    // Surface water
    let surfaceWater = generateP();
    surfaceWater.innerHTML = "<span class='planet-color'>Surface water : </span>" + "<span class='text'>" + element.surface_water + "</span>";
    // Population
    let population = generateP();
    population.innerHTML = "<span class='planet-color'>Population : </span>" + "<span class='text'>" + element.population + "</span>";
    // AppendChild
    document.querySelector("section").appendChild(article);
    document.querySelector("article").appendChild(name);
    document.querySelector("article").appendChild(div)
    let divContainsP = document.querySelector("#div-contains-p");
    divContainsP.appendChild(rotationPeriod);
    divContainsP.appendChild(orbitalPeriod);
    divContainsP.appendChild(diameter);
    divContainsP.appendChild(climate);
    divContainsP.appendChild(gravity);
    divContainsP.appendChild(terrain);
    divContainsP.appendChild(surfaceWater);
    divContainsP.appendChild(population);
}

/**
 * Fonction qui génère les cartes des espèces
 * @param {*} dataJSON 
 */
function generateSpeciesCards(dataJSON)
{
    let speciess = [];
    for(i = 0; i<dataJSON.results.length; i++)
    {
        let species = new Species(dataJSON.results[i]);
        speciess.push(species);
    }
    document.querySelector("section").classList.remove("movies");

    speciess.forEach(element => {
        let article = document.createElement("article");
        article.addEventListener("click", (_) => showOneSpecies(element));
        article.classList.add("card");
        article.classList.add("species-card");
        article.innerText = element.name;
        article.innerHTML += "<p class='subtitle'>" + element.classification + "</p>";

        document.querySelector("section").appendChild(article);
    })
    // Suppression des flèches pour qu'elle se regénère bien
    document.querySelectorAll(".button").forEach(child => {
        document.querySelector("section").removeChild(child);
    });
    generateButton("left");
    generateButton("right");
}

/**
 * Fonction qui affiche une espèce quand on clique dessus
 * @param {*} element Élément Species, instance de la classe Species récupérée grâce à l'API
 */
function showOneSpecies(element)
{
    suppressCardsAndArrows();

    let article = document.createElement("article");
    article.classList.add("single-element");
    article.classList.add("species");

    // Title
    let name = document.createElement("p");
    name.classList.add("name");
    name.innerHTML = element.name;
    let div = document.createElement("div");
    div.id = "div-contains-p";
    // Classification
    let classification = generateP();
    classification.innerHTML = "<span class='species-color'>Classification : </span>" + "<span class='text'>" + element.classification + "</span>";
    // Designation
    let designation = generateP();
    designation.innerHTML = "<span class='species-color'>Designation : </span>" + "<span class='text'>" + element.designation + "</span>";
    // Average height
    let averageHeight;
    if(element.average_height != "n/a")
    {
        averageHeight = generateP();
        averageHeight.innerHTML = "<span class='species-color'>Average height : </span>" + "<span class='text'>" + element.average_height + "</span>";    
    }
    // Skin colors
    let skinColors;
    if(element.skin_colors != "n/a")
    {
        skinColors = generateP();
        skinColors.innerHTML = "<span class='species-color'>Skin colors : </span>" + "<span class='text'>" + element.skin_colors + "</span>";
    }
    // Hair colors
    let hairColors;
    if(element.hair_colors != "n/a")
    {
        hairColors = generateP();
        hairColors.innerHTML = "<span class='species-color'>Hair colors : </span>" + "<span class='text'>" + element.hair_colors + "</span>";
    }
    // Eye colors
    let eyeColors;
    if(element.eye_colors != "n/a")
    {
        eyeColors = generateP();
        eyeColors.innerHTML = "<span class='species-color'>Eye colors : </span>" + "<span class='text'>" + element.eye_colors + "</span>";
    }
    // Average lifespan
    let averageLifespan = generateP();
    averageLifespan.innerHTML = "<span class='species-color'>Average lifespan : </span>" + "<span class='text'>" + element.average_lifespan + "</span>";
    // Language
    if(element.language != "n/a")
    {
        let language = generateP();
        language.innerHTML = "<span class='species-color'>Language : </span>" + "<span class='text'>" + element.language + "</span>";
    }
        // AppendChild
    document.querySelector("section").appendChild(article);
    document.querySelector("article").appendChild(name);
    document.querySelector("article").appendChild(div)
    let divContainsP = document.querySelector("#div-contains-p");
    divContainsP.appendChild(classification);
    divContainsP.appendChild(designation);
    if(element.average_height != "n/a")
    {
        divContainsP.appendChild(averageHeight);
    }
    if(element.skin_colors != "n/a")
    {
        divContainsP.appendChild(skinColors);
    }
    if(element.hair_colors != "n/a")
    {
        divContainsP.appendChild(hairColors);
    }
    if(element.eye_colors != "n/a")
    {
        divContainsP.appendChild(eyeColors);
    }
    divContainsP.appendChild(averageLifespan);
    if(element.language != "n/a")
    {
        divContainsP.appendChild(language);
    }
}


/**
 * Fonction qui génère le bouton en fonction du côté (side) donné
 * @param {*} side 
 */
function generateButton(side)
{
    // Pas plus de 2 flèches !
    if(document.querySelectorAll(".button").length == 0 || document.querySelectorAll(".button").length == 1)
    {
        let src;
        if(side == "left")
        {
            src = "left-arrow.png";
        }
        else if(side == "right")
        {
            src = "right-arrow.png";
        }
        let button = document.createElement("article");
        button.style.backgroundImage = "url(images/" + src + ")";
        button.id = side;
        button.side = side;
        button.classList.add("button");
        button.addEventListener("click", displayNewPage);
        document.querySelector("section").appendChild(button);
    }
}