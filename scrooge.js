// Scrooge JS
// Automatically adds referral information to affiliate links
//
// Copyright 2011 - Mario Estrada http://mario.ec/
//
// Commercial License
//
// This software is not freeware and you may not distribute it
// nor use it if you don't own a license for it. If you don't own
// a license you may contact the author at me@mario.ec asking
// for information on how to buy one.

;(function()
{
	function domReady(fn) {
		/in/.test(document.readyState) ? setTimeout(function() { domReady(fn); }, 50) : fn()
	}

	var Scrooge = function()
	{
		this.start()
	}

	Scrooge.context = document
	Scrooge.sites = {
		'amazon': { 'url': 'amazon.com', 'param': 'tag', 'affiliate_id': '0000' },
		'itunes': { 'url': 'itunes.apple.com', 'param': 'affId', 'affiliate_id': '0000' }
	}
	Scrooge.cj = {
		'url': 'http://www.jdoqocy.com/click-',
		'sites': {
			'newegg': { 'url': 'newegg.com', 'affiliate_id': '4858864', 'merchant_id': '10440897'}
		}
	}

	Scrooge.start = function()
	{
		var element = typeof this.context === 'string' && this.context[0] === '#' ? 
			document.getElementById(this.context.substr(1)) :
			this.context
	
		if(!element)
			throw "Scrooge.js: The context you've set for Scrooge is not valid."
	
		var links = element.getElementsByTagName('a')
	
		for(i = 0; i < links.length; i++)
		{
			var href = links[i].href
			var regex, new_href
			var done = false
			for(var site in this.sites)
			{
				var s = this.sites[site]
				regex = new RegExp("http(s)?:\/\/(www\.)?" + s.url + "/", "i")
				if(regex.test(href))
				{
					new_href = this._addAffiliateInfo(href, s.param, s.affiliate_id)
					done = href !== new_href
					links[i].href = new_href
					break
				}
			}
			if(!done)
			{
				for(var site in this.cj.sites)
				{
					var s = this.cj.sites[site]
					regex = new RegExp("http(s)?:\/\/(www\.)?" + s.url + "/", "i")
					if(regex.test(href))
					{
						new_href = this._addCjAffiliateInfo(href, s.affiliate_id, s.merchant_id)
						done = href !== new_href
						links[i].href = new_href
						break
					}
				}
			}
		}
	
		return this
	}

	Scrooge.setContext = function(context)
	{
		this.context = context
	
		return this
	}

	Scrooge._addAffiliateInfo = function(href, param, affiliate_id)
	{
		var arr = href.split('?')
		href = arr[1] ? arr.join('?') + '&' + param + '=' + affiliate_id : 
			arr[0] + '?' + param + '=' + affiliate_id
	
		return href
	}

	Scrooge._addCjAffiliateInfo = function(href, affiliate_id, merchant_id)
	{
		href = this.cj.url + affiliate_id + '-' + merchant_id + '?sid=scrooge-js&url=' + encodeURIComponent(href)
	
		return href
	}

	Scrooge.setAffiliateId = function(key, affiliate_id)
	{
		this.sites[key].affiliate_id = affiliate_id
	
		return this
	}

	Scrooge.addSite = function(key, url, param, affiliate_id)
	{
		this.sites[key] = {
			'url': url,
			'param': param,
			'affiliate_id': affiliate_id
		}
		return this
	}

	Scrooge.addCjSite = function(key, url, affiliate_id, merchant_id)
	{
		this.cj.sites[key] = {
			'url': url,
			'affiliate_id': affiliate_id,
			'merchant_id': merchant_id
		}
		return this
	}

	Scrooge.removeSite = function(key)
	{
		delete this.sites[key]
		return this
	}

	Scrooge.removeCjSite = function(key)
	{
		delete this.cj.sites[key]
		return this
	}

	window.Scrooge = Scrooge

	domReady(function()
	{
		Scrooge.start()
	})
})();