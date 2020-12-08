/* INSTRUCTIONS TO USE COMPONENT

1. Insert element into markup: <div id="smoothie-promo"></div>
2. Link CSS file in head: <link rel="stylesheet" href="css/smoothie-promo.css" />
3. Link JS file before end of <body>: <script type="text/javascript" src="js/smoothie-promo.js"></script>

Only insert this component into a container with 100% window width.
Images should be 500x450 @ 72ppi
*/

//add or remove object to edit the displayed flavors
const smoothieFlavors = [
    {
        name: "Citrus Rush",
        circleColor: "#F88A12",
        image: 'img/yellow.png',
        background: "#FFF1B1",
    },
    {
        name: "Summer Blast",
        circleColor: "#E22F13",
        image: 'img/red.png',
        background: "#FFC5BC",
    },
    {
        name: "Island Breeze",
        circleColor: "#85C400",
        image: 'img/green.png',
        background: "#DBFF8E",
    },
]

//injected into the DOM by initComponent()
const template = `
    <div class="smoothie-promo__inner">
        <div class="smoothie-promo__left">
            <h4>New!</h4>
            <h3>Fruit Smoothies</h3>
            <div id="smoothie-promo__flavors">
                <p id="flavor-txt"></p>
            </div>
        </div>
        <div class="smoothie-promo__right">
            <img id="smoothie-image" src="" alt="smoothie" />
        </div>
    </div>
`

//starting index in config array
let activeFlavor = 0;

function initComponent()
{
    //inject compnoent template into DOM
    let component = document.querySelector("#smoothie-promo");
    component.innerHTML = template;

    let flavorContainer = document.querySelector("#smoothie-promo__flavors");

    //loop through flavor array
    //creates a flavor circle for each flavor defined
    smoothieFlavors.forEach((flavor, index) => {

        let flavorText = document.querySelector("#flavor-txt");
        let newFlavor = document.createElement("button");
        let flavorColor = document.createElement("div");

        newFlavor.classList.add("smoothie-flavor");
        newFlavor.addEventListener("click", () => changeActiveFlavor(index));

        flavorColor.classList.add("flavor-color");
        flavorColor.style.background = flavor.circleColor;

        //insert into DOM
        newFlavor.appendChild(flavorColor);
        flavorContainer.insertBefore(newFlavor, flavorText);
    })

    renderComponent();
}

//renders variable elements after init and on flavor change
function renderComponent()
{
    //change flavor image
    let smoothieImage = document.querySelector("#smoothie-image");
    smoothieImage.src = smoothieFlavors[activeFlavor].image;

    //change flavor text
    let flavorText = document.querySelector("#flavor-txt");
    flavorText.innerHTML = smoothieFlavors[activeFlavor].name;
    flavorText.style.color = smoothieFlavors[activeFlavor].circleColor;

    //change background color
    let component = document.querySelector("#smoothie-promo");
    component.style.background = smoothieFlavors[activeFlavor].background;

    //add active class to the selected flavor
    let flavors = document.querySelectorAll(".smoothie-flavor");
    flavors.forEach((flavor, index) => {
        flavor.classList.remove("active");
        if (index === activeFlavor){
            flavor.classList.add("active");
        }
    })
}

//Called by event listener on each flavor color
function changeActiveFlavor(index)
{
    if (index === activeFlavor){
        return
    } else {
        activeFlavor = index;
        renderComponent();
    }
}

(function (window)
{
    initComponent();
}(window));