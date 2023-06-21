"use client";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [theFile, setTheFile] = useState<File>()
  const [isLoading, setIsLoading] = useState(false)
  const [response, theResponse]  = useState("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    setTheFile(file);
  };

  const callGetTranscription = async () => {
    setIsLoading(true);
    
    console.log("doing that")
    if (!theFile) {
      // Handle the case when no file is selected
      setIsLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('file', theFile);
  
    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // Handle the success response
        console.log('File uploaded successfully');
      } else {
        // Handle the error response
        console.error('Failed to upload file');
      }
    } catch (error) {
      // Handle any errors
      console.error('An error occurred while uploading the file', error);
    }
  
    setTheFile(undefined);
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-5">
      <h1 className="text-5xl font-sans">Whisperer</h1>

      <div className="flex  h-[35rem] w-[40rem] flex-col items-center bg-gray-600 rounded-xl">
        <div className=" h-full flex flex-col gap-2 overflow-y-auto py-8 px-3 w-full">
          <input type="file"   accept=".wav, .mp3"  onChange={handleFileChange}/>
  
          <div className="w-[90%] h-max border-2 break-words">dsioafjiosdfjoisajfoa dsijfiosdjfiosajfiojfoiasjfoisjfoisjfiosjfsiopfjsiodpfjoipsdsiofjsaoidfjisdofjspodf</div>

        </div>
        <div className="relative  w-[80%] bottom-4 flex justify-center">
          <button
            onClick={callGetTranscription}
            className="w-max bg-blue-500 px-4 py-2 rounded-sm "
          >Upload
          </button>
        </div>
      </div>

      <div></div>
    </main>
  );
}
