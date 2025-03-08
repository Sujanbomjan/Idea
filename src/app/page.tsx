'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ShareIdeasForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    idea: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      fullName: formData.fullName,
      idea: formData.idea,
      to_email: 'gymmade01@gmail.com',
    };

    emailjs
      .send(
        'service_nrbf069', // Replace with your actual EmailJS service ID
        'template_ieu550n', // Replace with your EmailJS template ID
        templateParams,
        '6ZWoe5eb2JalYE3EH' // Replace with your EmailJS public key
      )
      .then(
        () => {
          alert('Your idea has been sent successfully!');
          setFormData({ fullName: '', idea: '' });
        },
        (error) => {
          console.error('Failed to send email:', error);
          alert('Failed to send your idea. Please try again.');
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-8">
      <div className="w-full md:w-1/2 p-8 bg-white shadow-2xl rounded-lg max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Share Your Brilliant Idea</h2>
        <p className="text-gray-600 mb-6 text-center">Join our community and share your innovative ideas.</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Your Idea</label>
            <textarea
              name="idea"
              value={formData.idea}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
              placeholder="Describe your idea here..."
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Share Idea'}
          </button>
        </form>
      </div>
    </div>
  );
}
