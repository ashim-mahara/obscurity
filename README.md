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

### Extract tar file fast with pigz

`pigz -dc myfile.tar.gz | pv | tar xf -`

### Delete folder fast with rsync

`mkdir empty/ && rsync -a --delete empty/ folder_to_delete/`

### Search for string in files in a directory using grep

`grep -rnw './dir' -e 'string_to_find'`

### Fast huggingface download

`pip install "huggingface_hub[hf_transfer]"`

`HF_HUB_ENABLE_HF_TRANSFER=1 huggingface-cli download --repo-type model model-repo-path`

### Fast file transfer over ssh with tar

`tar -cf - $source_directory | ssh user@host "tar -xf - -C $destination_directory"`
