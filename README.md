# obscurity
Obscure Collection of Things

## Files
### `parse.conf`

Flattens JS using Logstash.

### `updateIPGoogleDDNS.js`

Updates Dynamic DNS for Google Domains. Change values in script while using. Will run indefinitely if no errors.

## Commands

### Disable 2FA in TrueNas

`midclt call auth.twofactor.update '{"enabled": false}'`


### Rsync Source Destination Recursively with delete source and progress

`rsync --progress --remove-source-files -r ${source} ${destination}`
