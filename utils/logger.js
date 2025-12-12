const fs = require( 'fs' );
const path = require( 'path' );

const userAgentFile = path.join( __dirname, '../userAgentTracking/userAgent.json' );
const blockedUserAgentFile = path.join( __dirname, '../userAgentTracking/blockedUserAgent.json' );

exports.saveUserAgentWithCount = ( agentString ) => {
    let data = {};

    if ( fs.existsSync( userAgentFile ) ) {
        const raw = fs.readFileSync( userAgentFile );
        const parsed = JSON.parse( raw );

        // Convert old array format to new object format
        if ( Array.isArray( parsed ) ) {
            parsed.forEach( ( agent ) => {
                data[ agent ] = ( data[ agent ] || 0 ) + 1;
            } );
        } else {
            data = parsed;
        }
    }

    data[ agentString ] = ( data[ agentString ] || 0 ) + 1;

    fs.writeFileSync( userAgentFile, JSON.stringify( data, null, 2 ) );
}

exports.saveBlockedUserAgentWithCount = ( agentString ) => {
    let data = {};

    if ( fs.existsSync( blockedUserAgentFile ) ) {
        const raw = fs.readFileSync( blockedUserAgentFile );
        const parsed = JSON.parse( raw );

        // Convert old array format to new object format
        if ( Array.isArray( parsed ) ) {
            parsed.forEach( ( agent ) => {
                data[ agent ] = ( data[ agent ] || 0 ) + 1;
            } );
        } else {
            data = parsed;
        }
    }

    data[ agentString ] = ( data[ agentString ] || 0 ) + 1;

    fs.writeFileSync( blockedUserAgentFile, JSON.stringify( data, null, 2 ) );
}