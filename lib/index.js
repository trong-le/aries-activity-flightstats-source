import { singleS3StreamOutput, Activity } from 'aries-data';
import requestPromise from 'request-promise';

const baseURI = 'https://api.flightstats.com/flex/';

export default class FlightStatsSource extends Activity {
	static props = {
		name: require('../package.json').name, // Activity name used with SWF
		version: require('../package.json').version // Activity version used with SWF
	};

	@singleS3StreamOutput('json')
	async onTask(activityTask, config) {

		let data = null;
		switch (config.method) {
			case 'fidsDeparture':
				data = await this.fidsDeparture(config);
				break;
			case 'fidsArrival':
				data = await this.fidsArrival(config);
				break;
			case 'taxi':
				data = await this.getTaxiData(config);
				break;
			case 'getAllAirlines':
				data = await this.getAllAirlines(config);
				break;
			case 'getActiveAirlines':
				data = await this.getActiveAirlines(config);
				break;
			case 'getActiveAirlinesForDate':
				data = await this.getActiveAirlinesForDate(config);
				break;
			case 'getAllAirports':
				data = await this.getAllAirports(config);
				break;
			case 'getActiveAirports':
				data = await this.getActiveAirports(config);
				break;
			case 'getActiveAirportsForDate':
				data = await this.getActiveAirportsForDate(config);
				break;
			case 'getCurrentAirportByCode':
				data = await this.getCurrentAirportByCode(config);
				break;
			case 'getAirportByCityCode':
				data = await this.getAirportByCityCode(config);
				break;
			case 'getFlightStatusArrivalsByAirport':
				data = await this.getFlightStatusArrivalsByAirport(config);
				break;
			case 'getFlightStatusDeparturesByAirport':
				data = await this.getFlightStatusDeparturesByAirport(config);
				break;
			case 'getFlightTracksArrivalsByAirport':
				data = await this.getFlightTracksArrivalsByAirport(config);
				break;
			case 'getFlightTracksDeparturesByAirport':
				data = await this.getFlightTracksDeparturesByAirport(config);
				break;
			case 'getFlightTracksArrivalsByAirportWithDate':
				data = await this.getFlightTracksArrivalsByAirportWithDate(config);
				break;
			case 'getFlightTracksDeparturesByAirportWithDate':
				data = await this.getFlightTracksDeparturesByAirportWithDate(config);
				break;
			case 'appendixAirline':
				data = await this.getAppendixAirline(config);
				break;
			case 'appendixAirport':
				data = await this.getAppendixAirport(config);
				break;
			case 'appendixEquipment':
				data = await this.getAppendixEquipment(config);
				break;
			default:
				break;
		}

		return data;
	}

	//MARK: FIDS Data

	async fidsArrival({ appId, appKey, requestedFields, timeWindowBegin, timeWindowEnd, lateMinutes }) {
		const uri = `${baseURI}fids/rest/v1/json/CVG/arrivals`
		const encodedRequestedFields = requestedFields.join(',');
		const params = {
			uri: uri,
			qs: { appId, appKey, requestedFields: encodedRequestedFields, timeWindowBegin, timeWindowEnd, lateMinutes },
			json: true
		};

		let response = await requestPromise(params);
		for (let res of response.fidsData) {
			await this.transform(res);
		}
		return response.fidsData;
	}

	async fidsDeparture({ appId, appKey, requestedFields, timeWindowBegin, timeWindowEnd, lateMinutes }) {
		const uri = `${baseURI}fids/rest/v1/json/CVG/departures?appId=${config.appId}&appKey={config.appKey}&requestedFields=${config.reqFields}&timeWindowBegin=${config.timeWindowBegin}&timeWindowEnd=${config.timeWindowEnd}&lateMinutes=${config.delayMinutes}`
		const encodedRequestedFields = requestedFields.join(',');
		const params = {
			uri: uri,
			qs: { appId, appKey, requestedFields: encodedRequestedFields, timeWindowBegin, timeWindowEnd, lateMinutes },
			json: true
		};

		let response = await requestPromise(params);
		for (let res of response.fidsData) {
			await this.transform(res);
		}
		return response.fidsData;
	}

