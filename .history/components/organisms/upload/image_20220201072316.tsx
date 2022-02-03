import React from "react";
import { useFileUpload } from "use-file-upload";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

export default function UploadFile() {
  return (
    <div>
      <form>
        <h1>File Upload</h1>
        <input type="file" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
