# SkyVault

**SkyVault** is a software that allows you to backup files and folders on your computer (and servers) using [Autonomys Network](https://autonomys.xyz/)'s decentralized, permanent storage service, [Auto Drive](https://ai3.storage/), leveraging the capabilities of [Secret Network](https://scrt.network/).

SkyVault is designed as a command line (CLI) to simplify integration into any device with a few commands, schedule periodic backups, and much more.

## Features

With **SkyVault**, you can:

- Upload a file
- Upload a folder
- Get all the uploaded files
- Share a file with a specific user (with a public id)
- Get the public URL of a specific file to share
- Get the metadata for a file
- Get the files shared with you by other users
- Delete a file
- Search files with a specific name/CID

And more soon.

## Requeriments

To use **SkyVault**, you need:
1. NPM and Node installed on your computer/server.
2. An API Key from the [Auto Drive](https://ai3.storage/) service.

## How to use

1. Build the program:

```bash
npm run build
```

2. Run the program using help to check all the available features:

```bash
node dist/index.js help
```

3. Add the API Key from the [Auto Drive](https://ai3.storage/) service to use in the other features:

```bash
node dist/index.js addKey "<API Key>"
```

4. Execute the other functions to upload and query files.
5. You can run this program using crontab or any other service.

### Some examples:

- To upload a new file:

```bash
node dist/index.js uploadFile "<File Path>" "<Password>"
```

- To upload a new folder:

```bash
node dist/index.js uploadFolder "<Folder Path>" "<Password>"
```

- To get all the files uploaded with your account/key:

```bash
node dist/index.js getFiles
```

- Share an uploaded files with a specific public id (user):

```bash
node dist/index.js shareFile "<File CID>" "<Public ID>"
```

- Get a public URL for a file to share with anyone:

```bash
node dist/index.js getPublicURL "<File CID>"
```

- Get the metadata a specific File CID:

```bash
node dist/index.js getObject "<File CID>"
```

- Get all the files shared by others with you:

```bash
node dist/index.js getSharedToMe
```

- Delete a file:

```bash
node dist/index.js deleteFile "<File CID>"
```

- Search for files with a specific name/cid

```bash
node dist/index.js searchFiles "<Any pattern/name/part of cid>"
```

## To build

In the future, this CLI will be standalone (no more call to Node everytime).

For now, this project is using _Taurus_ testnet in Secret Network. 

## License

This project is using [MIT Licence](./LICENSE)