export const handleFacturaClick = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MY_BACKEND_API}/lockers/facturar`, {
      method: "GET",
      headers: {
        "Accept": "application/pdf", // o "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      },
    });

    if (!response.ok) {
      throw new Error("Error al generar la factura");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "factura.pdf"; // o factura.docx
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("Error descargando la factura:", error);
    alert("No se pudo generar la factura.");
  }
};
