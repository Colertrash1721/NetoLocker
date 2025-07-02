'use client'
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { addSeals } from "@/types/addContainer";
import { freeload } from "@/services/container/create/createfreeload";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import ubicacionesData from "../../../locations.json";

export default function useSealsValues() {
  const [sealsValues, setSealsValues] = useState<addSeals>({
    port: "",
    destination: "",
    bl: "",
    estimatedDate: ""
  });

  const router = useRouter();

  const handleSealsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSealsValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSealsSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLSelectElement>) => {
    e.preventDefault();
    const username = localStorage.getItem("username");

    try {
      const terms = await Swal.fire({
        title: "Términos y condiciones",
        width: 1100,
        html: `
          El monitoreo de precintos electrónicos es supervisado por el departamento <b>ReCoMTACt de la Dirección General de Aduanas y NetoTrack</b>.<br><br>
          La empresa no podrá realizar la apertura del contenedor, excepto de manera remota por parte de NetoTrack. La apertura no remota sin autorización tendrá consecuencias ante la Dirección General de Aduanas.<br><br>
          En caso de daños como cortes, sabotaje, golpes o destrucción del precinto, la empresa deberá pagar un costo de $500 USD.<br><br>
          La empresa es responsable de la devolución del precinto de NetoTrack. Por cada día adicional que el precinto no sea devuelto, se aplicará un cargo a la empresa de $27 USD por día.<br><br>
          Se considerarán despachos extraordinarios todos aquellos que se realicen después de las 6:00 p.m. de lunes a viernes, y los sábados a partir de las 12:00 m. Estos deben ser notificados a <a href="mailto:info@netotrack.com">info@netotrack.com</a>.<br><br>
          Los despachos realizados en horarios extraordinarios tendrán un cargo adicional. NetoTrack no se responsabiliza por la información contenida en este ticket.<br><br>
          Para realizar la cancelación, debe hacer la solicitud al correo <a href="mailto:info@netotrack.com">info@netotrack.com</a>. Si han transcurrido más de 24 horas desde la emisión del ticket, y se solicita su cancelación, se emitirá una nota de crédito correspondiente.
        `,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "<i class='bx bx-check'></i> Acepto",
        cancelButtonText: "Cancelar",
      });
      if (!terms.isConfirmed) {
        Swal.fire({
          title: "Cancelado",
          text: "Solicitud cancelada",
          icon: "info",
        });
        return;
      }
      const freeloadResponse = await freeload(sealsValues, username!);
      await Swal.fire({
        title: "Logrado",
        text: "Precinto solicitado de manera correcta",
        icon: "success",
      });
      setTimeout(() => {
        router.push('/container/');
      }, 2000);
      return freeloadResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        Swal.fire({
          title: "Error",
          text: error.response?.data.message,
          icon: "error",
        });
        setTimeout(() => {
          redirect('/container/')
        }, 2000);
      } else {
        console.log("Error desconocido:", error);
        Swal.fire({
          title: "Error",
          text: "Error desconocido",
          icon: "error",
        });
      }
    }
  };

  return { sealsValues, handleSealsSubmit, handleSealsChange };
}
