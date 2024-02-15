import { useState } from 'react';

const UploadForm = ({ session }) => {
  const [file, setFile] = useState(null);
  const [phone, setPhone] = useState('');
  const [videoLink, setVideoLink] = useState(null); // State to store the video link

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the phone number field is empty
    if (!phone) {
      alert('Please fill in your phone number before uploading the video.');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);
    // formData.append('user_id', session.user.id);

    console.log(formData);

    // Include phone number in the form data
    formData.append('phone', phone);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    console.log(response);

    if (response.ok) {
      // Handle success, show link to uploaded video
      const data = await response.json();
      console.log('Link to your uploaded video:', data.link);
      setVideoLink(data.link); // Set the video link state
    } else {
      // Handle error
      console.error('Error uploading video');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <br />
        {/* Replace the email input field with the phone input field */}
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phone}
          onChange={handlePhoneChange}
        />
        <br />
        <button type="submit">Upload Video</button>
      </form>
      {videoLink && (
        <div>
          <p>Link to your uploaded video:</p>
          <a href={videoLink} target="_blank" rel="noopener noreferrer">{videoLink}</a>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
