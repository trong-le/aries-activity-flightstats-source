import test from 'blue-tape';
import FlightStatsSource from '../lib/index.js';

const config = {
	schema : "abq",
	table : "arrivals",
	drop : true,
	airport: 'ABQ',
	requestedFields : [
		'scheduledTime',
		'scheduledDate',
		'flight',
		'actualTime',
		'actualGateTime',
		'statusCode',
		'remarks',
		'codesharesAsNames',
		'airlineName',
		'flightId'
	],
	timeWindowBegin : 720,
	timeWindowEnd : 720,
	lateMinutes : 15,
	useRunwayTimes : false,
	excludeCargoFlights : false,
	utc : false,
	appId : '123',
	appKey : 'abc'
};

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

// test('get flight tracks arrivals by airport', async t => {
// 	const source = new FlightStatsSource();
// 	try {
// 		const departures = await source.getFlightTracksArrivalsByAirport(config);
// 	} catch(err) {
// 		t.comment(err);
// 	}
// });

test('get taxi data', async t => {
	const source = new FlightStatsSource();
	try {
		const taxi = await source.getTaxiData(config);
		t.comment(JSON.stringify(taxi));
	} catch(err) {
		t.comment(err);
	}
});

test('get fids arrivals', async t => {
	const source = new FlightStatsSource();
	try {
		const fidsArr = await source.fidsArrival(config);
		t.comment(JSON.stringify(fidsArr));
	} catch(err) {
		t.comment(err);
	}
});

test('get flight tracks departures by airport', async t => {
	const source = new FlightStatsSource();
	try {
		const departures = await source.getActiveAirlines(config);
		t.comment(JSON.stringify(departures));
	} catch(err) {
		t.comment(err);
	}
});

