import { singleS3FileOutput, Activity } from 'aries-data';
import request from 'request-promise';

const baseURI = 'https://api.flightstats.com/flex/';

export default class FlightStatsSource extends Activity {
	static props = {
		name: require('../package.json').name, // Activity name used with SWF
		version: require('../package.json').version // Activity version used with SWF
	};

	@singleS3FileOutput()
	async onTask(activityTask, config) {
		// const queryResponse = await this.request(config);
		const data = await getFlightStatus();

		// Array of departures/arrival information
		const departures = await getFlightTracksDeparturesByAirport(config);
		const departuresData = departures.flightTracks;

		const arrivals = await getFlightTracksArrivalsByAirport(config);
		const arrivalsData = arrivalsData.flightTracks

		// Get flight taxi data for flights arriving in CVG
		const taxi = getFlightStatusArrivalsByAirport(config);
		const taxiData = taxi.flightStatuses;
		
		return data;
	}

	// MARK: Airlines API
	async getAllAirlines(config) {
		const uri = `${baseURI}airlines/rest/v1/json/all?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getActiveAirlines(config) {
		const uri = `${baseURI}airlines/rest/v1/json/active?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getActiveAirlinesForDate(config) {
		const uri = `${baseURI}airlines/rest/v1/json/active/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirlineByFlightStatsCode(config) {
		const uri = `${baseURI}airlines/rest/v1/json/fs/${config.flightStatsCode}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirlinesByIATACode(config) {
		const uri = `${baseURI}airlines/rest/v1/json/iata/${config.iata}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirlinesByIATACodeOnDate(config) {
		const uri = `${baseURI}airlines/rest/v1/json/iata/${config.iata}/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirlinesByICAOCode(config) {
		const uri = `${baseURI}airlines/rest/v1/json/icao/${config.icao}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirlinesByICAOCodeOnDate(config) {
		const uri = `${baseURI}airlines/rest/v1/json/icao/${config.icao}/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};


	// MARK: Airports API
	async getAllAirports(config) {
		const uri = `${baseURI}airports/rest/v1/json/all?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getActiveAirports(config) {
		const uri = `${baseURI}airports/rest/v1/json/active?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getActiveAirportsForDate(config) {
		const uri = `${baseURI}airports/rest/v1/json/active/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getCurrentAirportByCode(config) {
		const uri = `${baseURI}airports/rest/v1/json/${config.airportCode}/today?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getCurrentAirportByCodeOnDate(config) {
		const uri = `${baseURI}airports/rest/v1/json/${config.airportCode}/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirportByCityCode(config) {
		const uri = `${baseURI}airports/rest/v1/json/cityCode/${config.cityCode}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirportByCountryCode(config) {
		const uri = `${baseURI}airports/rest/v1/json/countryCode/${config.countryCode}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirportByFlightStatsCode(config) {
		const uri = `${baseURI}airports/rest/v1/json/fs/${config.flightStatsCode}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirportByIATACode(config) {
		const uri = `${baseURI}airports/rest/v1/json/iata/${config.iata}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirportsByIATACodeOnDate(config) {
		const uri = `${baseURI}airports/rest/v1/json/iata/${config.iata}/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirportsByICAOCode(config) {
		const uri = `${baseURI}airports/rest/v1/json/icao/${config.icao}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirportsByICAOCodeOnDate(config) {
		const uri = `${baseURI}airports/rest/v1/json/icao/${config.icao}/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	async getAirportsWithinRadius(config) {
		const uri = `${baseURI}airports/rest/v1/json/withinRadius/${config.longitude}/${config.latitude}/${config.radiusMiles}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};

	// MARK: Alerts API

	async getAirportsWithinRadius(config) {
		const uri = `${baseURI}airports/rest/v1/json/withinRadius/${config.longitude}/${config.latitude}/${config.radiusMiles}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	};	


	// MARK: Flight Status & Track

	// Track by airport
	async getFlightStatusDeparturesByAirport(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/status/${config.airport}/dep/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&utc=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	// Get taxi times
	async getFlightStatusArrivalsByAirport(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/status/${config.airport}/arr/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&utc=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightTracksArrivalsByAirport(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/tracks/${config.airport}/arr?appId=${config.appId}&appKey=${config.appKey}&includeFlightPlan=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightTracksDeparturesByAirport(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/tracks/${config.airport}/dep?appId=${config.appId}&appKey=${config.appKey}&includeFlightPlan=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightTracksArrivalsByAirportWithDate(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/tracks/${config.airport}/arr/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&includeFlightPlan=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightTracksDeparturesByAirportWithDate(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/tracks/${config.airport}/dep/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&includeFlightPlan=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	// Track by flight
	async getFlightStatusByFlightID(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/flight/status/${config.flightID}?appId=${config.appId}&appKey=${config.appKey}`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightStatusDeparturesByFlight(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/flight/status/${config.flightCarrier/${config.flightNumber}/dep/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&utc=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightStatusArrivalsByFlight(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/flight/status/${config.flightCarrier/${config.flightNumber}/arr/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&utc=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightTracksArrivalsByFlight(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/flight/tracks/${config.flightCarrier/${config.flightNumber}/arr/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&includeFlightPlan=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightTracksDeparturesByFlight(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/flight/tracks/${config.flightCarrier/${config.flightNumber}/dep/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&utc=false&includeFlightPlan=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightTracksArrivalsByAirport(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/flight/track/${config.flightCarrier/${config.flightNumber}/arr/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&utc=false&includeFlightPlan=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightTracksDeparturesByAirport(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/flight/track/${config.flightCarrier/${config.flightNumber}/dep/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&utc=false&includeFlightPlan=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getRouteStatusByDeparture(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/route/status/${config.depAirport}/${config.arrAirport}/dep/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}&utc=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getRouteStatusByArrival(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/route/status/${config.depAirport}/${config.arrAirport}/arr/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}&utc=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightsWithinBoundBox(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/flightsNear/${config.topLat}/${config.leftLon}/${config.bottomLat}/${config.rightLon}?appId=${config.appId}&appKey=${config.appKey}`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getFlightsWithinAreaRadius(config) {
		const uri = `${baseURI}flightstatus/rest/v2/json/flightsNear/${config.latitude}/${config.longitude}/${config.mileRadius}?appId=${config.appId}&appKey=${config.appKey}`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};


	// MARK: Delay Index
	async getDelayIndexByAirport(config) {
		const uri = `${baseURI}delayindex/rest/v1/json/airports/${config.airport}?appId=${config.appId}&appKey=${config.appKey}`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getDelayIndexByCountryCode(config) {
		const uri = `${baseURI}delayindex/rest/v1/json/country/${config.countryCode}?appId=${config.appId}&appKey=${config.appKey}`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getDelayIndexByRegion(config) {
		const uri = `${baseURI}delayindex/rest/v1/json/region/${config.region}?appId=${config.appId}&appKey=${config.appKey}`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

	async getDelayIndexByStateCode(config) {
		const uri = `${baseURI}delayindex/rest/v1/json/state/${config.stateCode}?appId=${config.appId}&appKey=${config.appKey}`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);
	    return response;
	};

};