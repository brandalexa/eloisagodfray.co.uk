/**
 * ONLY SET ACTIVATED TO TRUE WHEN IN USE ON THE BETA VERSION OF THE WEBSITE.
 */

const ACTIVATED = true;
const RELEASE_CANDIDATE = false;
const IS_ALPHA = true;
const WEBSITE_VERSION = "3.0";
const BETA_RELEASE_NUMBER = 1;

if (ACTIVATED) {
    document.querySelector("body").insertAdjacentHTML("beforeend", `<a href="https://github.com/brandalexa/eloisagodfray.co.uk/releases" target="_blank" id="version" style="text-align: left;">Version: ${IS_ALPHA ? "Alpha" : "Beta"} ${WEBSITE_VERSION}${RELEASE_CANDIDATE ? ", Release Candidate Build #" + BETA_RELEASE_NUMBER : ", Build #" + BETA_RELEASE_NUMBER}<br>Pre-release, <u>do not distribute.</u></a>`);
}