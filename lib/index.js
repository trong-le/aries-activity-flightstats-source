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
		let data = null;
		switch (config.method) {
			case 'departures':
			const departures = await getFlightTracksDeparturesByAirport(config);
			data = departures.flightTracks;
			break;
			case 'arrivals':
			const arrivals = await getFlightTracksArrivalsByAirport(config);
			data = arrivalsData.flightTracks;
			break;
			case 'taxi':
			const taxi = await getFlightStatusArrivalsByAirport(config);
			data = taxi.flightStatuses;
			break;
			default:
			break;
		}

		return data.map(JSON.stringify).join('\n');
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
	}

	async getActiveAirlines(config) {
		const uri = `${baseURI}airlines/rest/v1/json/active?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	}

	async getActiveAirlinesForDate(config) {
		const uri = `${baseURI}airlines/rest/v1/json/active/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	}


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
	}

	async getActiveAirports(config) {
		const uri = `${baseURI}airports/rest/v1/json/active?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	}

	async getActiveAirportsForDate(config) {
		const uri = `${baseURI}airports/rest/v1/json/active/${config.year}/${config.month}/${config.day}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	}

	async getCurrentAirportByCode(config) {
		const uri = `${baseURI}airports/rest/v1/json/${config.airportCode}/today?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	}

	async getAirportByCityCode(config) {
		const uri = `${baseURI}airports/rest/v1/json/cityCode/${config.cityCode}?appId=${config.appId}&appKey=${config.appKey}`;
		const parms = {
			uri: uri,
			qs: config,
			json: true
		};

		const response = await request(params);
		return response;
	}

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
	}

	// Get taxi times
	async getFlightStatusArrivalsByAirport(config) {
		if (config.year === "") {
			config.year = new Date().getFullYear();
		}
		if (config.month === "") {
			config.month = new Date().getMonth() + 1;
		}
		if (config.day === "") {
			config.day = new Date().getDate();
		}
		if (config.hour === "") {
			config.hour = new Date().getHours();
		}
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/status/${config.airport}/arr/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&utc=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};
	    // Run our query.
	    const response = await request(params);
	    return response;
	}

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
	}

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
	}

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
	}

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
	}
}
