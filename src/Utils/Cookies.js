const cookies = {
  getCookie(key) {
    var value = "; " + document.cookie;
    // reach into the cookie jar    
    var cookie = value.split("; " + key +"=");

    // grab the cookie if it exists
    cookie.length === 2 ? cookie = cookie.pop().split(";").shift() : cookie = null

    return cookie
  },
  setCookie(key, value) {
    document.cookie = key + '=' + value + ";max-age=" + (3600 * 24);
  }
}

export default cookies