	// Get taxi times
	async getTaxiData({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/status/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

		const response = await requestPromise(params);

		let data = [];
		for (let i = 0; i < response.flightStatuses.length; i++) {
			let taxiData = null;
			if (response.flightStatuses[i].flightDurations !== undefined) {
				taxiData = response.flightStatuses[i].flightDurations;
			} 

			// In case of undefined
			else if (response.flightStatuses[i].flightDurations === undefined ){
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
			let obj = Object.assign({}, { flightId: response.flightStatuses[i].flightId }, taxiData, response.flightStatuses[i].carrierFsCode, response.flightStatuses[i].flightEquipment, { timestamp : new Date() });
			// For some reason, call creates random objects that have an alphanumeric in it
			delete obj['0'];
			delete obj['1'];
			delete obj['2'];
			data.push(obj)
		}

		return data;
	}

	// MARK: Airlines API
	async getAllAirlines({ appId, appKey }) {
		const uri = `${baseURI}airlines/rest/v1/json/all`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

	    // Run our query.
	    let data = await requestPromise(params);

	    // Add timestamp
	    const response = await this.transform(data);

		return response;
	}

	async getActiveAirlines({ appId, appKey }) {
		const uri = `${baseURI}airlines/rest/v1/json/active`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

	    // Run our query.
	    let data = await requestPromise(params);

	    // Add timestamp
	    const response = await this.transform(data);

	    return response;
	}

	async getActiveAirlinesForDate({ date, appId, appKey }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		const uri = `${baseURI}airlines/rest/v1/json/active/${year}/${month}/${day}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.transform(data);

		return response;
	}


	// MARK: Airports API
	async getAllAirports({ appId, appKey }) {
		const uri = `${baseURI}airports/rest/v1/json/all`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.transform(data);

		return response;
	}

	async getActiveAirports({ appId, appKey }) {
		const uri = `${baseURI}airports/rest/v1/json/active`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.transform(data);

		return response;
	}

	async getActiveAirportsForDate({ date, appId, appKey }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		const uri = `${baseURI}airports/rest/v1/json/active/${year}/${month}/${day}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.transform(data);

		return response;
	}

	async getCurrentAirportByCode({ airportCode, appId, appKey }) {
		const uri = `${baseURI}airports/rest/v1/json/${airportCode}/today`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.transform(data);

		return response;
	}

	async getAirportByCityCode({ cityCode, appId, appKey }) {
		const uri = `${baseURI}airports/rest/v1/json/cityCode/${cityCode}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.transform(data);

		return response;
	}

	// MARK: Flight Status & Track

	// Track by airport
	async getFlightStatusArrivalsByAirport({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/status/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

	    // Run our query.
	    let response = await requestPromise(params);
	    for (let res of response.flightStatuses) {
	    	await this.transform(res);
	    }
	    return response.flightStatuses;
	}

	async getFlightStatusDeparturesByAirport({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/status/${airport}/dep/${year}/${month}/${day}/${hour}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

		// Run our query
	    let response = await requestPromise(params);
	    for (let res of response.flightStatuses) {
	    	await this.transform(res);
	    }
	    return response.flightStatuses;
	}

	async getFlightTracksArrivalsByAirport({ airport, appId, appKey, includeFlightPlan }) {
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/tracks/${config.airport}/arr`;
		const params = {
			uri: uri,
			qs: { appId, appKey, includeFlightPlan },
			json: true
		};

		// Run our query.
	    let response = await requestPromise(params);
	    for (let res of response.flightTracks) {
	    	await this.transform(res);
	    }
	    return response.flightTracks;
	}

	async getFlightTracksDeparturesByAirport({ airport, appId, appKey, includeFlightPlan }) {
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/tracks/${airport}/dep`;
		const params = {
			uri: uri,
			qs: { appId, appKey, includeFlightPlan },
			json: true
		};

		// Run our query.
	    let response = await requestPromise(params);
	    for (let res of response.flightTracks) {
	    	await this.transform(res);
	    }
	    return response.flightTracks;
	}

	async getFlightTracksArrivalsByAirportWithDate({ airport, date, appId, appKey, includeFlightPlan}) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();

		const uri = `${baseURI}flightstatus/rest/v2/json/airport/tracks/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, includeFlightPlan },
			json: true
		};

		// Run our query.
	    let response = await requestPromise(params);
	    for (let res of response.flightTracks) {
	    	await this.transform(res);
	    }
	    return response.flightTracks;
	}

	async getFlightTracksDeparturesByAirportWithDate({ airport, date, appId, appKey, includeFlightPlan}) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();

		const uri = `${baseURI}flightstatus/rest/v2/json/airport/tracks/${airport}/dep/${year}/${month}/${day}/${hour}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, includeFlightPlan },
			json: true
		};

		// Run our query.
	    let response = await requestPromise(params);
	    for (let res of response.flightTracks) {
	    	await this.transform(res);
	    }
	    return response.flightTracks;
	}

	// MARK: - Appendices
	async getAppendixAirline({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/status/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

	    // Run our query.
	    let data = await requestPromise(params);
	    const response = await this.transform(data);

	    return response.appendix.airlines;
	}

	async getAppendixAirport({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/status/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

	    // Run our query.
	    let data = await requestPromise(params);
	    const response = await this.transform(data);

	    return response.appendix.airports;
	}

	async getAppendixEquipment({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		
		const uri = `${baseURI}flightstatus/rest/v2/json/airport/status/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

	    // Run our query.
	    let data = await requestPromise(params);
	    const response = await this.transform(data);

	    return response.appendix.equipments;
	}

	getCurrentDateObject() {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hour = date.getHours();

		return {
			year,
			month,
			day,
			hour
		};
	}

	transform(doc) {
	    return Object.assign(doc, { timestamp: new Date() });
	}
};
