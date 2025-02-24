import {  createAutoDriveApi, apiCalls, Scope,  fs} from '@autonomys/auto-drive';
import {getApiKey} from "./AutonomysConfig";


let apiKey:string = "";


function configureAutoDriveApi() {
    apiKey = getApiKey();
    
    const api = createAutoDriveApi({
        apiKey: apiKey, 
        network: "taurus"
    });
    return api;
}



export async function uploadFile(path:string, password?:string) {
    const api = configureAutoDriveApi();
    try {
        const options = {
            password: password??"",
            compression: true,
            // An optional callback useful for large file uploads
            onProgress: (progress: number) => {
                console.log(`The upload is completed is ${progress}% completed`)
            }
        };
        const cid = await fs.uploadFileFromFilepath(api, path, options)
        console.log(`The file is uploaded and its cid is ${cid}`);
    } catch {
        console.error("Error uploading the file");
    }
}


export async function uploadFolder(folderPath:string, password?:string) {
    const api = configureAutoDriveApi();
    try {
        const options = {
            password: password??"",
            compression: true,
            // An optional callback useful for large file uploads
            onProgress: (progress: number) => {
                console.log(`The upload is completed is ${progress}% completed`)
            }
        };
        const cid = await fs.uploadFolderFromFolderPath(api, folderPath, options)
        
        console.log(`The file is uploaded and its cid is ${cid}`);
    } catch {
        console.error("Error uploading the folder. Verify if the folder exists and you have access");
    }
}

export async function getFiles() {
    const api = configureAutoDriveApi();
    try {
        const myFiles = await apiCalls.getRoots(api, {
          scope: Scope.User,
          limit: 100,
          offset: 0,
        })
       
        console.log(`There are ${myFiles.totalCount} file. Showing ${myFiles.rows.length} files.`)
        for (const file of myFiles.rows) {
          console.log(`${file.name} - ${file.headCid}: ${file.size}`)
        }
      } catch (error) {
        console.error('Error listing the files')
      }
}

export function getPublicURL(cid:string) {
    const api = configureAutoDriveApi();
    try {
        const url = apiCalls.publicDownloadUrl(api, cid);
        console.log(`Public user (to share): ${url}`);
      } catch (error) {
        console.error('Error showing the public URL')
      }
}

export async function shareFile(cid:string, public_id:string) {
    const api = configureAutoDriveApi();
    try {
        const objectShared = await apiCalls.shareObject(api, {
          cid:cid, publicId: public_id
        });
        console.log(objectShared);
      } catch (error) {
        console.error('Error downloading file:')
      }
}


export async function getObjectMetadata(cid:string) {
    const api = configureAutoDriveApi();
    try {
        const objectInfo = await apiCalls.getObject(api, {cid});
        console.log(`Name: ${objectInfo.metadata.name}`);
        console.log(`Total size: ${objectInfo.metadata.totalSize}`);
        console.log(`Type: ${objectInfo.metadata.type}`);
        console.log(`Compression Algorithm: ${objectInfo.metadata.uploadOptions?.compression?.algorithm}`);
        console.log(`Compression Chunk size: ${objectInfo.metadata.uploadOptions?.compression?.chunkSize}`);
        console.log(`Level: ${objectInfo.metadata.uploadOptions?.compression?.level}`);
        console.log(`Encription Algorithm: ${objectInfo.metadata.uploadOptions?.encryption?.algorithm}`);
        console.log(`Encription Chunk size: ${objectInfo.metadata.uploadOptions?.encryption?.chunkSize}`);
      } catch (error) {
        console.error('Error showing the object Metadata')
      }
}

export async function getSharedWithMe() {
    const api = configureAutoDriveApi();
    try {
        const myFiles = await apiCalls.getSharedWithMe(api, {
          limit: 100,
          offset: 0,
        })
       
        console.log(`There are ${myFiles.totalCount} shared file. Showing ${myFiles.rows.length} files.`)
        for (const file of myFiles.rows) {
          console.log(`${file.name} - ${file.headCid}: ${file.size}`)
        }
      } catch (error) {
        console.error('Error listing the shared files')
      }
}

export async function deleteFile(cid:string) {
    const api = configureAutoDriveApi();
    try {
        const objectToDelete = await apiCalls.markObjectAsDeleted(api, {
            cid:cid
          });
       
        console.log(`The file with the cid ${cid} has been deleted`)
      } catch (error) {
        console.error('Error deleting the file')
      }
}

export async function searchFile(value:string) {
    const api = configureAutoDriveApi();
    try {
        const results = await apiCalls.searchByNameOrCID(api, {
            value:value, scope: Scope.User
          });
          console.log(`There are ${results.length} results with the query ${value}`)
          for (const file of results) {
            console.log(`Name: ${file.name}, CID: ${file.cid}`)
          }
      } catch (error) {
        console.error('Error searching files')
      }
}