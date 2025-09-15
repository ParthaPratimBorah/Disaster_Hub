import React, { useState, useRef } from 'react';
import { Page } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import PageHeader from '../../components/common/PageHeader';
import { CameraIcon, MapIcon, XCircleIcon, CheckCircleIcon } from '../../constants';

const ReportPage: React.FC = () => {
    const { setCurrentPage, PALETTE } = useAppContext();
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locationStatus, setLocationStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            setPhotos(prev => [...prev, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setPhotoPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
        setPhotoPreviews(prev => {
            const newPreviews = prev.filter((_, i) => i !== index);
            URL.revokeObjectURL(prev[index]); // Clean up object URL
            return newPreviews;
        });
    };

    const handleGetLocation = () => {
        setLocationStatus('Fetching location...');
        setLocation(null);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });
                setLocationStatus('Location captured successfully!');
            },
            (error) => {
                console.error("Geolocation error:", error);
                setLocationStatus('Could not get location. Please enable permissions.');
            }
        );
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!description.trim()) {
            alert("Please provide a description.");
            return;
        }
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log("Submitting Report:", { description, photos, location });
            setIsSubmitting(false);
            setSubmitSuccess(true);
            // Reset form after a delay
            setTimeout(() => {
                setCurrentPage(Page.HOME);
            }, 2000);
        }, 1500);
    };

    if (submitSuccess) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <CheckCircleIcon className="w-20 h-20" style={{ color: '#28a745' }} />
                <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Report Submitted</h1>
                <p style={{ color: PALETTE.text_secondary }}>Thank you for your help. Authorities have been notified.</p>
            </div>
        );
    }

    return (
        <div>
            <PageHeader title="Report an Incident" onBack={() => setCurrentPage(Page.HOME)} />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                    <label htmlFor="description" className="block font-bold mb-2" style={{ color: PALETTE.text_primary }}>
                        Describe the Situation
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide details about the damage, number of people affected, specific needs, etc."
                        rows={5}
                        className="w-full p-2 rounded-lg bg-transparent outline-none"
                        style={{ color: PALETTE.text_primary, boxShadow: PALETTE.button_inset_shadow }}
                    />
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                    <h3 className="font-bold mb-2" style={{ color: PALETTE.text_primary }}>Add Photos</h3>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                        {photoPreviews.map((preview, index) => (
                            <div key={index} className="relative">
                                <img src={preview} alt={`upload preview ${index}`} className="w-full h-24 object-cover rounded-lg" />
                                <button type="button" onClick={() => removePhoto(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5">
                                    <XCircleIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold"
                        style={{ backgroundColor: PALETTE.background, color: PALETTE.text_primary, boxShadow: PALETTE.button_shadow }}
                    >
                        <CameraIcon className="w-5 h-5" />
                        <span>Upload Images</span>
                    </button>
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                    <h3 className="font-bold mb-2" style={{ color: PALETTE.text_primary }}>Share Location</h3>
                    <button
                        type="button"
                        onClick={handleGetLocation}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold mb-2"
                        style={{ backgroundColor: PALETTE.background, color: PALETTE.text_primary, boxShadow: PALETTE.button_shadow }}
                    >
                        <MapIcon className="w-5 h-5" />
                        <span>Share Live Location</span>
                    </button>
                    {locationStatus && (
                        <p className="text-sm text-center" style={{ color: location ? '#28a745' : PALETTE.text_secondary }}>
                            {locationStatus}
                            {location && ` (Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)})`}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 mt-4 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
                    style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Report to Authorities'}
                </button>
            </form>
        </div>
    );
};

export default ReportPage;