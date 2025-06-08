// import { useRef, useState } from 'react';

// function Webrtc() {
//   const [isRecording, setIsRecording] = useState(false);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream, {
//         mimeType: 'audio/webm;codecs=opus',
//       });

//       mediaRecorder.ondataavailable = (e: BlobEvent) => {
//         if (e.data.size > 0) {
//           audioChunksRef.current.push(e.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//         audioChunksRef.current = [];

//         const formData = new FormData();
//         formData.append('audio', audioBlob, 'recording.webm');

//         try {
//           const res = await fetch('http://localhost:4000/upload', {
//             method: 'POST',
//             body: formData,
//           });

//           if (res.ok) {
//             const data = await res.json();
//             const audioUrl = data.response_audio;

//             // Play the AI generated response audio
//             const audio = new Audio(audioUrl);
//             audio.play();

//             // alert('AI response received and playing!');
//           } else {
//             alert('Upload failed');
//           }
//         } catch (err) {
//           console.error('Upload error:', err);
//           alert('Error uploading audio');
//         }
//       };

//       mediaRecorder.start();
//       mediaRecorderRef.current = mediaRecorder;
//       setIsRecording(true);
//     } catch (err) {
//       console.error('Recording failed:', err);
//       alert('Microphone access denied or recording not supported');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div>
//       <h1>🎤 WebRTC Audio Recorder</h1>
//       <button onClick={isRecording ? stopRecording : startRecording}>
//         {isRecording ? '⏹️ Stop' : '🎙️ Record'}
//       </button>
//     </div>
//   );
// }

// export default Webrtc;
// import { useRef, useState } from 'react';

// function Webrtc() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isVideoRecording, setIsVideoRecording] = useState(false);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const videoRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);
//   const videoChunksRef = useRef<Blob[]>([]);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const videoStreamRef = useRef<MediaStream | null>(null);

//   // AUDIO RECORDING
//   const startAudioRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream, {
//         mimeType: 'audio/webm;codecs=opus',
//       });

//       mediaRecorder.ondataavailable = (e: BlobEvent) => {
//         if (e.data.size > 0) audioChunksRef.current.push(e.data);
//       };

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//         audioChunksRef.current = [];

//         const formData = new FormData();
//         formData.append('audio', audioBlob, 'recording.webm');
//         formData.append('video','recordedVideoBlob')

//         const res = await fetch('http://localhost:4000/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         const data = await res.json();
//         const audioUrl = data.response_audio;
//         const audio = new Audio(audioUrl);
//         audio.play();
//       };

//       mediaRecorder.start();
//       mediaRecorderRef.current = mediaRecorder;
//       setIsRecording(true);
//     } catch (err) {
//       console.error('Audio recording error:', err);
//       alert('Microphone access denied or error occurred.');
//     }
//   };

//   const stopAudioRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   // VIDEO RECORDING
//   const startVideoRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoStreamRef.current = stream;

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       }

//       const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

//       mediaRecorder.ondataavailable = (e: BlobEvent) => {
//         if (e.data.size > 0) videoChunksRef.current.push(e.data);
//       };

//       mediaRecorder.onstop = async () => {
//         const videoBlob = new Blob(videoChunksRef.current, { type: 'video/webm' });
//         videoChunksRef.current = [];

//         const formData = new FormData();
//         formData.append('video', videoBlob, 'video_recording.webm');

//         await fetch('http://localhost:4000/upload_video', {
//           method: 'POST',
//           body: formData,
//         });

//         // Stop webcam stream
//         videoStreamRef.current?.getTracks().forEach((track) => track.stop());
//       };

//       mediaRecorder.start();
//       videoRecorderRef.current = mediaRecorder;
//       setIsVideoRecording(true);
//     } catch (err) {
//       console.error('Video recording error:', err);
//       alert('Camera access denied or error occurred.');
//     }
//   };

//   const stopVideoRecording = () => {
//     if (videoRecorderRef.current) {
//       videoRecorderRef.current.stop();
//       setIsVideoRecording(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>🎤 + 🎥 WebRTC Audio/Video Recorder</h1>

//       {/* AUDIO CONTROL */}
//       <button onClick={isRecording ? stopAudioRecording : startAudioRecording}>
//         {isRecording ? '⏹️ Stop Audio' : '🎙️ Record Audio'}
//       </button>

//       {/* VIDEO CONTROL */}
//       <button onClick={isVideoRecording ? stopVideoRecording : startVideoRecording} style={{ marginLeft: '10px' }}>
//         {isVideoRecording ? '⏹️ Stop Video' : '📹 Record Video'}
//       </button>

//       {/* VIDEO PREVIEW */}
//       <div style={{ marginTop: '20px' }}>
//         <video ref={videoRef} width="400" height="300" autoPlay muted style={{ border: '2px solid black' }} />
//       </div>
//     </div>
//   );
// }

// export default Webrtc;















import { useRef, useState } from 'react';

function Webrtc() {
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [recordedVideoBlob, setRecordedVideoBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const videoChunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);

  // 🎤 AUDIO RECORDING
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });

      mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];

        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        if (recordedVideoBlob) {
          formData.append('video', recordedVideoBlob, 'video_recording.webm');
        }

        try {
          const res = await fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            const audioUrl = data.response_audio;
            const audio = new Audio(audioUrl);
            audio.play();
          } else {
            alert('Upload failed');
          }
        } catch (err) {
          console.error('Upload error:', err);
          alert('Error uploading audio/video');
        }
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (err) {
      console.error('Audio recording error:', err);
      alert('Microphone access denied or error occurred.');
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // 🎥 VIDEO RECORDING
  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

      mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) videoChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(videoChunksRef.current, { type: 'video/webm' });
        videoChunksRef.current = [];
        setRecordedVideoBlob(videoBlob);

        // Stop webcam
        videoStreamRef.current?.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      videoRecorderRef.current = mediaRecorder;
      setIsVideoRecording(true);
    } catch (err) {
      console.error('Video recording error:', err);
      alert('Camera access denied or error occurred.');
    }
  };

  const stopVideoRecording = () => {
    if (videoRecorderRef.current) {
      videoRecorderRef.current.stop();
      setIsVideoRecording(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🎤🎥 WebRTC Audio + Video Recorder</h1>

      <div style={{ marginBottom: '1rem' }}>
        <video ref={videoRef} width="480" height="360" style={{ borderRadius: '8px' }} autoPlay muted />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={isVideoRecording ? stopVideoRecording : startVideoRecording}>
          {isVideoRecording ? '⏹️ Stop Video' : '📹 Start Video'}
        </button>
        &nbsp;
        <button onClick={isRecording ? stopAudioRecording : startAudioRecording}>
          {isRecording ? '⏹️ Stop Audio' : '🎙️ Start Audio + Upload'}
        </button>
      </div>
    </div>
  );
}

export default Webrtc;
