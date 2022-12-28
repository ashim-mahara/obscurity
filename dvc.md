# DVC

## Add files or directories to be added to dvc

`dvc add data/somedata.csv`

## Add gitignore and data.dvc to git

`dvc add data/somedata.csv.dvc data/.gitignore`

## Add a remote, lets do s3

`dvc remote add -d mys3 s3://somedata-bucket`

## Modify the remote if using s3 compatible storage

`dvc remote modify mys3 endpointurl http://10.10.1.142:7000`

## Add credentials

`dvc remote modify mys3 --local access_key_id login_username`

`dvc remote modify mys3 --local secret_access_key very_secure_password`

## Save config

`git add .dvc/config`

## Push the data

`dvc push`
