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

		const fn = this[config.method];
		let data = null;

		if (typeof fn === 'function') {
			data = await fn(config);
		}

		return data;
	}

	//MARK: FIDS Data

	async fidsArrival({ appId, appKey, requestedFields, timeWindowBegin, timeWindowEnd, lateMinutes }) {
		const path = 'fids/rest/v1/json/CVG/arrivals';
		const uri = `${baseURI}${path}`;
		const encodedRequestedFields = requestedFields.join(',');
		const params = {
			uri: uri,
			qs: { appId, appKey, requestedFields: encodedRequestedFields, timeWindowBegin, timeWindowEnd, lateMinutes },
			json: true
		};

		let response = await requestPromise(params);
		for (let res of response.fidsData) {
			await this.addTimestamp(res);
		}

		return response.fidsData;
	}

	async fidsDeparture({ appId, appKey, requestedFields, timeWindowBegin, timeWindowEnd, lateMinutes }) {
		const path = 'fids/rest/v1/json/CVG/departures';
		const uri = `${baseURI}${path}`;
		const encodedRequestedFields = requestedFields.join(',');
		const params = {
			uri: uri,
			qs: { appId, appKey, requestedFields: encodedRequestedFields, timeWindowBegin, timeWindowEnd, lateMinutes },
			json: true
		};

		let response = await requestPromise(params);
		for (let res of response.fidsData) {
			await this.addTimestamp(res);
		}
		return response.fidsData;
	}

	// Get taxi times
	async getTaxiData({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		
		const path = `flightstatus/rest/v2/json/airport/status/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

		const response = await requestPromise(params);

		const data = this.getUniqueTaxiData(response);

		return data;
	}

	getUniqueTaxiData(response) {
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
					scheduledTaxiInMinutes: -1,
					taxiInMinutes: -1
				};
			}

			let obj = Object.assign({}, { flightId: response.flightStatuses[i].flightId }, taxiData, response.flightStatuses[i].carrierFsCode, response.flightStatuses[i].flightEquipment, { timestamp : new Date() });
			// For some reason, call creates random objects that have an alphanumeric in it
			delete obj['0'];
			delete obj['1'];
			delete obj['2'];
			data.push(obj);
		}

		return data;
	}

	// MARK: Airlines API
	async getAllAirlines({ appId, appKey }) {
		const path = 'airlines/rest/v1/json/all';
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

	    // Run our query.
	    let data = await requestPromise(params);

	    // Add timestamp
	    const response = await this.addTimestamp(data);

		return response;
	}

	async getActiveAirlines({ appId, appKey }) {
		const path = 'airlines/rest/v1/json/active';
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

	    // Run our query.
	    let data = await requestPromise(params);

	    // Add timestamp
	    const response = await this.addTimestamp(data);

	    return response;
	}

	async getActiveAirlinesForDate({ date, appId, appKey }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();

		const path = `airlines/rest/v1/json/active/${year}/${month}/${day}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.addTimestamp(data);

		return response;
	}


	// MARK: Airports API
	async getAllAirports({ appId, appKey }) {
		const path = 'airports/rest/v1/json/all';
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.addTimestamp(data);

		return response;
	}

	async getActiveAirports({ appId, appKey }) {
		const path = 'airports/rest/v1/json/active';
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.addTimestamp(data);

		return response;
	}

	async getActiveAirportsForDate({ date, appId, appKey }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();

		const path = `airports/rest/v1/json/active/${year}/${month}/${day}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.addTimestamp(data);

		return response;
	}

	async getCurrentAirportByCode({ airportCode, appId, appKey }) {
		const path = `airports/rest/v1/json/${airportCode}/today`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.addTimestamp(data);

		return response;
	}

	async getAirportByCityCode({ cityCode, appId, appKey }) {
		const path = `airports/rest/v1/json/cityCode/${cityCode}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey },
			json: true
		};

		// Run our query.
		let data = await requestPromise(params);

		// Add timestamp
		const response = await this.addTimestamp(data);

		return response;
	}

	// MARK: Flight Status & Track

	// Track by airport
	async getFlightStatusArrivalsByAirport({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		
		const path = `flightstatus/rest/v2/json/airport/status/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

	    // Run our query.
	    let response = await requestPromise(params);
	    for (let res of response.flightStatuses) {
	    	await this.addTimestamp(res);
	    }
	    return response.flightStatuses;
	}

	async getFlightStatusDeparturesByAirport({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();

		const path = `flightstatus/rest/v2/json/airport/status/${airport}/dep/${year}/${month}/${day}/${hour}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

		// Run our query
	    let response = await requestPromise(params);
	    for (let res of response.flightStatuses) {
	    	await this.addTimestamp(res);
	    }
	    return response.flightStatuses;
	}

	async getFlightTracksArrivalsByAirport({ airport, appId, appKey, includeFlightPlan }) {
		const path = `flightstatus/rest/v2/json/airport/tracks/${airport}/arr`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, includeFlightPlan },
			json: true
		};

		// Run our query.
	    let response = await requestPromise(params);
	    for (let res of response.flightTracks) {
	    	await this.addTimestamp(res);
	    }
	    return response.flightTracks;
	}

	async getFlightTracksDeparturesByAirport({ airport, appId, appKey, includeFlightPlan }) {
		const path = `flightstatus/rest/v2/json/airport/tracks/${airport}/dep`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, includeFlightPlan },
			json: true
		};

		// Run our query.
	    let response = await requestPromise(params);
	    for (let res of response.flightTracks) {
	    	await this.addTimestamp(res);
	    }
	    return response.flightTracks;
	}

	async getFlightTracksArrivalsByAirportWithDate({ airport, date, appId, appKey, includeFlightPlan}) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();

		const path = `flightstatus/rest/v2/json/airport/tracks/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, includeFlightPlan },
			json: true
		};

		// Run our query.
	    let response = await requestPromise(params);
	    for (let res of response.flightTracks) {
	    	await this.addTimestamp(res);
	    }
	    return response.flightTracks;
	}

	async getFlightTracksDeparturesByAirportWithDate({ airport, date, appId, appKey, includeFlightPlan}) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();

		const path = `flightstatus/rest/v2/json/airport/tracks/${airport}/dep/${year}/${month}/${day}/${hour}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, includeFlightPlan },
			json: true
		};

		// Run our query.
	    let response = await requestPromise(params);
	    for (let res of response.flightTracks) {
	    	await this.addTimestamp(res);
	    }
	    return response.flightTracks;
	}

	// MARK: - Appendices
	async getAppendixAirline({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		
		const path = `flightstatus/rest/v2/json/airport/status/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

	    // Run our query.
	    let data = await requestPromise(params);
	    const response = await this.addTimestamp(data);

	    return response.appendix.airlines;
	}

	async getAppendixAirport({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		
		const path = `flightstatus/rest/v2/json/airport/status/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

	    // Run our query.
	    let data = await requestPromise(params);
	    const response = await this.addTimestamp(data);

	    return response.appendix.airports;
	}

	async getAppendixEquipment({ airport, date, appId, appKey, utc }) {
		const { year, month, day, hour } = date || this.getCurrentDateObject();
		
		const path = `flightstatus/rest/v2/json/airport/status/${airport}/arr/${year}/${month}/${day}/${hour}`;
		const uri = `${baseURI}${path}`;
		const params = {
			uri: uri,
			qs: { appId, appKey, utc },
			json: true
		};

	    // Run our query.
	    let data = await requestPromise(params);
	    const response = await this.addTimestamp(data);

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

	addTimestamp(doc) {
	    return Object.assign(doc, { timestamp: new Date() });
	}
};
