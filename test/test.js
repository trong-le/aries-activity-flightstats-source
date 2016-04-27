import test from 'blue-tape';
import FlightStatsSource from '../lib/index.js';

const config = {
	appId: '',
	appKey: '',
	day: ''
};

// example - make sure configuration is the same
test('proper configuration', t => {
	const activity = new FlightStatsSource();
	t.equal(FlightStatsSource.props.name, require('../package.json').name);
	t.equal(FlightStatsSource.props.version, require('../package.json').version);
	t.end();
});

// Test with CVG data 
test('test get flight status', async t => {
	const source = new FlightStatsSource();
	try {
		await source.getFlightStatus(config)
	} catch(err) {
		t.comment(err);
	}
});