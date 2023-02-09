import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACEESS_KEY, AWS_BUCKET_NAME, AWS_REGION } from './../../constants/index';
import React, { useState } from 'react';
import AWS from 'aws-sdk';

const S3_BUCKET = AWS_BUCKET_NAME;
const REGION = AWS_REGION;


AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACEESS_KEY,
});

export class S3Uploader {
    s3: AWS.S3;
    
    constructor() {
        this.s3 = new AWS.S3({
            params: { Bucket: AWS_BUCKET_NAME },
            region: AWS_REGION,
        });
    }

    async uploadFile(key: string, file: Blob, contentType: string): Promise<string> {
        const params = {
            Bucket: 'osce-bucket',
            Key: key,
            Body: file,
            ContentType: contentType,
        };
        try {
            await this.s3.upload(params).promise();
            return `https://s3.amazonaws.com/osce-bucket/${key}`;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
