export const config = {
	airport: 'CVG',
  embark: 'dep',
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
	includeFlightPlan : false,
	appId : process.env.APP_ID,
	appKey : process.env.APP_KEY
};

export const response = {
	"flightStatuses": [
    {
      "flightId": 711088298,
      "carrierFsCode": "WN",
      "flightNumber": "2848",
      "departureAirportFsCode": "OAK",
      "arrivalAirportFsCode": "ABQ",
      "departureDate": {
        "dateLocal": "2016-05-09T06:55:00.000",
        "dateUtc": "2016-05-09T13:55:00.000Z"
      },
      "arrivalDate": {
        "dateLocal": "2016-05-09T10:10:00.000",
        "dateUtc": "2016-05-09T16:10:00.000Z"
      },
      "status": "L",
      "schedule": {
        "flightType": "J",
        "serviceClasses": "RY",
        "restrictions": "F",
        "downlines": [
          {
            "fsCode": "DAL",
            "flightId": 711021513
          }
        ]
      },
      "operationalTimes": {
        "publishedDeparture": {
          "dateLocal": "2016-05-09T06:55:00.000",
          "dateUtc": "2016-05-09T13:55:00.000Z"
        },
        "publishedArrival": {
          "dateLocal": "2016-05-09T10:10:00.000",
          "dateUtc": "2016-05-09T16:10:00.000Z"
        },
        "scheduledGateDeparture": {
          "dateLocal": "2016-05-09T06:55:00.000",
          "dateUtc": "2016-05-09T13:55:00.000Z"
        },
        "estimatedGateDeparture": {
          "dateLocal": "2016-05-09T06:50:00.000",
          "dateUtc": "2016-05-09T13:50:00.000Z"
        },
        "actualGateDeparture": {
          "dateLocal": "2016-05-09T06:50:00.000",
          "dateUtc": "2016-05-09T13:50:00.000Z"
        },
        "flightPlanPlannedDeparture": {
          "dateLocal": "2016-05-09T07:04:00.000",
          "dateUtc": "2016-05-09T14:04:00.000Z"
        },
        "estimatedRunwayDeparture": {
          "dateLocal": "2016-05-09T06:59:00.000",
          "dateUtc": "2016-05-09T13:59:00.000Z"
        },
        "actualRunwayDeparture": {
          "dateLocal": "2016-05-09T06:59:00.000",
          "dateUtc": "2016-05-09T13:59:00.000Z"
        },
        "scheduledGateArrival": {
          "dateLocal": "2016-05-09T10:10:00.000",
          "dateUtc": "2016-05-09T16:10:00.000Z"
        },
        "estimatedGateArrival": {
          "dateLocal": "2016-05-09T09:54:00.000",
          "dateUtc": "2016-05-09T15:54:00.000Z"
        },
        "actualGateArrival": {
          "dateLocal": "2016-05-09T09:54:00.000",
          "dateUtc": "2016-05-09T15:54:00.000Z"
        },
        "flightPlanPlannedArrival": {
          "dateLocal": "2016-05-09T09:59:00.000",
          "dateUtc": "2016-05-09T15:59:00.000Z"
        },
        "estimatedRunwayArrival": {
          "dateLocal": "2016-05-09T09:48:00.000",
          "dateUtc": "2016-05-09T15:48:00.000Z"
        },
        "actualRunwayArrival": {
          "dateLocal": "2016-05-09T09:48:00.000",
          "dateUtc": "2016-05-09T15:48:00.000Z"
        }
      },
      "flightDurations": {
        "scheduledBlockMinutes": 135,
        "blockMinutes": 124,
        "scheduledAirMinutes": 115,
        "airMinutes": 109,
        "scheduledTaxiOutMinutes": 9,
        "taxiOutMinutes": 9,
        "scheduledTaxiInMinutes": 11,
        "taxiInMinutes": 6
      },
      "airportResources": {
        "departureTerminal": "2",
        "departureGate": "31",
        "arrivalGate": "A8"
      },
      "flightEquipment": {
        "scheduledEquipmentIataCode": "73W",
        "actualEquipmentIataCode": "73R",
        "tailNumber": "N7743B"
      }
    },
    {
      "flightId": 711080292,
      "carrierFsCode": "WN",
      "flightNumber": "632",
      "departureAirportFsCode": "MDW",
      "arrivalAirportFsCode": "ABQ",
      "departureDate": {
        "dateLocal": "2016-05-09T08:25:00.000",
        "dateUtc": "2016-05-09T13:25:00.000Z"
      },
      "arrivalDate": {
        "dateLocal": "2016-05-09T10:25:00.000",
        "dateUtc": "2016-05-09T16:25:00.000Z"
      },
      "status": "L",
      "schedule": {
        "flightType": "J",
        "serviceClasses": "RY",
        "restrictions": "F",
        "uplines": [
          {
            "fsCode": "BOS",
            "flightId": 711032992
          }
        ],
        "downlines": [
          {
            "fsCode": "PHX",
            "flightId": 711021561
          },
          {
            "fsCode": "SJC",
            "flightId": 711094530
          }
        ]
      },
      "operationalTimes": {
        "publishedDeparture": {
          "dateLocal": "2016-05-09T08:25:00.000",
          "dateUtc": "2016-05-09T13:25:00.000Z"
        },
        "publishedArrival": {
          "dateLocal": "2016-05-09T10:25:00.000",
          "dateUtc": "2016-05-09T16:25:00.000Z"
        },
        "scheduledGateDeparture": {
          "dateLocal": "2016-05-09T08:25:00.000",
          "dateUtc": "2016-05-09T13:25:00.000Z"
        },
        "estimatedGateDeparture": {
          "dateLocal": "2016-05-09T08:24:00.000",
          "dateUtc": "2016-05-09T13:24:00.000Z"
        },
        "actualGateDeparture": {
          "dateLocal": "2016-05-09T08:24:00.000",
          "dateUtc": "2016-05-09T13:24:00.000Z"
        },
        "flightPlanPlannedDeparture": {
          "dateLocal": "2016-05-09T08:37:00.000",
          "dateUtc": "2016-05-09T13:37:00.000Z"
        },
        "estimatedRunwayDeparture": {
          "dateLocal": "2016-05-09T08:46:00.000",
          "dateUtc": "2016-05-09T13:46:00.000Z"
        },
        "actualRunwayDeparture": {
          "dateLocal": "2016-05-09T08:46:00.000",
          "dateUtc": "2016-05-09T13:46:00.000Z"
        },
        "scheduledGateArrival": {
          "dateLocal": "2016-05-09T10:25:00.000",
          "dateUtc": "2016-05-09T16:25:00.000Z"
        },
        "estimatedGateArrival": {
          "dateLocal": "2016-05-09T10:30:00.000",
          "dateUtc": "2016-05-09T16:30:00.000Z"
        },
        "actualGateArrival": {
          "dateLocal": "2016-05-09T10:30:00.000",
          "dateUtc": "2016-05-09T16:30:00.000Z"
        },
        "flightPlanPlannedArrival": {
          "dateLocal": "2016-05-09T10:14:00.000",
          "dateUtc": "2016-05-09T16:14:00.000Z"
        },
        "estimatedRunwayArrival": {
          "dateLocal": "2016-05-09T10:29:00.000",
          "dateUtc": "2016-05-09T16:29:00.000Z"
        },
        "actualRunwayArrival": {
          "dateLocal": "2016-05-09T10:29:00.000",
          "dateUtc": "2016-05-09T16:29:00.000Z"
        }
      },
      "delays": {
        "departureRunwayDelayMinutes": 9,
        "arrivalGateDelayMinutes": 5,
        "arrivalRunwayDelayMinutes": 15
      },
      "flightDurations": {
        "scheduledBlockMinutes": 180,
        "blockMinutes": 186,
        "scheduledAirMinutes": 157,
        "airMinutes": 163,
        "scheduledTaxiOutMinutes": 12,
        "taxiOutMinutes": 22,
        "scheduledTaxiInMinutes": 11,
        "taxiInMinutes": 1
      },
      "airportResources": {
        "departureGate": "A15",
        "arrivalGate": "A11"
      },
      "flightEquipment": {
        "scheduledEquipmentIataCode": "73W",
        "actualEquipmentIataCode": "73W",
        "tailNumber": "N478WN"
      }
    },
    {
      "flightId": 711063199,
      "carrierFsCode": "EV",
      "flightNumber": "3857",
      "departureAirportFsCode": "IAH",
      "arrivalAirportFsCode": "ABQ",
      "departureDate": {
        "dateLocal": "2016-05-09T09:25:00.000",
        "dateUtc": "2016-05-09T14:25:00.000Z"
      },
      "arrivalDate": {
        "dateLocal": "2016-05-09T10:49:00.000",
        "dateUtc": "2016-05-09T16:49:00.000Z"
      },
      "status": "L",
      "schedule": {
        "flightType": "J",
        "serviceClasses": "Y",
        "restrictions": ""
      },
      "operationalTimes": {
        "publishedDeparture": {
          "dateLocal": "2016-05-09T09:25:00.000",
          "dateUtc": "2016-05-09T14:25:00.000Z"
        },
        "publishedArrival": {
          "dateLocal": "2016-05-09T10:49:00.000",
          "dateUtc": "2016-05-09T16:49:00.000Z"
        },
        "scheduledGateDeparture": {
          "dateLocal": "2016-05-09T09:25:00.000",
          "dateUtc": "2016-05-09T14:25:00.000Z"
        },
        "estimatedGateDeparture": {
          "dateLocal": "2016-05-09T09:24:00.000",
          "dateUtc": "2016-05-09T14:24:00.000Z"
        },
        "actualGateDeparture": {
          "dateLocal": "2016-05-09T09:24:00.000",
          "dateUtc": "2016-05-09T14:24:00.000Z"
        },
        "flightPlanPlannedDeparture": {
          "dateLocal": "2016-05-09T09:36:00.000",
          "dateUtc": "2016-05-09T14:36:00.000Z"
        },
        "estimatedRunwayDeparture": {
          "dateLocal": "2016-05-09T10:01:00.000",
          "dateUtc": "2016-05-09T15:01:00.000Z"
        },
        "actualRunwayDeparture": {
          "dateLocal": "2016-05-09T10:01:00.000",
          "dateUtc": "2016-05-09T15:01:00.000Z"
        },
        "scheduledGateArrival": {
          "dateLocal": "2016-05-09T10:49:00.000",
          "dateUtc": "2016-05-09T16:49:00.000Z"
        },
        "estimatedGateArrival": {
          "dateLocal": "2016-05-09T11:03:00.000",
          "dateUtc": "2016-05-09T17:03:00.000Z"
        },
        "actualGateArrival": {
          "dateLocal": "2016-05-09T11:03:00.000",
          "dateUtc": "2016-05-09T17:03:00.000Z"
        },
        "flightPlanPlannedArrival": {
          "dateLocal": "2016-05-09T10:31:00.000",
          "dateUtc": "2016-05-09T16:31:00.000Z"
        },
        "estimatedRunwayArrival": {
          "dateLocal": "2016-05-09T10:58:00.000",
          "dateUtc": "2016-05-09T16:58:00.000Z"
        },
        "actualRunwayArrival": {
          "dateLocal": "2016-05-09T10:58:00.000",
          "dateUtc": "2016-05-09T16:58:00.000Z"
        }
      },
      "codeshares": [
        {
          "fsCode": "AC",
          "flightNumber": "3083",
          "relationship": "L"
        },
        {
          "fsCode": "CM",
          "flightNumber": "5420",
          "relationship": "L"
        },
        {
          "fsCode": "NZ",
          "flightNumber": "6424",
          "relationship": "L"
        },
        {
          "fsCode": "UA",
          "flightNumber": "3857",
          "relationship": "S"
        }
      ],
      "delays": {
        "departureRunwayDelayMinutes": 25,
        "arrivalGateDelayMinutes": 14,
        "arrivalRunwayDelayMinutes": 27
      },
      "flightDurations": {
        "scheduledBlockMinutes": 144,
        "blockMinutes": 159,
        "scheduledAirMinutes": 115,
        "airMinutes": 117,
        "scheduledTaxiOutMinutes": 11,
        "taxiOutMinutes": 37,
        "scheduledTaxiInMinutes": 18,
        "taxiInMinutes": 5
      },
      "airportResources": {
        "departureTerminal": "B",
        "departureGate": "15"
      },
      "flightEquipment": {
        "scheduledEquipmentIataCode": "ERJ",
        "actualEquipmentIataCode": "E45",
        "tailNumber": "N17115"
      }
    }
  ],
  "msg": "",
  "time": "2016-05-11T02:38:54.043Z",
  "v": 0
};

