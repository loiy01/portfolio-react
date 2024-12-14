import React, { useState } from "react";
import { sendForm } from "@emailjs/browser"; // استيراد مكتبة EmailJS الجديدة
import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // إعداد رسالة البريد الإلكتروني باستخدام الإصدار الجديد من EmailJS
    sendForm(
      "service_id", // المعرف الخاص بالخدمة
      "template_id", // المعرف الخاص بالقالب
      e.target,
      "user_id" // المعرف الخاص بالمستخدم (API Key)
    )
    .then((result) => {
        setResponseMessage("Email sent successfully!");
    }, (error) => {
        setResponseMessage("Failed to send the message. Please try again later.");
    });
  };

  return (
    <div className="bg-black text-white py-20" id="contact">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Me</h2>
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
            from-green-400 to-blue-500 mb-4">Let's Talk</h3>
            <p>I'm open to discussing web development projects or partnership opportunities.</p>
            <div className="mb-4 mt-8">
              <FaEnvelope className="inline-block text-green-400 mr-2" />
              <a href="mailto:loay.raed34@gmail.com" className="hover:underline">
                loay.raed34@gmail.com
              </a>
            </div>
            <div className="mb-4">
              <FaPhone className="inline-block text-green-400 mr-2" />
              <span>+962782514992</span>
            </div>
            <div className="mb-4">
              <FaMapMarkedAlt className="inline-block text-green-400 mr-2" />
              <span>Amman, Jordan</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none
                  focus:border-green-400"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none
                  focus:border-green-400"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none
                  focus:border-green-400"
                  rows="5"
                  placeholder="Enter Your Message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white
                transform transition-transform duration-300 hover:scale-105 px-8 py-2 rounded-full"
              >
                Send
              </button>
            </form>
            {responseMessage && <p className="mt-4">{responseMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
