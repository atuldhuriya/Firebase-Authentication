
"use client"
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/Component/firebase"; 

const Home = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) return;
        const fileRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Error uploading file: ", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDownloadURL(downloadURL);
                });
            }
        );
    };

    const handleDownload = () => {
        if (downloadURL) {
            const link = document.createElement("a");
            link.href = downloadURL;
            link.download = file?.name || "";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 bg-gradient-to-b from-gray-600 to-black flex flex-col justify-center items-center">
            <div className="max-w-md bg-slate-300 w-full p-6 border border-gray-300 rounded">
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button
                onClick={handleUpload}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Upload File
            </button>
            {uploadProgress > 0 && (
                <progress  value={uploadProgress} max="100" className="mt-6 flex" />
            )}
            {downloadURL && (
               <div className="mt-4">
             <p>FIle uploaded successfully</p>
             <a href={downloadURL} target="_blank"rel="noopener noreferrer"className="nuderline">Download URL</a>
             <button onClick={handleDownload} className="bg-green-500 text-white px-4 py-2 m-2 rounded">Download</button>

               </div>
            )}
            </div>
            </div>
    );
}

export default Home;
