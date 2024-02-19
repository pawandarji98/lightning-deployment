const { exec }  = require('child_process')
const path = require('path')
const fs = require('fs')
const {S3Client , PutObjectCommand} = require('@aws-sdk/client-s3')
const mime = require('mime-types');

const s3Client = new S3Client({
    region:'ap-south-1',
    credentials:{
        accessKeyId:'AKIAYS2NU4WSXXD7YNEV',
        secretAccessKey:'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'
    }
})

const PROJECT_ID = process.env.PROJECT_ID;

async function init() {
    console.log("Executing scrip.js");
    const outDirPath = path.join(__dirname, 'output')

    const p = exec(`cd ${outDirPath} && npm install && npm run build`);

    p.stdout.on('data' , function (data) {
        console.log(data.toString());
    })

    p.stdout.on('error' , function (data) {
        console.log('Erorr' , data.toString());
    });

    p.on('close' , async function() {
        console.log('Build complete');
        const distFolderpath = path.join(__dirname , 'output' , 'dist')
        const distFolderContents = fs.readdirSync(distFolderpath , {recursive:true})

        for(const filepath of distFolderContents) {
            if(fs.lstatSync(filepath).isDirectory()) continue;

            console.log("Uploading" , filepath)

            const command = new PutObjectCommand({
                Bucket:'lightning-deployment',
                Key:`__outputs/${PROJECT_ID}/${filepath}`,
                Body:fs.createReadStream(filepath),
                ContentType:mime.lookup(filepath)
            })

            await s3Client.send(command);
            console.log("Uploaded" , filepath)

        }

        console.log("Done..............JAI SHREE RAM")
    })
}

init()