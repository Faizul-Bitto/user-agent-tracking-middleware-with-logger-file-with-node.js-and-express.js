const express = require( 'express' );
const app = express();
const path = require( 'path' );
const userRoutes = require( './routes/user' );
const userAgentTrackingRoutes = require( './routes/userAgentTracking' );
const { isValid } = require( './middleware/IsValid' );
const { checkUserAgent } = require( './middleware/CheckUserAgent' );

app.use( express.json() );
app.use( express.static( 'public' ) );

// User agent tracking route (no middleware needed)
app.use( '/api', userAgentTrackingRoutes );
// User routes (with middleware)
app.use( '/api', isValid, checkUserAgent, userRoutes );

const port = process.env.PORT;

app.listen( port, () => {
    console.log( `Server is running on port ${ port }` );
} );