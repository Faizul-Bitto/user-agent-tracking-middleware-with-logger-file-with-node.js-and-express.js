const { saveUserAgentWithCount, saveBlockedUserAgentWithCount } = require( "../utils/logger" );

exports.checkUserAgent = ( req, res, next ) => {
    const userAgent = req.headers[ 'user-agent' ];

    const blockedPatterns = [
        /curl/i,
        /wget/i,
        /python-requests/i,
        /Go-http-client/i,
        /Java/i,
        /sqlmap/i,
        /nmap/i,
        /Nikto/i,
        /HeadlessChrome/i,
        /PhantomJS/i
    ];

    const isBlocked = blockedPatterns.some( ( pattern ) => pattern.test( userAgent ) );

    console.log( `The agent is ${ userAgent }` );

    // Save non-blocked user agent to userAgent.json
    saveUserAgentWithCount( userAgent );

    if ( !userAgent || isBlocked ) {
        // Save blocked user agent to blockedUserAgent.json
        saveBlockedUserAgentWithCount( userAgent || 'Missing User-Agent' );

        return res.status( 403 ).json( {
            message: "Forbidden: Suspicious User-Agent"
        } );
    }

    next();
}