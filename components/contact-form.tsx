'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Send the main email to yourself (using the original template)
    emailjs.send(
      'service_cx013wb', 
      'template_8oksmj6',  // Your original template ID (this sends the message to you)
      formData, 
      'qQ530j6L2xIHoQJm-'
    )
    .then(() => {
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
  
      // Send the auto-reply to the user (using the auto-reply template)
      emailjs.send(
        'service_cx013wb',  // Same service ID
        'template_nsfd3xn',  // Auto-reply template ID
        {
          name: formData.name, // The name of the user
          email: formData.email, // The user's email to send the auto-reply to
          message: `Thank you for reaching out! We have received your message and will get back to you soon.` // Custom message for the user
        },
        'qQ530j6L2xIHoQJm-'  // Your user-specific EmailJS user ID
      )
      .catch((error) => {
        console.error("Auto-reply Error:", error); // Log any errors that occur during the auto-reply process
      });
  
      setTimeout(() => setSubmitSuccess(false), 3000); // Hide success message after 3 seconds
    })
    .catch((error) => {
      console.error("EmailJS Error:", error); // Log any errors that occur during the main email sending process
    })
    .finally(() => setIsSubmitting(false)); // Reset the submitting state once everything is done
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your email" required />
            </div>
            <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message" rows={5} required />
            <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}</Button>
            {submitSuccess && <p className="text-green-600 text-center">Message sent successfully!</p>}
          </form>
        </CardContent>
      </Card>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3"><Mail className="h-5 w-5 text-primary mt-0.5" /><p>lassouedmohamed2004@gmail.com</p></div>
          <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-primary mt-0.5" /><p>(+216) 25 740 872</p></div>
          <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-primary mt-0.5" /><p>Djerba, Medenine</p></div>
        </div>
        <div className="pt-4">
          <h3 className="text-xl font-semibold mb-3">Follow Me</h3>
          <div className="flex gap-3">
            <Button variant="outline" size="icon" asChild><a href="https://github.com/Lassoued95" target="_blank" rel="noopener noreferrer"><Github className="h-5 w-5" /></a></Button>
            <Button variant="outline" size="icon" asChild><a href="https://www.linkedin.com/in/mohamed-lassoued-a5b5b8243/" target="_blank" rel="noopener noreferrer"><Linkedin className="h-5 w-5" /></a></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
