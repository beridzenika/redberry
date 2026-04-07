import { useState } from 'react';
import { ReactComponent as Upload } from '../assets/icons/Upload.svg';

function FileUpload({ avatar, onChange, error}) {
    const [isDragging, setIsDragging] = useState(false);

    const processFile = (file) => {
        if (!file) return;
        
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
            onChange(null, 'Must be jpg, png or webp');
            return;
        }
        onChange(file, null);
    }
    
    const handleFileChange = (e) => {
        processFile(e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileChange({ target: { files: [file] } });
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = () => {
        setIsDragging(false);
    };



    return (
    <>
        <label htmlFor='avatar' className={error ? 'label-error' : ''}>
            Upload Avatar
        </label>
        <label 
            htmlFor='avatar' 
            className={`upload-input ${error ? 'input-error' : ''} ${isDragging ? 'upload-dragging' : ''} ${avatar ? 'upload-input-preview' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
        >
            <input
            id='avatar'
            type='file'
            accept='.jpg,.png,.webp'
            onChange={handleFileChange}
            />
            {avatar ? (
            <div className='preview-content'>
                <img 
                    src={avatar instanceof File ? URL.createObjectURL(avatar) : avatar} 
                    alt='preview' 
                    className='preview-image'/>
                <div className='preview-text'>
                    <p className='preview-title'>
                        {avatar instanceof File ? avatar.name : 'Current avatar'}
                    </p>
                    {avatar instanceof File && (
                        <p className="preview-size">Size - {(avatar.size / 1024 / 1024).toFixed(2)} MB</p>
                    )}
                    <span className='upload-link'>Change</span>
                </div>
            </div>
            ) : (
            <div className='upload-content'>
                <Upload className='icon'/>
                <p>
                    <span className='drag-text'>Drag and drop or </span>
                    <span className='upload-link'>Upload File</span>
                </p>
                <p className='file-types'>
                    JPG, PNG or WebP
                </p>
            </div>
            )}
        </label>
        {error && <span className='field-error'>{error}</span>}
    </>
    );
};

export default FileUpload;