import { singleS3StreamOutput, Activity } from 'aries-data';
import request from 'request-promise';

const baseURI = 'https://api.flightstats.com/flex/';

export default class FlightStatsSource extends Activity {
	static props = {
		name: require('../package.json').name, // Activity name used with SWF
		version: require('../package.json').version // Activity version used with SWF
	};

	@singleS3StreamOutput('json')
	async onTask(activityTask, config) {
		let data = null, preTime = null;
		switch (config.method) {
			case 'departures':
			preTime = await this.fidsDeparture(config);
			data = preTime.fidsData;
			break;
			case 'arrivals':
			const preData = await this.fidsArrival(config);
			data = preData.fidsData;
			break;
			case 'taxi':
			data = await this.getFlightStatusArrivalsByAirport(config);
			break;
			default:
			break;
		}


		return data;
	}

	//MARK: FIDS Data
	async fidsArrival(config) {
		const uri = `${baseURI}fids/rest/v1/json/CVG/arrivals?appId=${config.appId}&appKey={config.appKey}&requestedFields=scheduledTime%2C+scheduledDate%2C+flight%2CstatusCode%2C+remarks%2CactualTime%2CactualGateTime%2CcodesharesAsNames%2C+airlineName%2CflightId&lateMinutes=15&useRunwayTimes=true&excludeCargoOnlyFlights=false`
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

		let response = await request(params);
		for (let res of response.fidsData) {
			await this.transform(res);
		}
		return response;
	}

	async fidsDeparture(config) {
		const uri = `${baseURI}fids/rest/v1/json/CVG/departures?appId=${config.appId}&appKey={config.appKey}&requestedFields=scheduledTime%2C+scheduledDate%2C+flight%2CstatusCode%2C+remarks%2CactualTime%2CactualGateTime%2CcodesharesAsNames%2C+airlineName%2CflightId&lateMinutes=15&useRunwayTimes=true&excludeCargoOnlyFlights=false`
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

		let response = await request(params);
		for (let res of response.fidsData) {
			await this.transform(res);
		}
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
	    let data = [];
	    if (config.method === 'taxi') {
	    	for (let i = 0; i < response.flightStatuses.length; i++) {
	    		let taxiData = null;
	    		if (response.flightStatuses[i].flightDurations !== undefined) {
	    			taxiData = response.flightStatuses[i].flightDurations;
	    		} else if (response.flightStatuses[i].flightDurations === undefined ){
	    			taxiData = {
	    				scheduledBlockMinutes: -1,
	    				blockMinutes: -1,
	    				scheduledAirMinutes: -1,
	    				airMinutes: -1,
	    				scheduledTaxiOutMinutes: -1,
	    				taxiOutMinutes: -1,
	    				taxiInMinutes: -1
	    			};
	    		}
	    		let obj = Object.assign({}, { flightId: response.flightStatuses[i].flightId }, taxiData, response.flightStatuses[i].carrierFsCode, response.flightStatuses[i].flightEquipment.actualEquipmentIataCode, { timestamp : new Date() });
	    		delete obj['0'];
	    		delete obj['1'];
	    		delete obj['2'];
	    		data.push(obj)
	    	}
	    	return data;
	    } else if (config.method === 'appendixAirline') {
	    	return response.appendix.airlines;    
	    } else if (config.method === 'appendixAirport') {
	    	return response.appendix.airports;
	    } else if (config.method === 'appendixEquipment') {
	    	return response.appendix.equipments;
	    }
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
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/status/${config.airport}/dep/${config.year}/${config.month}/${config.day}/${config.hour}?appId=${config.appId}&appKey=${config.appKey}&utc=false`;
		const params = {
			uri: uri,
			qs: config,
			json: true
		};

	    // Run our query.
	    const response = await request(params);

	    return response.flightStatuses;
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

	transform(doc) {
	    return Object.assign(doc, { timestamp: new Date() });
	}
};