export const taxiData = [
	{	"flightId": 711088298,
        "scheduledBlockMinutes": 135,
        "blockMinutes": 124,
        "scheduledAirMinutes": 115,
        "airMinutes": 109,
        "scheduledTaxiOutMinutes": 9,
        "taxiOutMinutes": 9,
        "scheduledTaxiInMinutes": 11,
        "taxiInMinutes": 6,
        "scheduledEquipmentIataCode": "73W",
        "actualEquipmentIataCode": "73R",
        "tailNumber": "N7743B" 
    },
    {	"flightId": 711080292,
        "scheduledBlockMinutes": 180,
        "blockMinutes": 186,
        "scheduledAirMinutes": 157,
        "airMinutes": 163,
        "scheduledTaxiOutMinutes": 12,
        "taxiOutMinutes": 22,
        "scheduledTaxiInMinutes": 11,
        "taxiInMinutes": 1,
        "scheduledEquipmentIataCode": "73W",
        "actualEquipmentIataCode": "73W",
        "tailNumber": "N478WN" 
    },
    {	"flightId": 711063199,
        "scheduledBlockMinutes": 144,
        "blockMinutes": 159,
        "scheduledAirMinutes": 115,
        "airMinutes": 117,
        "scheduledTaxiOutMinutes": 11,
        "taxiOutMinutes": 37,
        "scheduledTaxiInMinutes": 18,
        "taxiInMinutes": 5,
        "scheduledEquipmentIataCode": "ERJ",
        "actualEquipmentIataCode": "E45",
        "tailNumber": "N17115" 
    }
];
