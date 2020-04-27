import ReapitApi from '../src/index';
import config from '../src/config/config';

const reapitApi = new ReapitApi(config);

describe('Testing contact methods', function () {
	it('Should create a new contact', async function (done) {
		await reapitApi.postContact({
			surname: 'Bloggs',
			marketingConsent: 'grant',
			officeIds: ['RPT'],
			negotiatorIds: ['NEG'],
			email: 'joe@bloggs.com',
		});

		const httpResponse = reapitApi.__getLastHttpResponse();

		expect(httpResponse.status).toBe(201);
		done();
	});

	it('Should retrieve a contact', async function (done) {
		const response = await reapitApi.getContact('RPT20000121');
		const httpResponse = reapitApi.__getLastHttpResponse();

		expect(httpResponse.status).toBe(200);
		expect(response).toHaveProperty('id');
		expect(response).toHaveProperty('created');
		done();
	});

	it('Should retrieve an array of contacts', async function (done) {
		const response = await reapitApi.getContacts();
		const httpResponse = reapitApi.__getLastHttpResponse();

		expect(httpResponse.status).toBe(200);
		expect(response).toHaveProperty('_embedded');
		done();
	});

	it('Should update a contact', async function (done) {
		const response = await reapitApi.patchContact('RPT20000121', {
			email: 'test123@test.com',
		});
		const httpResponse = reapitApi.__getLastHttpResponse();

		expect(httpResponse.status).toBe(204);
		expect(response).toBe(true);
		done();
	});
});
