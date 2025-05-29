import { useState } from "react";
import { createDevice } from "../services/addDeviceService";

export const useAddDevice = () => {
  const [formData, setFormData] = useState({
    name: "",
    uniqueId: "",
    phone: "",
    model: "",
    contact: ""
  });

  const [showFormExtra, setShowFormExtra] = useState(false);

  const toggleExtraContent = () => setShowFormExtra(prev => !prev);

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDevice(formData);
    // Reset form after successful submission
    setFormData({
      name: "",
      uniqueId: "",
      phone: "",
      model: "",
      contact: ""
    });
  };

  return {
    formData,
    showFormExtra,
    toggleExtraContent,
    handleInputChange,
    handleSubmit
  };
};