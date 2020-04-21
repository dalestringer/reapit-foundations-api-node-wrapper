# Reapit Foundations Platform REST API Node.js Wrapper

This is a wrapper for the [Reapit Foundations Platform REST API](https://www.reapit.com/foundations/), for Node.js. This project is very much a work in progress and so far only has a couple of basic endpoints set-up.

## Table of contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Development/Todo](#development)

## Features

The library is still in development and so only currently allows you to call two endpoints, these are:

-   Contact Endpoints
    -   GetContact
    -   GetContacts

More will be added in the future.

## Installation

As this library is still in development there is no easy way to install it currently. The plan will be to put in on NPM so it can be installed with a simple command. If you would like to contribute then please click [here](#development).

## Usage

Here is a basic example of how you would call the `GetContacts` endpoint:

```javascript
import ReapitApi from 'ReapitApi';

const reapitApi = new ReapitApi({
	client_id: 'client_id',
	secret: 'secret',
	reapit_customer: 'customer',
});

reapitApi
	.getContacts()
	.then(data => console.log(data))
	.catch(err => console.log(err));
```

NOTE: This library only currently supports the `Client credentials flow`.

## Development

If you would like to contribute please feel free to create a [pull request](https://github.com/dayul/reapit-foundations-api-node-wrapper/pulls).

### TODO

As this is a work in progress there are a few things that are crucial for this to be usable.

-   [ ] Add testing to the project
-   [ ] Add all main endpoints for contacts
-   [ ] Add all main endpoints for properties
-   [ ] Add all main endpoints for applicants
-   [ ] Add all main endpoints for offices
