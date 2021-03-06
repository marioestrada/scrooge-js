/* @license
 * The MIT License (MIT)
 *
 *  Copyright (c) 2015 Mario Estrada (http://mario.ec)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

/* Scrooge JS
 * Automatically adds referral information to affiliate links
 */

/* jshint asi: true */

;(function() {
  function domReady(fn) {
    /in/.test(document.readyState) ? setTimeout(function() { domReady(fn); }, 50) : fn()
  }

  var Scrooge = function() {
    this.start()
  }

  Scrooge.context = document
  Scrooge.sites = {
    'amazon': { 'url': 'amazon.*', 'param': 'tag', 'affiliate_id': 'httpmariec-20' },
    'itunes': { 'url': 'itunes.apple.com', 'param': 'affId', 'affiliate_id': '0000' }
  }
  Scrooge.cj = {
    'url': 'http://www.jdoqocy.com/click-',
    'sites': {
      'newegg': { 'url': 'newegg.com', 'affiliate_id': '4858864', 'merchant_id': '10440897'}
    }
  }

  var getRegExp = function (url) {
    url = url.replace('*', '[a-z][a-z0-9\.]+');
    var regex = new RegExp("http(s)?:\/\/(www\.)?" + url + "/", "i");
    return regex;
  }

  Scrooge.start = function() {
    var element = typeof this.context === 'string' && this.context[0] === '#' ?
      document.getElementById(this.context.substr(1)) : this.context

    if(!element) {
      throw "Scrooge.js: The context you've set for Scrooge is not valid."
    }

    var links = element.getElementsByTagName('a')
    var site;
    var regex;
    var new_href;
    var s;
    var done;
    var href;

    for(var i = 0; i < links.length; i++) {
      href = links[i].href
      done = false
      for(site in this.sites) {
        s = this.sites[site]
        regex = getRegExp(s.url)
        if(regex.test(href)) {
          new_href = this._addAffiliateInfo(href, s.param, s.affiliate_id)
          done = href !== new_href
          links[i].href = new_href
          break
        }
      }
      if(!done) {
        for(site in this.cj.sites) {
          s = this.cj.sites[site]
          regex = getRegExp(s.url)
          if(regex.test(href)) {
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

  Scrooge.setContext = function(context) {
    this.context = context

    return this
  }

  Scrooge._addAffiliateInfo = function(href, param, affiliate_id) {
    var arr = href.split('?')
    href = arr[1] ? arr.join('?') + '&' + param + '=' + affiliate_id :
      arr[0] + '?' + param + '=' + affiliate_id

    return href
  }

  Scrooge._addCjAffiliateInfo = function(href, affiliate_id, merchant_id) {
    href = this.cj.url + affiliate_id + '-' + merchant_id + '?sid=scrooge-js&url=' +
      encodeURIComponent(href)

    return href
  }

  Scrooge.setAffiliateId = function(key, affiliate_id) {
    this.sites[key].affiliate_id = affiliate_id

    return this
  }

  Scrooge.addSite = function(key, url, param, affiliate_id) {
    this.sites[key] = {
      'url': url,
      'param': param,
      'affiliate_id': affiliate_id
    }
    return this
  }

  Scrooge.addCjSite = function(key, url, affiliate_id, merchant_id) {
    this.cj.sites[key] = {
      'url': url,
      'affiliate_id': affiliate_id,
      'merchant_id': merchant_id
    }
    return this
  }

  Scrooge.removeSite = function(key) {
    delete this.sites[key]
    return this
  }

  Scrooge.removeCjSite = function(key) {
    delete this.cj.sites[key]
    return this
  }

  window.Scrooge = Scrooge

  domReady(function() {
    Scrooge.start()
  })
})();
