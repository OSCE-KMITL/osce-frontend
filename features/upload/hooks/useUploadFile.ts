import { gql, useMutation } from '@apollo/client';

export interface UploadFileInput {
    file: Object;
}

export interface UploadFilleProps {
    id: string;
    current_name: string;
    original_name: string;
    url: string;
}

export interface UploadFileResponse {
    uploadFile: UploadFilleProps;
}

export const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
            id
            current_name
            original_name
            url
        }
    }
`;

export const useUploadFile = () => {
    return useMutation<UploadFileResponse, UploadFileInput>(UPLOAD_FILE);
};
