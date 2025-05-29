import { useAddDevice } from "../hooks/useAddDevice";
import Icons from "./Icons";
import Darkmode from "./Darkmode";
import { Link } from "react-router-dom";
import "../style/device.css";

export const AddDevice = () => {
  const {
    formData,
    showFormExtra,
    toggleExtraContent,
    handleInputChange,
    handleSubmit
  } = useAddDevice();

  return (
    <div className="addDevices">
      <Darkmode />
      <div className="containerDevices">
        <header>
          <div className="titleDevice">
            <h1>Agregar un dispositivo</h1>
          </div>
          <div className="goBack">
            <Icons name="left-arrow-alt" size="md" color="black" />
            <h1><Link to="/dashboardmain">Volver</Link></h1>
          </div>
        </header>
        
        <form onSubmit={handleSubmit} className="formAdd">
          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleInputChange("name")}
            required
          />
          <input
            type="text"
            placeholder="Identificación"
            value={formData.uniqueId}
            onChange={handleInputChange("uniqueId")}
            required
          />
          
          <div className="extras" onClick={toggleExtraContent}>
            <a href="#">Extras</a>
            <Icons
              name={showFormExtra ? "chevron-up" : "chevron-down"}
              size="md"
              color="black"
            />
          </div>
          
          {showFormExtra && (
            <div className="Content-extra">
              <div className="content-left">
                <input
                  type="text"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                />
              </div>
              <div className="content-right">
                <input
                  type="text"
                  placeholder="Contacto"
                  value={formData.contact}
                  onChange={handleInputChange("contact")}
                />
              </div>
              <input
                type="text"
                placeholder="Modelo"
                value={formData.model}
                onChange={handleInputChange("model")}
              />
            </div>
          )}
          
          <button type="submit">
            <span>AGREGAR</span>
          </button>
        </form>
      </div>
    </div>
  );
};