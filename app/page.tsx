"use client";
import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { v4 as uuidv4 } from "uuid";

export default function CameraPage() {
  // 👇 give webcamRef a proper type
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    // ✅ check for null before using current
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const videoConstraints = {
    facingMode: "user",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4">📸 Take a Photo</h1>

      {!imgSrc ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-2xl shadow-lg w-[90%] max-w-sm"
        />
      ) : (
        <img
          src={imgSrc}
          alt="Captured"
          className="rounded-2xl shadow-lg w-[90%] max-w-sm"
        />
      )}

      <div className="mt-4 flex gap-3">
        {!imgSrc ? (
          <button
            onClick={capture}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Capture
          </button>
        ) : (
          <>
            <button
              onClick={() => setImgSrc(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Retake
            </button>
            <a
              href={imgSrc}
              download={`photo-${uuidv4()}.jpg`}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Download
            </a>
          </>
        )}
      </div>
    </div>
  );
}
