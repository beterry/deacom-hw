# Interview Challenge: Debug and enhance an incomplete landing page

Check out the demo [here](https://beterry.github.io/deacom-challenge/)

As part of an interview process for a Web Developer position, I was given this challenge to test my problem solving and development skills. In this README, I’ll explain my debugging process and my decisions about designing and coding an interactive component.

## Goals

I was presented with these three challenges:

1. Route product data from the XML in the `main.js` file to the product cards in the “Featured” section and style the cards to be consistent with the existing page. 
2. The main navigation is meant to expand on mouse over. Find and fix the bug(s) preventing this interaction.
3. Create an interactive component that promotes at least one product and add it to the commented section of the landing page. The component can be any type you choose but should be your own – no plugins/widgets.

## The existing page

I first downloaded the provided files from an external link and opened `index.html` in my browser. The landing page contained a navigation bar, an empty section for my interactive component, and four featured product cards with some missing information.

## Designing the landing page

After viewing the incomplete landing page and recognizing the data and features I needed to add, I mocked up a design in Adobe XD to work towards. The instructions mentioned the new component and styles should be consistent with the existing design so I took typography and color inspiration from the incomplete page.

This landing page was for a (fictional?) company named Food Labs. I wasn’t presented with any information about the company. I imagined that they sell organic food products. This inspired the design of my interactive component.

I wanted to design a component which was bright, modern, and relevant to Food Labs. I browsed several stock photo sites and eventually discovered three great photographs of smoothies. I thought these colorful smoothies would look great featured as a new product on the Food Labs landing page. 

## Challenge 1

The first challenge was to route data from the XML markup in `main.js` into the incomplete product cards.

I noticed that the title of the product was already being routed to the cards. I navigated to `main.js` and investigated the function which injected this data into the `DOM`. I used the same pattern to also inject the image, description, and price.

```js
loCardList.forEach(function (poThis, index)
{
    //-- This was already being routed to the DOM
    poThis.querySelector(".prodTitle").innerHTML = laProducts[lnCounter].getElementsByTagName("PartName")[0].innerHTML;

    //-- Code I added to insert product image to card
    poThis.querySelector(".prodImage").src = laProducts[lnCounter].getElementsByTagName("Image")[0].innerHTML;

    //-- Code I added to insert product price to card
    poThis.querySelector(".prodPrice").innerHTML = laProducts[lnCounter].getElementsByTagName("Price")[0].innerHTML;

    //-- Code I added to insert product description to card
    poThis.querySelector(".prodDescrip").innerHTML = laProducts[lnCounter].getElementsByTagName("PartDesc")[0].innerHTML;

    lnCounter++;
});
```

I then styled the new data to match my mock up.

```css
.prodDescrip {
    font-size: .875rem;
    color: rgba(0,0,0,.6);
    line-height: 1.5;
}

.prodPrice{
    padding: .5rem;
    background: none;
    font-family: 'Josefin Sans', sans-serif;
    color: #0ea9a9;
    font-size: 1rem;
    text-align: center;
    border: 2px solid #0ea9a9;
    border-radius: .25rem;
}
```

## Challenge 2

My second challenge was to debug the navigation bar. The instructions noted that the navigation was supposed to “expand on mouse over.”

I’ve built many expandable menus in the past and knew that the bug was most likely a mistake with absolute positioning or an incorrect selector in `style.css`.

On further inspection, I confirmed that the absolute positioning was correct; however, I could not find a `:hover` pseudo selector targeting the sub-menu. I added this selector, changing the display property of the sub-menu to `block` when the menu item is hovered. This solution was successful and created to desired functionality.

```css
header .menu .menuOption .subMenu {
	position: absolute;
	display: none;
	left: 0;
	top: 3.2rem;
	z-index: 13000;
	width: 300px;
	background: #fff;
	padding: 12px 8px;
	border: 1px solid #eee;
}

/* Code I added to make the sub menus appear */
header .menu .menuOption:hover .subMenu{
    display: block;
}
```

## Challenge 3

The third challenge was to code a custom component which promoted a product. I designed the component in Adobe XD and started working to add it to the landing page.

I imagined that this component would be interchanged frequently with others as new promotions begin. For this reason, I wanted to create a component that could be installed and uninstalled very easily by adding or deleting only one element from `index.html`.

I created two files: `smoothie-promo.css` and `smoothie-promo.js`. I added this element to the blank section in `index.html`.

```html
<section id="mainCTA">
    <!-- One element installation -->
    <div id="smoothie-promo"></div>
</section>
```

I also imagined that the flavors in the component would change frequently as new flavors are added or discontinued. I wanted to make my component easily editable in the future. To do this, I started by writing a `config` variable in `smoothie-promo.js` to specify all the information unique to each flavor.

My goal: have the ability to simply edit this array to add or remove a flavor in the future.

```js
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
```

I then created a `template` and an `activeFlavor` variable. 

The `template` variable contained the base markup for the component. I created this markup in `smoothie-promo.js` and not in `index.html` because I wanted the component to be installed by adding a single element to the landing page.

The `activeFlavor` variable tracks which flavor is currently selected. By setting this equal to `0`, the first object in the array will be selected when the component initially loads.

```js
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

//starting index in flavor array
let activeFlavor = 0;
```

I then began to write the function which would be called on page load: `initComponent()`. This function injected the template and flavor buttons into the DOM. It added classes and event listeners to each flavor button.

After all the necessary elements were added to the DOM, the function calls `renderComponent()`.

```js
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
```

The `renderComponent()` function changes the styles and image of the component based on `activeColor`. This function is called after `initComponent()` and also after the user selects a different flavor.

```js
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
```

The final function I needed to write was `changeActiveFlavor(index)`. This function is called by the event listener on each flavor button. The function simply sets `activeFlavor` to the index of whichever flavor was selected and then re-renders the component.

If the currently active flavor is selected, the component is not re-rendered.

```js
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
```

## Conclusion

In the end, I was able to successfully accomplish each challenge.

I enjoyed the variation of the challenge topics. I had to troubleshoot CSS, route data from an API into the DOM, and also create a component from scratch. Being able to complete all these challenges reaffirms that I have the potential to be a successful web developer.

The final component is easy to install and simple to edit. I strived to design and code a bright modern, and relevant component and I think the result accomplishes those goals.
