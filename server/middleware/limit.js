const rateLimit = require("express-rate-limit");

/**
 * List of known bots User-Agent strings to be detected and blocked.
 * 
 * Requests coming from these bots will be blocked with a 403 status code.
 */
const botsUserAgents = [
  "Prerender", "Googlebot", "Google\\+", "bingbot", "Googlebot-Mobile",
  "seochat", "SemrushBot", "SemrushBot-SA", "Bot", "SEOChat", "Baiduspider",
  "Yahoo", "YahooSeeker", "DoCoMo", "Twitterbot", "TweetmemeBot", "Twikle",
  "Netseer", "Daumoa", "SeznamBot", "Ezooms", "MSNBot", "Exabot", "MJ12bot",
  "sogou\\sspider", "YandexBot", "bitlybot", "ia_archiver", "proximic", "spbot",
  "ChangeDetection", "NaverBot", "MetaJobBot", "magpie-crawler", "Genieo\\sWeb\\sfilter",
  "Qualidator.com\\sBot", "Woko", "Vagabondo", "360Spider", "ExB\\sLanguage\\sCrawler",
  "AddThis.com", "aiHitBot", "Spinn3r", "BingPreview", "GrapeshotCrawler", "CareerBot",
  "ZumBot", "ShopWiki", "bixocrawler", "uMBot", "sistrix", "linkdexbot", "AhrefsBot",
  "archive.org_bot", "SeoCheckBot", "TurnitinBot", "VoilaBot", "SearchmetricsBot", 
  "Butterfly", "Yahoo!", "Plukkie", "yacybot", "trendictionbot", "UASlinkChecker", 
  "Blekkobot", "Wotbox", "YioopBot", "meanpathbot", "TinEye", "LuminateBot", "FyberSpider",
  "Infohelfer", "linkdex.com", "Curious\\sGeorge", "Fetch-Guess", "ichiro", "MojeekBot",
  "SBSearch", "WebThumbnail", "socialbm_bot", "SemrushBot", "Vedma", "alexa\\ssite\\saudit",
  "SEOkicks-Robot", "Browsershots", "BLEXBot", "woriobot", "AMZNKAssocBot", "Speedy", "oBot",
  "HostTracker", "OpenWebSpider", "WBSearchBot", "FacebookExternalHit", "Google-Structured-Data-Testing-Tool",
  "baiduspider", "facebookexternalhit", "twitterbot", "rogerbot", "linkedinbot", "embedly",
  "quora\\slink\\spreview", "showyoubot", "outbrain", "pinterest", "slackbot", "vkShare",
  "W3C_Validator",
];

/**
 * Creates a rate-limiting middleware with custom error handling.
 *
 * The rate limit handler restricts the number of requests based on the provided
 * `windowMs` (time window in milliseconds) and `max` (maximum number of requests).
 * 
 * Additionally, it blocks requests from known bots based on the User-Agent header,
 * returning a 403 status code for such requests.
 * 
 * @param {number} max - The maximum number of requests allowed in the specified time window.
 * @param {number} windowMs - The time window in milliseconds during which the `max` requests are allowed.
 * @param {string} customMessage - A custom error message to be sent if the rate limit is exceeded.
 * @returns {Function} A rate-limiting middleware function for Express.js.
 */
const createRateLimitHandler = (max, windowMs, customMessage) => {
  return rateLimit({
    windowMs,
    max,
    handler: (req, res) => {
      const userAgent = req.get("User-Agent");

      // Block requests from known bots based on User-Agent.
      if (
        userAgent &&
        botsUserAgents.some((bot) => new RegExp(bot, "i").test(userAgent))
      ) {
        return res.status(403).json({
          status: 403,
          message: "Do not allow bot requests", // Message for bot requests
        });
      }

      // Default rate limit exceeded response
      res.status(429).json({
        status: 429,
        message: customMessage, // Custom message for rate limit exceeded
      });
    },
  });
};

/**
 * Returns the rate-limiting middleware based on the HTTP method.
 * 
 * The rate limit configuration varies depending on the type of action:
 * - login: 3 requests in 3 minutes
 * - get: 25 requests in 15 minutes
 * - post: 45 requests in 15 minutes
 * - delete: 10 requests in 10 minutes
 * - put: 45 requests in 15 minutes
 *
 * If the method does not match any of the above, a default rate limit configuration is used.
 *
 * @param {string} method - The HTTP method for which to create a rate limit handler.
 * @returns {Function} The rate-limiting middleware for the specified HTTP method.
 */
exports.limit = (method) => {
  let windowMs, max, message;

  // Define rate limit settings based on the HTTP method
  switch (method) {
    case "login":
      windowMs = 3 * 60 * 1000; // 3 minutos
      max = 3;
      message = "Please wait 3 minutes before trying again.";
      break;
    case "get":
      windowMs = 15 * 60 * 1000; // 15 minutos
      max = 25;
      message = "Rate limit exceeded. Please try again later.";
      break;
    case "post":
      windowMs = 15 * 60 * 1000; // 15 minutos
      max = 45;
      message = "Rate limit exceeded. Please try again later.";
      break;
    case "delete":
      windowMs = 10 * 60 * 1000; // 10 minutos
      max = 10;
      message = "Rate limit exceeded. Please try again later.";
      break;
    case "put":
      windowMs = 15 * 60 * 1000; // 15 minutos
      max = 45;
      message = "Rate limit exceeded. Please try again later.";
      break;
    default:
      windowMs = 15 * 60 * 1000; // 15 minutos
      max = 25;
      message = "Rate limit exceeded. Please try again later.";
      break;
  }

  // Return the rate-limiting handler with the appropriate configuration
  return createRateLimitHandler(max, windowMs, message);
};
