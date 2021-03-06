import test from 'blue-tape';
import FlightStatsSource from '../lib/index.js';
import { config, response, taxiData } from './test.config';

test('proper configuration', t => {
	const activity = new FlightStatsSource();
	t.equal(FlightStatsSource.props.name, require('../package.json').name);
	t.equal(FlightStatsSource.props.version, require('../package.json').version);
	t.end();
});

test('test arrivals flight status by airport', async t => {
	const source = new FlightStatsSource();
	const arrivals = await source.getFlightStatusArrivalsByAirport(config);
});

test('get flight tracks departures by airport', async t => {
	const source = new FlightStatsSource();
	const departures = await source.getFlightTracksDeparturesByAirport(config);
});

test('get flight tracks arrivals by airport', async t => {
	const source = new FlightStatsSource();
	const arrivalsTracks = await source.getFlightTracksArrivalsByAirport(config);
});

test('get taxi data', async t => {
	const source = new FlightStatsSource();
	const taxi = await source.getTaxiData(config);
});

test('get unique taxi data', t => {
	const source = new FlightStatsSource();
	const uniqueTaxi = source.getUniqueTaxiData(response);

	// uniqueTaxiData appends most current timestamp when ran.
	for (let i = 0; i < uniqueTaxi.length; i++) {
		delete uniqueTaxi[`${i}`].timestamp;
	}
	t.deepEqual(uniqueTaxi, taxiData);
	t.end();
});

test('get fids arrivals', async t => {
	const source = new FlightStatsSource();
	const fidsArr = await source.fidsArrival(config);
});

test('get flight tracks departures by airport', async t => {
	const source = new FlightStatsSource();
	const departures = await source.getActiveAirlines(config);
});

