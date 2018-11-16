export class newsfeedJSON {
    content: String;
    uploadedmedia: [{
        gfs_filename: String;
        gfs_mimetype: String;
        gfs_length: Number;
        gfs_chunkSize: Number;
    }];
    dateCreated:{
        type: String;
        default: String;
    }
}