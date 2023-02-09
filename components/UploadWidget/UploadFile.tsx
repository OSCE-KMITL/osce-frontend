import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_REGION, AWS_SECRET_ACEESS_KEY } from '../../constants';

const UploadFileToS3 = () => {
    AWS.config.update({
        accessKeyId: AWS_ACCESS_KEY_ID!,
        secretAccessKey: AWS_SECRET_ACEESS_KEY!,
    });

    const myBucket = new AWS.S3({
        params: { Bucket: AWS_BUCKET_NAME! || 'osce-bucket' },
        region: AWS_REGION! || 'ap-southeast-1',
    });

    console.log('S3 bucket =====' + AWS_BUCKET_NAME);
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadFile = (file) => {
        console.log('S3 bucket =====' + AWS_BUCKET_NAME);
        const params = {
            // ACL: 'public-read',
            Body: file,
            Bucket: AWS_BUCKET_NAME!,
            Key: file.name,
        };

        myBucket
            .putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100));
            })
            .send((err) => {
                if (err) console.log(err);
            });
    };

    return (
        <div>
            <div>Native SDK File Upload Progress is {progress}%</div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        </div>
    );
};

export default UploadFileToS3;
