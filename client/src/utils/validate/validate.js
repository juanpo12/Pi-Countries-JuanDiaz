export const validateForm = (input) => {
    const newErrors = {
      nombre: "",
      dificultad: "",
      duracion: "",
      temporada: "",
      paises: "",
    };
  
    if (input.nombre === "") {
      newErrors.nombre = "El nombre no puede estar vacío.";
    }
  
    if (input.duracion > 8 || input.duracion < 1) {
      newErrors.duracion =
        "La duración no puede exceder las 8 horas o ser un valor inválido.";
    }
  
    return newErrors;
  };