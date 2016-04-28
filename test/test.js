import test from 'blue-tape';
import FlightStatsSource from '../lib/index.js';
import config from './config/config';

// example - make sure configuration is the same
test('proper configuration', t => {
	const activity = new FlightStatsSource();
	t.equal(FlightStatsSource.props.name, require('../package.json').name);
	t.equal(FlightStatsSource.props.version, require('../package.json').version);
	t.end();
});

// test('test date', async t => {
// 	const source = new FlightStatsSource();
// 	try {
// 		await source.getFlightStatusArrivalsByAirport(config);
// 	}catch(err) {
// 		t.comment(err);
// 	}
// })

// test('get flight tracks departures by airport', async t => {
// 	const source = new FlightStatsSource();
// 	try {
// 		const departures = await source.getFlightTracksDeparturesByAirport(config);
// 	} catch(err) {
// 		t.comment(err);
// 	}
// });

test('get flight tracks arrivals by airport', async t => {
	const source = new FlightStatsSource();
	try {
		const departures = await source.getFlightTracksArrivalsByAirport(config);
	} catch(err) {
		t.comment(err);
	}
});

// test('get flight tracks departures by airport', async t => {
// 	const source = new FlightStatsSource();
// 	try {
// 		const departures = await source.getFlightStatusArrivalsByAirport(config);
// 	} catch(err) {
// 		t.comment(err);
// 	}
// });

