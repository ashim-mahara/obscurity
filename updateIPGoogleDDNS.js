/* jshint esversion: 8 */
/* jshint node: true */

"use strict";

const https = require('https');

const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

function sleep(ms) {
	return new Promise(r => setTimeout(r, ms));
}

async function getLatestIP() {

	// interface name like eth0, might have to grep 'inet net' in some cases, please adapt

	let IP = await exec("ifconfig ${insert_interface_name_here} | grep 'inet ' | cut -d: -f2 | awk '{print $2}'");
	IP = IP.stdout.trim().replace("\n", "");
	return IP;
}

function getOptions(IP) {
	const user = "insert_user_here";
	const pass = "insert_password_here";

	const userPass = new Buffer.from(`${user}:${pass}`).toString('base64');

	const options = {
		hostname: 'domains.google.com',
		port: 443,
		path: `/nic/update?hostname=insert_domain_name_here&myip=${IP}`,
		method: 'GET',
		headers: {
			'Authorization': `Basic ${userPass}`,
			'User-Agent': "insert_useragent_here"
		}
	};

	return options;
}

function makeGET(options) {
	return new Promise(function (resolve, reject) {
		const request = https.request(options, function (response) {

			if (response.statusCode < 200 || response.statusCode >= 300) {
				reject(new Error(`statusCode = ${response.statusCode}`));
			}

			request.on('error', function (err) {
				reject("Request Failed: ", err);
			});

			let body = [];
			response.on('data', function (chunk) {
				body.push(chunk);
			});

			response.on('end', function () {

				try {
					body = Buffer.concat(body).toString();
				} catch (err) {
					reject(err);
				}
				resolve(body);
			});

		});
		request.end();
	});
}


async function updateDomain(currentIP) {

	let latestIP = await getLatestIP();

	if (currentIP != latestIP || currentIP == "undefined") {

		let requestOptions = getOptions(latestIP);

		try {
			let response = await makeGET(requestOptions);
			response = response.toString();

			let result = [latestIP, response];

			return result;

		} catch (error) {
			console.error(`Could not make request: ${error.stack}`);
		}
	}
}

(async () => {
	let currentIP;
  
	while (true) {
		let result = await updateDomain(currentIP);
		let latestIP = result[0];
		let resp = result[1];

		switch (true) {
			case (resp.includes("good")):
				console.log(`Successfully changed IP to ${latestIP}`);
				break;
			case (resp.includes("nochg")):
				console.log(`IP Already Set to ${resp.split(" ")[1]}, Please Don't Try Again. You might get blocked.`);
				break;
			case (resp.includes("nohost")):
				console.error(`Hostname doesn't exist`);
				process.exit();
			case (resp.includes("badauth")):
				console.error(`Bad Authentication`);
				process.exit();
			case (resp.includes(`notfqdn`)):
				console.error(`Supplied hostname isn't a valid fully-qualified domain name.`);
				process.exit();
			case (resp.includes(`badagent`)):
				console.error(`Bad Agent. Ensure the user agent is set in the request.`);
				process.exit();
			case (resp.includes(`abuse`)):
				console.error(`Dynamic DNS access for the hostname has been blocked due to failure to interpret previous responses correctly.`);
				process.exit();
			case (resp.includes('911')):
				console.error(`Error in Google Wait for 5 Minutes`);
				sleep(300000);
				break;
			case (resp.includes(`conflict A`) || resp.includes(`conflict AAAA`)):
				console.error(`A custom A or AAAA resource record conflicts with the update. Delete the indicated resource record within the DNS settings page and try the update again.`);
				process.exit();
		}
		currentIP = latestIP;

		// sleep for 1 hour
		await sleep(3600000);
	}
})();
