/* Define all user events for page elements */
function initListeners()
{
    //-- User events for main menu links
	let loTopNavLinks = document.querySelectorAll("header .menuOption");
	Array.prototype.forEach.call(loTopNavLinks, function (poLink)
	{
		if (poLink.querySelector(".submenu"))
		{
			poLink.addEventListener("mouseover", function ()
			{
				poLink.querySelector(".submenu").style.display = "block";
			});
			poLink.addEventListener("mouseout", function ()
			{
				poLink.querySelector(".submenu").style.display = "none";
			});
		}
    });

    //-- User events for product cards
    let loProductCards = document.querySelectorAll(".card");
    Array.prototype.forEach.call(loProductCards, function (poCard)
    {
        poCard.addEventListener("mouseover", function (poEvent)
        {
            poEvent.currentTarget.style.boxShadow = "4px 4px 5px 1px rgba(0, 0, 0, .15)";
            poEvent.currentTarget.querySelector(".prodTitle").style.color = "#fecc4e";
        });
        poCard.addEventListener("mouseout", function (poEvent)
        {
            poEvent.currentTarget.style.boxShadow = "12px 12px 12px 1px rgba(0, 0, 0, .1)";
            poEvent.currentTarget.querySelector(".prodTitle").style.color = "#0ea9a9";
       });
    });
}

/* Populates the product cards in the "Featured" section with relevant product data.  Add code to the commented areas below for product image, price & description. */
function loadFeatured()
{
    let loProductData = getProductData();
    let laProducts = loProductData.getElementsByTagName("Product");
	
    let loCardList = document.getElementById("featured").querySelectorAll(".card"); //--select and store all DOM .card elements
    let lnCounter = 0;

    //-- loop through .card elements in #featured section
    loCardList.forEach(function (poThis, index)
    {
        //-- Insert product name to card
        poThis.querySelector(".prodTitle").innerHTML = laProducts[lnCounter].getElementsByTagName("PartName")[0].innerHTML;

        //-- Insert product image to card
        poThis.querySelector(".prodImage").src = laProducts[lnCounter].getElementsByTagName("Image")[0].innerHTML;

        //-- Insert product price to card
        poThis.querySelector(".prodPrice").innerHTML = laProducts[lnCounter].getElementsByTagName("Price")[0].innerHTML;

        //-- Insert product description to card
        poThis.querySelector(".prodDescrip").innerHTML = laProducts[lnCounter].getElementsByTagName("PartDesc")[0].innerHTML;

        lnCounter++;
	});
}

// changes background color, image, and flavor based on param
function changeFlavor(color)
{
    console.log(color);
}

/* Returns XML from an inline text definition.  Use this data for product output */
function getProductData()
{
    let productData =
        "<ProductList>" +
            "<TotalProducts>9</TotalProducts>" +
            "<Product>" +
                "<CategoryCode>7</CategoryCode>" +
                "<Category>vegetables</Category>" +
                "<SubCategoryCode>47</SubCategoryCode>" +
                "<SubCategory>Onion/Garlic</SubCategory>" +
                "<PartCode>3618</PartCode>" +
                "<PartName>Garlic</PartName>" +
                "<PartDesc>Garlic is widely used around the world for its pungent flavor as a seasoning.</PartDesc>" +
                "<Price>$10.95/bag</Price>" +
                "<Image>img/garlic-01.jpg</Image>" +
            "</Product>" +
            "<Product>" +
                "<CategoryCode>9</CategoryCode>" +
                "<Category>beans/seeds</Category>" +
                "<SubCategoryCode>50</SubCategoryCode>" +
                "<SubCategory>Beans</SubCategory>" +
                "<PartCode>8179</PartCode>" +
                "<PartName>coffee beans</PartName>" +
                "<PartDesc>Intense aroma. Good for traditional brewing or in recipes as a ground spice.</PartDesc>" +
                "<Price>$12.95/bag</Price>" +
                "<Image>img/coffee-01.jpg</Image>" +
            "</Product>" +
            "<Product>" +
                "<CategoryCode>7</CategoryCode>" +
                "<Category>vegetables</Category>" +
                "<SubCategoryCode>52</SubCategoryCode>" +
                "<SubCategory>Peppers</SubCategory>" +
                "<PartCode>8220</PartCode>" +
                "<PartName>Chili peppers</PartName>" +
                "<PartDesc>When used fresh, they are most often prepared and eaten like a vegetable.</PartDesc>" +
                "<Price>$10.00/doz</Price>" +
                "<Image>img/hotpepper-01.jpg</Image>" +
            "</Product>" +
            "<Product>" +
                "<CategoryCode>7</CategoryCode>" +
                "<Category>vegetables</Category>" +
                "<SubCategoryCode>49</SubCategoryCode>" +
                "<SubCategory>Squash</SubCategory>" +
                "<PartCode>8223</PartCode>" +
                "<PartName>Pumpkin Mix</PartName>" +
                "<PartDesc>Most parts of the pumpkin are edible, including the shell, seeds and leaves.</PartDesc>" +
                "<Price>$20.95/nine</Price>" +
                "<Image>img/pumpkin-01.jpg</Image>" +
            "</Product>" +
        "</ProductList>";

    let parser = new DOMParser();
    let xmlData = parser.parseFromString(productData, "text/xml");
    return xmlData;
}

(function (window)
{
	initListeners();
	loadFeatured();
}(window));
