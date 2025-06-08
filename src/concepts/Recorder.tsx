import React, { useRef, useState, useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const VideoRecorder: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isInterviewActive, setIsInterviewActive] = useState(false);

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      stopStream();
    };
  }, []);

  const startInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsInterviewActive(true);
    } catch (err) {
      console.error('Error accessing media:', err);
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    const mediaRecorder = new MediaRecorder(streamRef.current, { mimeType: 'video/webm' });
    mediaRecorderRef.current = mediaRecorder;
    recordedChunks.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
      recordedChunks.current = [];
      await uploadVideo(blob);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const uploadVideo = async (videoBlob: Blob) => {
    const formData = new FormData();
    formData.append('video', videoBlob, 'recording.webm');

    try {
      const res = await fetch('http://localhost:4000/video_to_text', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setAiResponse(data.ai_response);

        if (data.response_audio) {
          const audio = new Audio(data.response_audio);
          audio.play(); // <- keeps camera ON
        }
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const toggleMic = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setIsMicEnabled(track.enabled);
      });
    }
  };

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const exitInterview = () => {
    stopRecording();
    stopStream();
    setIsInterviewActive(false);
    setAiResponse(null);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black relative">
      {/* Video Panel */}
      <video
        ref={videoRef}
        autoPlay
        muted
        className="rounded shadow-lg border border-gray-300"
        style={{ width: '100%', height: '80vh', objectFit: 'cover' }}
      />

      {/* Mic Toggle Button - Centered */}
      {isInterviewActive && (
        <button
          onClick={toggleMic}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-opacity-50 bg-black p-4 rounded-full"
        >
          {isMicEnabled ? <FaMicrophone size={28} /> : <FaMicrophoneSlash size={28} />}
        </button>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-6 flex gap-4">
        {!isInterviewActive ? (
          <button
            onClick={startInterview}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow"
          >
            Start Interview
          </button>
        ) : (
          <>
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-green-600 text-white px-6 py-2 rounded shadow"
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-red-600 text-white px-6 py-2 rounded shadow"
              >
                Stop Recording
              </button>
            )}
            <button
              onClick={exitInterview}
              className="bg-gray-800 text-white px-6 py-2 rounded shadow"
            >
              Exit Interview
            </button>
          </>
        )}
      </div>

      {/* AI Response Text */}
      {aiResponse && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 px-6 py-3 rounded shadow-lg max-w-xl text-center">
          <strong>AI Response:</strong> {aiResponse}
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;


















// import React, { useRef, useState } from 'react';
// import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

// const VideoRecorder: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const recordedChunks = useRef<Blob[]>([]);
//   const streamRef = useRef<MediaStream | null>(null);

//   const [isRecording, setIsRecording] = useState(false);
//   const [isMicEnabled, setIsMicEnabled] = useState(true);
//   const [aiResponse, setAiResponse] = useState<string | null>(null);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       streamRef.current = stream;

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
//       mediaRecorderRef.current = mediaRecorder;
//       recordedChunks.current = [];

//       mediaRecorder.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           recordedChunks.current.push(e.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
//         recordedChunks.current = [];
//         await uploadVideo(blob);

//         stream.getTracks().forEach((track) => track.stop());
//         if (videoRef.current) videoRef.current.srcObject = null;
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch (err) {
//       console.error('Error starting video:', err);
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current?.stop();
//     setIsRecording(false);
//   };

//   const toggleMic = () => {
//     if (streamRef.current) {
//       streamRef.current.getAudioTracks().forEach((track) => {
//         track.enabled = !track.enabled;
//         setIsMicEnabled(track.enabled);
//       });
//     }
//   };

//   const uploadVideo = async (videoBlob: Blob) => {
//     const formData = new FormData();
//     formData.append('video', videoBlob, 'recording.webm');

//     try {
//       const res = await fetch('http://localhost:4000/video_to_text', {
//         method: 'POST',
//         body: formData,
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setAiResponse(data.ai_response);
//         console.log('Transcription:', data.transcription);
//         console.log('AI Response:', data.ai_response);

//         if (data.response_audio) {
//           const audio = new Audio(data.response_audio);
//           audio.play();
//         }
//       } else {
//         console.error('Upload failed');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         className="border rounded w-full"
//         style={{ height: '80vh', objectFit: 'cover' }}
//       />

//       <div className="flex items-center gap-4">
//         {!isRecording ? (
//           <button onClick={startRecording} className="bg-green-500 text-white px-4 py-2 rounded">
//             Start Recording
//           </button>
//         ) : (
//           <>
//             <button onClick={stopRecording} className="bg-red-500 text-white px-4 py-2 rounded">
//               Stop Recording
//             </button>
//             <button
//               onClick={toggleMic}
//               className={`px-4 py-2 rounded ${
//                 isMicEnabled ? 'bg-blue-500' : 'bg-gray-500'
//               } text-white flex items-center gap-2`}
//             >
//               {isMicEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
//               {isMicEnabled ? 'Mic On' : 'Mic Off'}
//             </button>
//           </>
//         )}
//       </div>

//       {aiResponse && (
//         <div className="mt-4 p-3 border bg-gray-100 rounded">
//           <strong>AI Response:</strong> {aiResponse}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoRecorder;
