import fetch, { RequestInit } from 'node-fetch';

class ReapitApi {
	/**
	 * The client_id of the application
	 * @var {string} _client_id
	 */
	protected _client_id: string;

	/**
	 * The secret of the application
	 * @var {string} _secret
	 */
	protected _secret: string;

	/**
	 * The Reapit customer's API being consumed
	 * @var {string} _reapit_customer
	 */
	protected _reapit_customer: string = 'SBOX';

	/**
	 * The URL to authenticate against
	 * @var {string} _authenticate_url
	 */
	protected _authenticate_url: string =
		'https://dev.connect.reapit.cloud/token';

	/**
	 * The access token which is used to authenticate API requests
	 * @var {string} _access_token
	 */
	protected _access_token: string;

	/**
	 * The time which the current access token expires
	 * @var {date} _access_token_expiry
	 */
	protected _access_token_expiry: Date;

	/**
	 * The base URL for the REST API
	 * @var {string} _api_url
	 */
	protected _api_url: string = 'https://dev.platform.reapit.cloud';

	/**
	 * The current supported version of the API
	 * @var {string} _api_version
	 */
	protected _api_version: string = '2020-01-31';

	/**
	 * The last API request that was sent
	 * @var {object} _last_request
	 */
	protected _last_request: object = null;

	/**
	 * Constructor
	 * @param {object} options
	 * @returns {void}
	 */
	constructor(options: ReapitApi.ConstructorOptions) {
		this._client_id = options.client_id;
		this._secret = options.secret;
		this._reapit_customer =
			options.reapit_customer || this._reapit_customer;
	}

	/**
	 * Helper method to call an endpoint
	 * @param {string} url
	 * @param {object} options
	 * @returns {promise}
	 */
	protected async _call(
		url: string,
		options: RequestInit = {},
	): Promise<any> {
		// Set the current API request, can be used for later debugging
		this._setLastApiRequest(url, options);
		const response = await fetch(url, options);
		return response.json();
	}

	/**
	 * Method to authenticate with the API using the provided credentials
	 * @returns {promise}
	 */
	protected async _authenticate(): Promise<
		ReapitApi.Calls.Authentication.Response
	> {
		const auth_credentials = Buffer.from(
			`${this._client_id}:${this._secret}`,
		).toString('base64');

		const auth_body = new URLSearchParams({
			client_id: this._client_id,
			grant_type: 'client_credentials',
		});

		const response = await this._call(this._authenticate_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${auth_credentials}`,
			},
			body: auth_body,
		});

		return response;
	}

	/**
	 * Method to create a string of URL parameters
	 * @param {object} params
	 * @returns {string}
	 */
	protected _concatParameters(params: object = {}): string {
		let parameters = '?';
		const parametersKeyArray = Object.keys(params);

		if (parametersKeyArray.length < 1) {
			return '';
		}

		parametersKeyArray.forEach((key, index) => {
			if (Array.isArray(params[key])) {
				params[key].forEach(
					(filter: string | number) =>
						(parameters += `${key}=${filter}&`),
				);
			} else {
				parameters += `${key}=${params[key]}&`;
			}
		});

		// Remove the last '&' added.
		return parameters.substr(0, parameters.length - 1);
	}

	/**
	 * Helper method to call an API endpoint
	 * @param {string} endpoint
	 * @param {object} options
	 * @param {object} params
	 * @returns {promise}
	 */
	protected async _apiCall(
		endpoint: string,
		options: RequestInit = {},
		params: object = {},
	): Promise<any> {
		const auth_response = await this._authenticate();

		// If we fail to authenticate return the authentication error.
		if (auth_response.error !== undefined) {
			throw new Error(`Authentication error: ${auth_response.error}`);
		}

		const parameters = this._concatParameters(params);

		const compiled_options = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'api-version': this._api_version,
				Authorization: `Bearer ${auth_response.access_token}`,
				'reapit-customer': this._reapit_customer,
			},
			...options,
		};

		return this._call(
			`${this._api_url}${endpoint}${parameters}`,
			compiled_options,
		);
	}

	/**
	 * Method to set the last API request
	 * @param {string} url
	 * @param {object} fetchOptions
	 * @returns {void}
	 */
	protected _setLastApiRequest(url: string, fetchOptions: RequestInit): void {
		this._last_request = { url, fetchOptions };
	}

	/**
	 * Method to retrieve the last API request
	 * @returns {object}
	 */
	public __getLastApiRequest(): ReapitApi.Calls.LastRequest {
		return this._last_request;
	}

	/**
	 * Method to retrieve all contacts from the API
	 * @param {object} params
	 * @returns {promise}
	 */
	public getContacts(
		params: ReapitApi.Calls.Contacts.GetContactsParamOptions = {},
	): Promise<ReapitApi.Data.Contacts.IContacts> {
		return this._apiCall('/contacts', {}, params);
	}

	/**
	 * Method to retrieve a given contact from the API
	 * @param {string} id
	 * @param {object} params
	 * @returns {promise}
	 */
	public getContact(
		id: string,
		params: ReapitApi.Calls.Contacts.GetContactParamOptions = {},
	): Promise<ReapitApi.Data.Contacts.IContact> {
		return this._apiCall(`/contacts/${id}`, {}, params);
	}
}

export default ReapitApi;
