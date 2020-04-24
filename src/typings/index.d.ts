declare namespace ReapitApi {
	export interface ConstructorOptions {
		client_id: string;
		secret: string;
		reapit_customer?: string;
	}
	namespace Calls {
		namespace Authentication {
			export interface Response {
				access_token?: string;
				token_type?: string;
				expires_in?: number;
				error?: string;
			}
		}
		namespace Contacts {
			export interface GetContactsParamOptions {
				pageSize?: number;
				pageNumber?: number;
				sortBy?: string;
				embed?: string[];
				id?: string[];
				email?: string[];
				negotiatorId?: string[];
				officeId?: string[];
				address?: string;
				identityCheck?: string[];
				name?: string;
				marketingConsent?: string[];
				active?: boolean;
				createdFrom?: string;
				createdTo?: string;
			}
			export interface GetContactParamOptions {
				embed?: string[];
			}
		}
		export interface LastHttpRequest {
			url?: string;
			fetchOptions?: RequestInit;
		}
	}
	namespace Data {
		interface ResponseObject {
			metadata: object;
			_eTag: string;
			_links: object;
			_embedded: object;
		}
		interface ResponseObjects {
			pageNumber: number;
			pageSize: number;
			pageCount: number;
			totalCount: number;
			_links: object;
		}
		namespace Contacts {
			interface Source {
				id: string;
				type: string;
			}
			interface Address {
				type: string;
				buildingName: string;
				buildingNumber: string;
				line1: string;
				line2: string;
				line3: string;
				line4: string;
				postcode: string;
				countryId: string;
			}
			export interface IContact extends ReapitApi.Data.ResponseObject {
				id: string;
				created: string;
				modified: string;
				title: string;
				forename: string;
				surname: string;
				dateOfBirth: string;
				active: boolean;
				marketingConsent: string;
				identityCheck: string;
				source: ReapitApi.Data.Contacts.Source;
				homePhone: string;
				workPhone: string;
				mobilePhone: string;
				email: string;
				primaryAddress: ReapitApi.Data.Contacts.Address;
				secondaryAddress: ReapitApi.Data.Contacts.Address;
				workAddress: ReapitApi.Data.Contacts.Address;
				officeIds: string[];
				negotiatorIds: string[];
			}
			interface IContacts extends ReapitApi.Data.ResponseObjects {
				_embedded: IContact[];
			}

			interface CreateContactBase {
				title?: string;
				forename?: string;
				surname: string;
				dateOfBirth?: string;
				active?: boolean;
				marketingConsent: string;
				source?: ReapitApi.Data.Contacts.Source;
				officeIds: string[];
				negotiatorIds: string[];
				secondaryAddress?: ReapitApi.Data.Contacts.Address;
				workAddress?: ReapitApi.Data.Contacts.Address;
				metadata?: object;
			}

			interface CreateContactPrimaryAddress extends CreateContactBase {
				primaryAddress: ReapitApi.Data.Contacts.Address;
			}

			interface CreateContactHomePhone extends CreateContactBase {
				homePhone: string;
			}

			interface CreateContactWorkPhone extends CreateContactBase {
				workPhone: string;
			}

			interface CreateContactMobilePhone extends CreateContactBase {
				mobilePhone: string;
			}

			interface CreateContactEmail extends CreateContactBase {
				email: string;
			}

			export type ContactCreation =
				| CreateContactPrimaryAddress
				| CreateContactHomePhone
				| CreateContactWorkPhone
				| CreateContactMobilePhone
				| CreateContactEmail;

			export interface UpdateContact {
				title?: string;
				forename?: string;
				surname?: string;
				dateOfBirth?: string;
				active?: boolean;
				marketingConsent?: string;
				source?: ReapitApi.Data.Contacts.Source;
				officeIds?: string[];
				negotiatorIds?: string[];
				secondaryAddress?: ReapitApi.Data.Contacts.Address;
				workAddress?: ReapitApi.Data.Contacts.Address;
				metadata?: object;
				primaryAddress?: ReapitApi.Data.Contacts.Address;
				homePhone?: string;
				workPhone?: string;
				mobilePhone?: string;
				email?: string;
			}
		}
	}
}
