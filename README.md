Scrooge JS
==========

A Javascript tool for adding referral information to correspondent links. Supports any affiliate that just needs a parameter added to the link (Eg. http://somesite.com/product-1234/?ref={YOUR-REFERRAL-ID}). It also supports affiliate links through Commission Junction, it detects supported sites and replaces the link 'href' tag with the corresponding URL.

Index
-----

1. [Usage](#usage)

2. [Api](#api)

3. [Demo](#demo)

<h2 id="usage">Usage</h2>

1. Include Scrooge.js in your `head`:

        <script src="js/scrooge.js"></script>

2. Configure Scrooge inside a `<script>` tag after including it:

        <script>
            Scrooge.setAffiliateId('amazon', '{YOUR-AFFILIATE-ID}')
                .addSite('somesite', 'ref', '{YOUR-AFFILIATE-ID}')
                .addCjSite('zappos', 'zappos.com', '{YOUR-AFFILIATE-ID}', '{MERCHANT-ID}');
        </script>

3. You're done.

<h2 id="api">API</h2>

### Scrooge.start()

Runs Scrooge and replaces every detected affiliate URL. You don't have to manually call it this method is run when the page is loaded. You can manually trigger the replacement after a DOM manipulation to detect and replace the new links.

### Scrooge.setContext(context)

By default Scrooge searches for affiliate URLs in the whole document but if you want to limit the URL replacement to just the links inside an element you can use this method.

#### Parameters

 * `context` - __String__ or __DOM element__.

#### Example usage

    // Setting the context to a particular element with the id 'article'.
    Scrooge.setContext('#article');

    // Setting the context to a particular DOM element.
    Scrooge.setContext(window.article);

### Scrooge.addSite(key, domain, parameter\_name, affiliate\_id)

Adds an affiliate site for url detection and replacement.

#### Parameters

 * `key` - __String__, a key or id used internally by Scrooge to identify each affiliate.
 * `domain` - __String__, the domain that will be searched in links to add the affiliate information.
 * `parameter_name` - __String__, the name of the parameter that will be added to the url.
 * `affiliate_id` - __String__, your affiliate id.

#### Example usage

    // Adding iTunes as an affiliate
    Scrooge.addSite('itunes', 'itunes.apple.com', 'affId', '{YOUR-AFFILIATE-ID}');

### Scrooge.addCjSite(key, domain, affiliate\_id, merchant\_id)

Adds an affiliate site that works throught the Commision Junction referral system.

#### Parameters

 * `key` - __String__, a key or id used internally by Scrooge to identify each affiliate.
 * `domain` - __String__, the domain that will be searched in links to add the affiliate information.
 * `affiliate_id` - __String__, your CJ affiliate id (PID).
 * `merchant_id` - __String__, the merchant link id (AID).

### Scrooge.removeSite(key)

Removes an affiliate site by its key.

#### Parameters

* `key` - __String__, the key for the site that will be removed.

### Scrooge.removeCjSite(key)

Removes an affiliate site from Commission Junction by its key.

#### Parameters

* `key` - __String__, the key for the site that will be removed.

### Tips and Tricks

* Every method returns an instance to the Scrooge object so every method is chainable:

        Scrooge.addSite().addCjSite().setAffiliateId();

* For Commission Junction you'll need the following information:
    * PID (Affiliate ID): In the cj.com admin area: Account > Web Site Settings > PID
    * AID (Advertiser ID): The Advertiser/Merchant ID can be found by opening the Get Links of any active advertiser.

<h2 id="demo">Demo</h2>

### Javascript Code

    <script src="scrooge.js"></script>
    <script>
    // Setting the context to search only inside an element with a 'detect' id
    Scrooge.setContext('#detect')
        // Adding support for amazon.com links
    	.addSite('amazon', 'amazon.com', 'tag', 'httpmariec-20')
    	// Adding support for iTunes links
    	.addSite('itunes', 'itunes.apple.com', 'affId', 'TEST')
    	// Adding support for newegg.com through Commmission Junction
    	.addCjSite('newegg', 'newegg.com', '4858864', '10440897')
    	// Adding support for a fictitous site
    	.addSite('somesite', 'somesite.com', 'referral', 'YOUR-REFERRAL-ID');
    </script>

### HTML Code

    <ul id="detect">
        <li><a href="https://www.amazon.com/Western-Digital-Scorpio-Notebook-WD3200BEKT/dp/B001CO3EKQ/ref=sr_1_2?ie=UTF8&qid=1299021901&sr=8-2">Scorpio Black (Amazon)</a></li>
    	<li><a href="http://www.newegg.com/Product/Product.aspx?Item=N82E16822136831&cm_re=wd_tv_live-_-22-136-831-_-Product">WD TV Live Hub Media Center (Newegg)</a></li>
    	<li><a href="http://www.somesite.com/product/1234/">Dummy Site</a></li>
    	<li><a href="http://itunes.apple.com/us/app/isaac-newtons-gravity/id345439503?mt=8">Isaac Newton's Gravity [iTunes]</a></li>
    </ul>
