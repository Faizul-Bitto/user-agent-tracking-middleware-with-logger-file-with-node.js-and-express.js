const express = require( 'express' );
const router = express.Router();
const userAgentTrackingController = require( '../controller/UserAgentTrackingController' );

router.get( '/user-agent-tracking', userAgentTrackingController.getUserAgentTrackingData );

module.exports = router;

