import { Button } from 'antd';
import React, { useState, useRef } from 'react';

const CameraCapture: React.FC = () => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleStartCapture = async () => {
        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(userStream);
            if (videoRef.current) {
                videoRef.current.srcObject = userStream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const handleStopCapture = () => {
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            setStream(null);
            setCapturedImage(null);
        }
    };

    const handleCaptureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageDataURL = canvas.toDataURL('image/png');
            setCapturedImage(imageDataURL);
            sessionStorage.setItem('UserCaptureImage',imageDataURL);
        }
    };

    return (
        <div>
            {!stream ? (
                <Button type='primary' onClick={handleStartCapture}>Start Camera</Button>
            ) : (
                <div style={{display:'flex',gap:'1rem'}}>
                    <Button type='primary' onClick={handleCaptureImage}>Capture Image</Button>
                    <Button type='primary' onClick={handleStopCapture}>Stop Camera</Button>
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <video ref={videoRef} autoPlay></video>
                {capturedImage && <img src={capturedImage} alt="Captured" />}
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
        </div>
    );
};

export default CameraCapture;
