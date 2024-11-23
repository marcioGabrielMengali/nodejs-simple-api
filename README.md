# Project
Simple project to build an api using nodejs

## About
statefull project to study about apis using nodejs
this project is for a user to register contacts

## how to run 
```shell
npm run dev
```

## Routes

### GET
```shell
curl --request GET \
  --url http://localhost:3333/contact \
  --header 'User-Agent: insomnia/10.1.1'
```
### POST
``` shell
curl --request POST \
  --url http://localhost:3333/contact \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/10.1.1' \
  --data '{
	"name": "Kelly",
	"mobilePhone": "1234",
	"email": "kelly@example.com"
}'
```
### DELETE
```shell
curl --request DELETE \
  --url http://localhost:3333/contact/3ed01e4e-f415-4f0b-9a97-fd0f2bafac19 \
  --header 'User-Agent: insomnia/10.1.1'
```
### PUT
```shell
curl --request PUT \
  --url http://localhost:3333/contact/8a5a4b2f-9054-4d03-ad9f-64c6a3ae5b42 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/10.1.1' \
  --data '{
	"name": "Madu",
	"mobilePhone": "5678",
	"email": "madu@example.com"
}'
```