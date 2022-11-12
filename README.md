# obscurity
Obscure Collection of Things


## Disable 2FA in TrueNas

`midclt call auth.twofactor.update '{"enabled": false}'`


## Rsync Source Destination Recursively with delete source and progress

`rsync --progress --remove-source-files -r ${source} ${destination}`
