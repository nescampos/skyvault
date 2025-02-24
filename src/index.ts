import { Command, Argument } from 'commander';
import * as actions from "./autonomys/AutonomysActions";
import * as configs from "./autonomys/AutonomysConfig";

const program = new Command();

program
  .name('skyvault')
  .description('CLI to upload and download encrypted files for backups using AutoDrive (https://ai3.storage/)')
  .version('0.1.0');

program.command('addKey')
  .description('Add or replace API key from AutoDrive (https://ai3.storage/) to use SkyVault')
  .argument('<string>', 'API Key')
  .action((key) => {
    if(key == "" || key === undefined) {
        console.error("Invalid API key");
    } else {
      configs.saveApiKey(key);
    }
  });

program.command('cleanKey')
  .description('Clean/Delete the current API key in SkyVault')
  .action(() => {
    configs.cleanApiKey();
  });


program.command('uploadFile')
  .description('Upload a new file with a password to protect the file.')
  .argument("<filepath>",'File path to upload')
  .argument('<password>', 'Password to protect the file')
  .action(async (filepath, password) => {
    await actions.uploadFile(filepath,password);
  });

program.command('uploadFolder')
  .description('Upload a new folder (all the files) with a password to protect the folder.')
  .argument("<folderpath>",'File path to upload')
  .argument('<password>', 'Password to protect the file')
  .action(async (folderpath, password) => {
    await actions.uploadFolder(folderpath,password);
  });

program.command('getFiles')
  .description('Get the uploaded files')
  .action(async () => {
    await actions.getFiles();
  });

program.command('shareFile')
  .description('Share an uploaded files with a specific public id (user)')
  .argument('<filecid>', 'CID of the file/folder you want to share')
  .argument('<publicId>', 'Public ID to share')
  .action(async (filecid, publicId) => {
    await actions.shareFile(filecid, publicId);
  });

program.command('getPublicURL')
  .description('Get the public URL for a specific File CID')
  .argument('<filecid>', 'CID of the file/folder you want to check the public URL')
  .action((filecid) => {
    actions.getPublicURL(filecid);
  });

program.command('getObject')
  .description('Get the metadata a specific File CID')
  .argument('<filecid>', 'CID of the file/folder you want to check the metadata')
  .action(async (filecid) => {
    await actions.getObjectMetadata(filecid);
  });

program.command('getSharedToMe')
  .description('Get the files shared with me')
  .action(async () => {
    await actions.getSharedWithMe();
  });

program.command('deleteFile')
  .description('Delete a file')
  .argument('<filecid>', 'CID of the file/folder you want to delete')
  .action(async (filecid) => {
    await actions.deleteFile(filecid);
  });

program.command('searchFiles')
  .description('Search files with a specific name/CID')
  .argument('<value>', 'Part of the name or CID of the file you are searching')
  .action(async (value) => {
    await actions.searchFile(value);
  });

program.parse();