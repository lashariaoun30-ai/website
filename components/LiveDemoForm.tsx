import React, { useState } from "react";
import { NeonButton } from "./ui/neon-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Phone, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

export const LiveDemoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studioName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Call Netlify Function (SECURE - no exposed keys!)
      const response = await fetch('/.netlify/functions/trigger-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          studioName: formData.studioName,
          phone: formData.phone
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore durante la chiamata');
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Vapi Call Error:", err);
      setError(err.message || "Impossibile avviare la chiamata. Verifica il numero e riprova.");
    } finally {
      setIsLoading(false);
    }
  };