"use client";
import React, { useState, useEffect } from "react";

type Company = {
    nombre: string;
    email: string;
    rnc: string;
    tipo_de_empresa: string;
    telefono: string;
    persona_de_contacto: string;
};

type Props = {
    visible: boolean;
    company: Company | null;
    onClose: () => void;
    onSave: (updatedCompany: Company) => void;
};

export default function ModalEditCompany({ visible, company, onClose, onSave }: Props) {
    const [form, setForm] = useState<Company>({
        nombre: "",
        email: "",
        rnc: "",
        tipo_de_empresa: "",
        telefono: "",
        persona_de_contacto: "",
    });

    useEffect(() => {
        if (company) setForm(company);
    }, [company]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Editar Empresa</h2>
                <div className="grid grid-cols-2 gap-4">
                    {Object.keys(form).map((key) => (
                        key.toLowerCase() === "eliminar" ? null :
                            key.toLowerCase() === "editar" ? null :
                            (<div key={key} className="flex flex-col">
                                <label className="text-sm capitalize">{key.replace(/_/g, " ")}</label>
                                <input
                                    className="border p-2 rounded"
                                    name={key}
                                    value={(form as any)[key]}
                                    onChange={handleChange}
                                />
                            </div>)
                    ))}
                </div>
                <div className="flex justify-end mt-6 gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                        Cancelar
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
