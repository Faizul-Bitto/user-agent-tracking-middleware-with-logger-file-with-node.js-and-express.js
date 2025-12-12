const fs = require( 'fs' );
const path = require( 'path' );

const userAgentFile = path.join( __dirname, '../userAgentTracking/userAgent.json' );
const blockedUserAgentFile = path.join( __dirname, '../userAgentTracking/blockedUserAgent.json' );

exports.getUserAgentTrackingData = ( req, res ) => {
    let userAgents = {};
    let blockedAgents = {};

    // Read user agents
    if ( fs.existsSync( userAgentFile ) ) {
        const raw = fs.readFileSync( userAgentFile );
        const parsed = JSON.parse( raw );
        userAgents = Array.isArray( parsed ) ? {} : parsed;
    }

    // Read blocked user agents
    if ( fs.existsSync( blockedUserAgentFile ) ) {
        const raw = fs.readFileSync( blockedUserAgentFile );
        const parsed = JSON.parse( raw );
        blockedAgents = Array.isArray( parsed ) ? {} : parsed;
    }

    // Combine all unique user agents
    const allAgents = new Set( [
        ...Object.keys( userAgents ),
        ...Object.keys( blockedAgents )
    ] );

    // Create user agent tracking data
    const userAgentTrackingData = Array.from( allAgents ).map( ( agent ) => {
        const count = userAgents[ agent ] || 0;
        const blockedCount = blockedAgents[ agent ] || 0;
        return {
            userAgent: agent,
            blocked: blockedCount > 0 ? 'Yes' : 'No',
            count: count,
            blockedCount: blockedCount
        };
    } );

    res.json( userAgentTrackingData );
};

